import {useEffect, useRef} from 'react';
import ImageCropper from "@/components/ImageCropper/ImageCropper";
import {StepType} from "@/pages/post/createPostModal/CreatePostModal";
import {Crop} from "react-image-crop";


type CanvasPropsType = {
  imageSRC: string
  filters: { [key: string]: number | string }
  step: StepType
  crop:Crop
}


export const Canvas = ({ imageSRC, filters, step, crop} : CanvasPropsType) => {
  //const { images, currentImage } = useAppSelector((state) => state.images);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    //const [{ src, originalSRC, type, filters }] = images.filter(
     // (image: ImageType) => image.originalSRC === imageSRC,
    //);

    const effects = filters.color;
    const aspectRatio = +filters.crop;

    const canvas = canvasRef.current;
    const ctx = canvas!.getContext('2d');

    const img = new Image();
    img.src = imageSRC;
    if (!crop) {
      crop ={
        unit: 'px',
        x: 0,
        y: 0,
        width: img.width,
        height: img.height,
      }
    }

    img.onload = () => {

      const scaleX = img.width / 462;
      const scaleY = img.height / 346;

      let outputWidth =  crop.width
      let outputHeight =  crop.height

      // ctx!.canvas.width = step==='Cropping' ? img.width : crop.width
      // ctx!.canvas.height = step==='Cropping' ? img.height : crop.height
      ctx!.canvas.width = img.width
      ctx!.canvas.height = img.height
      const imageAspectRatio = outputWidth / outputHeight;
      // if (aspectRatio) {
      //   // if it's bigger than our target aspect ratio
      //   if (imageAspectRatio > aspectRatio) {
      //     outputWidth = outputHeight * aspectRatio;
      //   } else if (imageAspectRatio < aspectRatio) {
      //     outputHeight = outputWidth / aspectRatio;
      //   }
      // }

      if (effects) {
        ctx!.filter = effects;
      }
      console.log('cropsize',crop)
      if(step==='Cropping') {
        console.log( 'Crop',0, 0, img.width, img.height, 0, 0, img.width, img.height)
        ctx!.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);

      } else {
        console.log('Not crop',crop.x!*scaleX, crop.y!*scaleY, outputWidth * scaleX, outputHeight * scaleY, 0, 0, img.width, img.height)
        ctx!.drawImage(img, crop.x!*scaleX, crop.y!*scaleY, outputWidth * scaleX, outputHeight * scaleY, 0, 0, img.width, img.height);

      }
    }
  }, [imageSRC, filters,step]);

  return step === 'Cropping' ?
      <ImageCropper ref={canvasRef} src={imageSRC}>
        <canvas ref={canvasRef}/>
      </ImageCropper>
      :
      <canvas ref={canvasRef}/>

};
