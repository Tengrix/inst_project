import { useAppSelector } from '@/store';
import { useDispatch } from 'react-redux';
import { ImageSlider } from '../ImageSlider/ImageSlider';
import classes from './ImageEditor.module.scss';
import { ImageNavbar } from './Navbar/ImageNavbar';


type ImageEditorPropsType = {
  image: string;
};

export const ImageEditor = ({ image }: ImageEditorPropsType) => {

  const currentImage = useAppSelector((state) => state.images.currentImage) || '';
  const images = useAppSelector((state) => state.images.images);

  return (
    <div className={classes.currentImageField}>
      <ImageSlider currImage={currentImage} images={images} />
      {/*{currentImage && <img src={currentImage} alt="" />}*/}

      <ImageNavbar image={currentImage}/>
    </div>
  );
};
