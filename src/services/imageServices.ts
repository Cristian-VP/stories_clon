import { ImageDimensions } from "../types";

const getScaledDimensions = (widthOriginal: number, heightOriginal: number, maxSize: number) => {
    switch (widthOriginal <= ImageDimensions.MAX_WIDTH_FRAME) {
        case true:
            return {
                width: widthOriginal,
                height: heightOriginal,
            };
            
        default:
            let maxSide = Math.max(widthOriginal, heightOriginal);
            let scale: number = maxSize / maxSide;
            let widthScaled: number = widthOriginal * scale;
            let heightScaled: number = heightOriginal * scale;
            return {
                width: widthScaled,
                height: heightScaled,
        };
    }
}

const loadImage = (file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const image = new Image();
            image.src = reader.result as string;
            image.onload = () => {
                resolve(image)
            }
        };
        reader.onerror = (error) => {
            console.error('Error al leer la imagen:', error);
            reject(error);
        };
    });
}

const canvasToBase64 = (canvas: HTMLCanvasElement) => {
    return canvas.toDataURL('image/jpeg', 0.8);
}

const drawImageOnCanvas = (image: HTMLImageElement): string => {
    if (image == null) throw new Error('No se pudo cargar la imagen')
    
    const canvas: HTMLCanvasElement = document.createElement('canvas'); 
    let originalWidth: number = image.naturalWidth
    let originalHeight: number = image.naturalHeight
    let newDimensions: {width: number, height: number} = getScaledDimensions(originalWidth, originalHeight, ImageDimensions.MAX_WIDTH_FRAME)
    
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('No se pudo obtener el contexto 2D del canvas')

    canvas.width = newDimensions.width;
    canvas.height = newDimensions.height;
    ctx.drawImage(image, 0, 0, newDimensions.width, newDimensions.height)

    return canvasToBase64(canvas);
}




export const compressImageToBase64 = (image: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        loadImage(image)
            .then((img) => {
                resolve(drawImageOnCanvas(img))
            })
            .catch((error) => {
                reject(error)
            })
    });
};




