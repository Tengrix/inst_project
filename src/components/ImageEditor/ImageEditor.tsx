import { ImageGalleryUploader } from '@/shared/ui/file-uploader/file-uploader';
import { useAppSelector } from '@/store';
import classes from './ImageEditor.module.scss';
import { ImageNavbar } from './Navbar/ImageNavbar';
import { addImage } from '@/shared/lib/imageStore';
import { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { ImageSlider } from '../ImageSlider/ImageSlider';
import { ImageGallery } from './NavbarItems/Gallery/ImageGallery';
import { ImageScale } from './NavbarItems/Scale/ImageScale';
import { ImageResize } from './NavbarItems/Resize/ImageResize';

type ImageEditorPropsType = {
  image: string;
};

export const ImageEditor = ({ image }: ImageEditorPropsType) => {
  const dispatch = useDispatch();
  const currentImage = useAppSelector((state) => state.images.currentImage);
  const images = useAppSelector((state) => state.images.images);

  return (
    <div className={classes.currentImageField}>
      <ImageSlider currImage={currentImage} images={images} />
      {/*{currentImage && <img src={currentImage} alt="" />}*/}

      <ImageNavbar />
    </div>
  );
};
