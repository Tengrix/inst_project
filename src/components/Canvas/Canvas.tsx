import { ImageType } from '@/shared/lib/imageStore';
import { useAppSelector } from '@/store';
import { useEffect, useRef } from 'react';

export const Canvas = (props: any) => {
  const { images, currentImage } = useAppSelector((state) => state.images);
  const canvasRef = useRef(null);

  useEffect(() => {
    const [{ src, originalSRC, type, filters }] = images.filter(
      (image: ImageType) => image.originalSRC === currentImage.src,
    );
    const effects = filters.color;

    const canvas = canvasRef.current;
    //@ts-ignore

    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = src;
    console.log('IMG : ', img);

    const aspectRatio = +filters.crop;

    let outputWidth = img.width;
    let outputHeight = img.height;

    const imageAspectRatio = outputWidth / outputHeight;
    if (aspectRatio) {
      // if it's bigger than our target aspect ratio
      if (imageAspectRatio > aspectRatio) {
        outputWidth = outputHeight * aspectRatio;
      } else if (imageAspectRatio < aspectRatio) {
        outputHeight = outputWidth / aspectRatio;
      }
    }
    canvas.width = 200;
    canvas.height = 200;

    console.log('width : ', img.width, 'height : ', img.height);

    if (effects) {
      ctx.filter = effects;
    }
    ctx.drawImage(img, 0, 0, outputWidth, outputHeight, 0, 0, 200, 200);

    //Our first draw
    /* context.fillStyle = '#000000';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height); */
  }, [currentImage, images]);

  return <canvas ref={canvasRef} {...props} />;
};
