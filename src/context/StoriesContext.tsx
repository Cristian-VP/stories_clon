import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import {StorageKeys, type StoriesContextValue, type Story, type StoryContent} from '../types';
import { compressImageToBase64 } from '../services/imageServices';
import { loadStoriesFromLocalStorage, saveStoriesToLocalStorage } from '../services/storageServices';

const StoriesContext = createContext<StoriesContextValue | undefined>(undefined)

export const StoriesProvider = ({ children }: { children: ReactNode }) => {
    const [stories, setStories] = useState<Story[]>(() => {
        const storedStories = loadStoriesFromLocalStorage();
        const now = Date.now();
        const twentyFourHoursInMs = 24 * 60 * 60 * 1000;

        // Filtrar stories completos que tengan menos de 24 horas
        return storedStories.filter(story => {
            const storyAge = now - story.createdAt;
            return storyAge <= twentyFourHoursInMs;
        });
    });

    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [currentContentIndex, setCurrentContentIndex] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    // Crear un nuevo story con una imagen
    const createNewStory = async (file: File): Promise<void> => {
        try {
            const base64Image = await compressImageToBase64(file);
            const newContent: StoryContent = {
                id: crypto.randomUUID(),
                imageUrl: base64Image,
                timestamp: Date.now(),
                duration: 3000,
            };

            const newStory: Story = {
                id: crypto.randomUUID(),
                contents: [newContent],
                createdAt: Date.now(),
            };

            setStories((prevStories) => {
                const updatedStories = [...prevStories, newStory];
                saveStoriesToLocalStorage(updatedStories);
                return updatedStories;
            });
        } catch (error) {
            console.error('Error al crear story:', error);
            throw error;
        }
    };

    // Agregar contenido a un story existente
    const addContentToStory = async (storyId: string, file: File): Promise<void> => {
        try {
            const base64Image = await compressImageToBase64(file);
            const newContent: StoryContent = {
                id: crypto.randomUUID(),
                imageUrl: base64Image,
                timestamp: Date.now(),
                duration: 3000,
            };

            setStories((prevStories) => {
                const updatedStories = prevStories.map(story => {
                    if (story.id === storyId) {
                        return {
                            ...story,
                            contents: [...story.contents, newContent],
                        };
                    }
                    return story;
                });
                saveStoriesToLocalStorage(updatedStories);
                return updatedStories;
            });
        } catch (error) {
            console.error('Error al agregar contenido:', error);
            throw error;
        }
    };

    const removeStory = (id: string): void => {
        setStories((prevStories) => {
            const updatedStories = prevStories.filter(story => story.id !== id);
            saveStoriesToLocalStorage(updatedStories);
            return updatedStories;
        });
    };

    // Navegar al siguiente contenido o siguiente story
    const nextContent = (): void => {
        const currentStory = stories[currentStoryIndex];
        if (!currentStory) return;

        // Si hay más contenidos en el story actual
        if (currentContentIndex < currentStory.contents.length - 1) {
            setCurrentContentIndex(currentContentIndex + 1);
        }
        // Si no hay más contenidos, pasar al siguiente story
        else if (currentStoryIndex < stories.length - 1) {
            setCurrentStoryIndex(currentStoryIndex + 1);
            setCurrentContentIndex(0);
        }
        // Si es el último contenido del último story, cerrar
        else {
            setIsViewerOpen(false);
            setCurrentStoryIndex(0);
            setCurrentContentIndex(0);
        }
    };

    // Navegar al contenido anterior o story anterior
    const prevContent = (): void => {
        // Si no estamos en el primer contenido, retroceder
        if (currentContentIndex > 0) {
            setCurrentContentIndex(currentContentIndex - 1);
        }
        // Si estamos en el primer contenido pero no en el primer story
        else if (currentStoryIndex > 0) {
            const prevStoryIndex = currentStoryIndex - 1;
            const prevStory = stories[prevStoryIndex];
            setCurrentStoryIndex(prevStoryIndex);
            // Ir al último contenido del story anterior
            setCurrentContentIndex(prevStory.contents.length - 1);
        }
    };

    const openViewer = (storyIndex: number): void => {
        setCurrentStoryIndex(storyIndex);
        setCurrentContentIndex(0);
        setIsViewerOpen(true);
    };

    const closeViewer = (): void => {
        setIsViewerOpen(false);
        setCurrentStoryIndex(0);
        setCurrentContentIndex(0);
    };

    useEffect(() => {
        if (stories.length > 0 || localStorage.getItem(StorageKeys.STORIES) !== null) {
            saveStoriesToLocalStorage(stories);
            if (stories.length === 0) {
                localStorage.removeItem(StorageKeys.STORIES);
            }
        }
    }, [stories]);

    const value: StoriesContextValue = {
        stories,
        createNewStory,
        addContentToStory,
        removeStory,
        currentStoryIndex,
        currentContentIndex,
        setCurrentStoryIndex,
        setCurrentContentIndex,
        nextContent,
        prevContent,
        isViewerOpen,
        openViewer,
        closeViewer,
    };

    return (
        <StoriesContext.Provider value={value}>
            {children}
        </StoriesContext.Provider>
    );
};

export const useStories = (): StoriesContextValue => {
    const context = useContext(StoriesContext);
    if (!context) {
        throw new Error('useStories debe usarse dentro de un StoriesProvider');
    }
    return context;
};

