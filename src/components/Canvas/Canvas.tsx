import { useCallback, useEffect, useState } from 'react';
import { Crop } from 'react-image-crop';

import { StepType } from '@/components/CreatePostModal/CreatePostModal';
import ImageCropper from '@/components/ImageCropper/ImageCropper';
import { canvasCreator } from '@/shared/utils/canvas/canvasCreator';

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
            canvasCreator(imageSRC, filters, crop, step, destWidth, destHeight, canvas);
        },
        [imageSRC, filters, crop, step, destWidth, destHeight]
    );

    useEffect(() => {
        if (canvas) {
            fn(canvas);
            getCanvas && getCanvas(canvas);
            console.log(canvas, 'newcanvas');
        }
    }, [fn, canvas]);
    return step === 'Cropping' ? (
        <ImageCropper src={imageSRC} destWidth={destWidth} destHeight={destHeight}>
            <canvas ref={htmlElement => setCanvas(htmlElement)} />
        </ImageCropper>
    ) : (
        <canvas ref={htmlElement => setCanvas(htmlElement)} />
    );
};
