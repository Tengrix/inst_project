import { useCallback, useEffect, useState } from 'react';
import { Crop } from 'react-image-crop';

import { StepType } from '@/components/CreatePostModal/CreatePostModal';
import ImageCropper from '@/components/ImageCropper/ImageCropper';

type CanvasPropsType = {
    imageSRC: string;
    filters: { [key: string]: string };
    step: StepType;
    crop?: Crop;
    defWidth: number;
    defHeight: number;
    // eslint-disable-next-line no-unused-vars
    getCanvas?: (canvas: HTMLCanvasElement) => void;
};

export const Canvas = ({ imageSRC, filters, step, crop, defWidth, defHeight, getCanvas }: CanvasPropsType) => {
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
                const imageRatio = img.width / img.height;
                const scale = img.width / defWidth;

                if (!crop) {
                    crop = {
                        unit: 'px',
                        x: 0,
                        y: 0,
                        width: defWidth,
                        height: defWidth / imageRatio
                    };
                }

                const imageAspectRatio = crop.width / crop.height;

                if (effects) {
                    ctx!.filter = effects;
                }

                if (step === 'Cropping') {
                    const canvasWidth = imageRatio >= 1 ? defWidth : defWidth * imageRatio;
                    const canvasHeight = imageRatio >= 1 ? defHeight / imageRatio : defHeight;
                    ctx!.canvas.width = canvasWidth;
                    ctx!.canvas.height = canvasHeight;

                    ctx!.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvasWidth, canvasHeight);
                } else {
                    const canvasWidth = imageAspectRatio >= 1 ? defWidth : defWidth * imageAspectRatio;
                    const canvasHeight = imageAspectRatio >= 1 ? defWidth / imageAspectRatio : defHeight;
                    ctx!.canvas.width = canvasWidth;
                    ctx!.canvas.height = canvasHeight;

                    ctx!.drawImage(
                        img,
                        crop.x! * scale,
                        crop.y! * scale,
                        crop.width * scale,
                        crop.height * scale,
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
