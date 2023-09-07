import type { MimeType } from '../../../redux/store/imageSlice/types/store';

export const canvasToBlob = (canvas: HTMLCanvasElement, imageMimeType: MimeType = 'image/jpeg'): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
            if (blob) {
                resolve(blob);
            } else {
                reject(new Error('Failed to convert canvas to blob.'));
            }
        }, imageMimeType);
    });
};
