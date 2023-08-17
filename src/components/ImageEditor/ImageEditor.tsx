import {useAppSelector} from '@/store';
import {ImageSlider} from '../ImageSlider/ImageSlider';
import classes from './ImageEditor.module.scss';
import {ImageNavbar} from './Navbar/ImageNavbar';
import {ImageFilter} from './NavbarItems/Filter/ImageFilter';
import {StepType} from "@/pages/post/createPostModal/CreatePostModal";

type ImageEditorPropsType = {
  image: string;
  step: StepType
};

export const ImageEditor = (props:ImageEditorPropsType) => {
  const currentImage = useAppSelector((state) => state.images.currentImage);
  const images = useAppSelector((state) => state.images.images);

  return (
    <div className={classes.container}>
      <div className={classes.currentImageField}>
        <ImageSlider currImage={currentImage} images={images} step={props.step} />
          {props.step === 'Cropping' && <ImageNavbar/>}
      </div>
        {props.step === 'Filters' &&
            <div className={classes.right}>
                <ImageFilter image={currentImage}/>
            </div>
        }
        {props.step === 'Publication' &&
            <div className={classes.right}>
                DESCRIPTION BLOCK
            </div>
        }
    </div>
  );
};
