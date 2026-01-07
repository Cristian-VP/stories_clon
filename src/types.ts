export interface Story {
    id: string;
    imageUrl: string;
    timestamp: number;
    duration: number;
}

export interface StoriesContextValue {
    stories: Story[];
    addStory: (file: File) => Promise<void>;  // Recibe File, no Story
    removeStory?: (id: string) => void;       // Opcional para esta fase
    currentStoryIndex?: number;
    nextStory?: () => void;
    prevStory?: () => void;
  }

export const ImageDimensions = {
    MAX_WIDTH_FRAME: 1080,
} as const;

export const StorageKeys = {
    STORIES_SAVED: 'stories_saved',
    STORIES_TO_SAVE: 'stories_to_save'
}