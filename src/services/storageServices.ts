import {StorageKeys, type Story} from "../types.ts";

export const loadStoriesFromLocalStorage = (): Story[] => {
    try {
        const stored = localStorage.getItem(StorageKeys.STORIES);

        if (stored) {
            const parsed = JSON.parse(stored) as Story[];
            return Array.isArray(parsed) ? parsed : [];
        }

        return [];
    } catch (error) {
        console.error('Error al cargar stories desde localStorage:', error);

        return [];
    }
};


export const saveStoriesToLocalStorage = (stories: Story[]): void => {
    try {
        const jsonValue = JSON.stringify(stories);
        localStorage.setItem(StorageKeys.STORIES, jsonValue);
    } catch (error) {
        console.error('Error al guardar stories en localStorage:', error);
    }
}
