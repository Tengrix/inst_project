import { convertToPixelCrop, Crop } from 'react-image-crop';

import { canvasToBlob } from '@/shared/utils/canvas/canvasToBlob';

export const imageToBlob = async (percentCrop: Crop, image: HTMLImageElement) => {
    const pixelCrop = convertToPixelCrop(percentCrop, image.width, image.height);
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    if (ctx) {
        ctx.drawImage(
            image,
            pixelCrop.x * scaleX,
            pixelCrop.y * scaleY,
            pixelCrop.width * scaleX,
            pixelCrop.height * scaleY,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );
    }

    const base64Image = canvas.toDataURL('image/jpeg');
    const blob = await canvasToBlob(canvas);
    return { base64Image, blob };
};
