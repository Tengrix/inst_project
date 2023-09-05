import { useCallback, useEffect, useState } from 'react';
import { Crop } from 'react-image-crop';

import { StepType } from '@/components/CreatePostModal/CreatePostModal';
import ImageCropper from '@/components/ImageCropper/ImageCropper';

type CanvasPropsType = {
    imageSRC: string;
    filters: { [key: string]: string };
    step: StepType;
    crop?: Crop;
    destWidth: number;
    destHeight: number;
    getCanvas?: (canvas: HTMLCanvasElement) => void;
};

export const Canvas = ({ imageSRC, filters, step, crop, destWidth, destHeight, getCanvas }: CanvasPropsType) => {
    //const { images, currentImage } = useAppSelector((state) => state.images);
    //const canvasRef = useRef<HTMLCanvasElement | null>(null);
    //const canvasRef = useRef();
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

    const fn = useCallback(
        (canvas: HTMLCanvasElement) => {
            //const [{ src, originalSRC, type, filters }] = images.filter(
            // (image: ImageType) => image.originalSRC === imageSRC,
            //);

            const effects = filters.color;
            // const aspectRatio = +filters.crop;

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
                    crop.unit === '%'
                        ? (crop.width * img.width) / (crop.height * img.height)
                        : crop.width / crop.height;

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
        },
        [imageSRC, filters, step]
    );

    useEffect(() => {
        if (canvas) {
            fn(canvas);
            getCanvas && getCanvas(canvas);
            console.log(canvas, 'newcanvas');
        }
    }, [fn, canvas]);
    return step === 'Cropping' ? (
        <ImageCropper src={imageSRC}>
            <canvas ref={htmlElement => setCanvas(htmlElement)} />
        </ImageCropper>
    ) : (
        <canvas ref={htmlElement => setCanvas(htmlElement)} />
    );
};
