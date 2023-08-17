import { useEffect, useRef }  from 'react';


type CanvasPropsType = {
  imageSRC: string
  filters: { [key: string]: number | string }
}

export const Canvas = ({ imageSRC, filters } : CanvasPropsType) => {
  //const { images, currentImage } = useAppSelector((state) => state.images);
  const canvasRef = useRef();

  useEffect(() => {
    //const [{ src, originalSRC, type, filters }] = images.filter(
     // (image: ImageType) => image.originalSRC === imageSRC,
    //);
    const effects = filters.color;
    const aspectRatio = +filters.crop;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = imageSRC;

    img.onload = () => {

      let outputWidth = img.width;
      let outputHeight = img.height;

      ctx.canvas.width = outputWidth
      ctx.canvas.height = outputHeight

      const imageAspectRatio = outputWidth / outputHeight;
      if (aspectRatio) {
        // if it's bigger than our target aspect ratio
        if (imageAspectRatio > aspectRatio) {
          outputWidth = outputHeight * aspectRatio;
        } else if (imageAspectRatio < aspectRatio) {
          outputHeight = outputWidth / aspectRatio;
        }
      }

      if (effects) {
        ctx.filter = effects;
      }

      ctx.drawImage(img, 0, 0, outputWidth, outputHeight, 0, 0, outputWidth, outputHeight);
    }
  }, [imageSRC, filters]);

  return <canvas ref={canvasRef} />
};
