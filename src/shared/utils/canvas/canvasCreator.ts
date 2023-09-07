import type { Crop } from 'react-image-crop';

import { StepType } from '@/components/CreatePostModal/CreatePostModal';

export const canvasCreator = (
    imageSRC: string,
    filters: { [key: string]: string },
    step: StepType = 'Cropping',
    destWidth: number = 462,
    destHeight: number = 352,
    crop?: Crop,
    canvas?: HTMLCanvasElement,
    getCanvas?: (canvas: HTMLCanvasElement) => void
): any => {
    //const [{ src, originalSRC, type, filters }] = images.filter(
    // (image: ImageType) => image.originalSRC === imageSRC,
    //);

    const effects = filters.color;
    // const aspectRatio = +filters.crop;

    if (!canvas) {
        canvas = document.createElement('canvas');
    }
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = imageSRC;

    img.onload = () => {
        const srcRatio = img.width / img.height;
        const destRatio = destWidth / destHeight;
        const scaleX = img.width / 100;
        const scaleY = img.height / 100;

        if (!crop) {
            crop = {
                unit: '%',
                x: 0,
                y: 0,
                width: 100,
                height: 100
            };
        }
        const cropAspectRatio =
            crop.unit === '%' ? (crop.width * img.width) / (crop.height * img.height) : crop.width / crop.height;

        if (step === 'Cropping') {
            const canvasWidth = srcRatio >= destRatio ? destWidth : destHeight * srcRatio;
            const canvasHeight = srcRatio >= destRatio ? destWidth / srcRatio : destHeight;
            ctx!.canvas.width = canvasWidth;
            ctx!.canvas.height = canvasHeight;
            // TODO: need refactor
            if (effects) {
                ctx!.filter = effects;
            }

            ctx!.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvasWidth, canvasHeight);
        } else {
            const canvasWidth = cropAspectRatio >= destRatio ? destWidth : destHeight * cropAspectRatio;
            const canvasHeight = cropAspectRatio >= destRatio ? destWidth / cropAspectRatio : destHeight;
            const cropWidth = crop.unit === '%' ? crop.width * scaleX : crop.width;
            const cropHeight = crop.unit === '%' ? crop.height * scaleY : crop.height;
            ctx!.canvas.width = canvasWidth;
            ctx!.canvas.height = canvasHeight;

            // TODO: need refactor
            if (effects) {
                ctx!.filter = effects;
            }
            console.log(cropWidth, cropHeight);
            ctx!.drawImage(
                img,
                crop.x! * scaleX,
                crop.y! * scaleY,
                cropWidth,
                cropHeight,
                0,
                0,
                canvasWidth,
                canvasHeight
            );
        }
    };
    console.log(img);
    return canvas;
};
