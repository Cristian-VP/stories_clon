export interface Story {
    id: string;
    imageUrl: string;
    timestamp: number;
    duration: number;
}

export const ImageDimensions = {
    MAX_WIDTH_FRAME: 1080,
} as const;