// Un contenido individual dentro de un story (una imagen)
export interface StoryContent {
    id: string;
    imageUrl: string;
    timestamp: number;
    duration: number;
}

// Un Story completo (puede tener múltiples imágenes)
export interface Story {
    id: string;
    contents: StoryContent[];  // Array de imágenes
    createdAt: number;
}

export interface StoriesContextValue {
    stories: Story[];
    addContentToStory: (storyId: string, file: File) => Promise<void>;
    createNewStory: (file: File) => Promise<void>;
    removeStory?: (id: string) => void;
    currentStoryIndex: number;
    currentContentIndex: number;
    setCurrentStoryIndex: (index: number) => void;
    setCurrentContentIndex: (index: number) => void;
    nextContent: () => void;
    prevContent: () => void;
    isViewerOpen: boolean;
    openViewer: (storyIndex: number) => void;
    closeViewer: () => void;
  }

export const ImageDimensions = {
    MAX_WIDTH_FRAME: 1080,
} as const;

export const StorageKeys = {
    STORIES: 'stories',
}