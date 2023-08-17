import { useAppSelector } from '@/store';
import { ImageSlider } from '../ImageSlider/ImageSlider';
import classes from './ImageEditor.module.scss';
import { ImageNavbar } from './Navbar/ImageNavbar';
import { ImageFilter } from './NavbarItems/Filter/ImageFilter';
import { StepType } from '@/pages/post/createPostModal/CreatePostModal';
import { ControlledTextField } from '@/shared/ui/controlled';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreatePostFormType, createPostSchema } from '@/shared/utils/schemas/createPostSchema';
import { TextArea } from '@/shared/ui/text-area';
import { ControlledTextAreaField } from '@/shared/ui/controlled/controlled-text-area';

type ImageEditorPropsType = {
  image: string;
  step: StepType;
};

export const ImageEditor = (props: ImageEditorPropsType) => {
  const currentImage = useAppSelector((state) => state.images.currentImage);
  const images = useAppSelector((state) => state.images.images);
  const { control, handleSubmit } = useForm<CreatePostFormType>({
    resolver: zodResolver(createPostSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log('PUBLISH TEST : ', data);
  });

  return (
    <div className={classes.container}>
      <div className={classes.currentImageField}>
        <ImageSlider currImage={currentImage} images={images} />
        {props.step === 'Cropping' && <ImageNavbar />}
      </div>
      {props.step === 'Filters' && (
        <div className={classes.right}>
          <ImageFilter image={currentImage} />
        </div>
      )}
      {props.step === 'Publication' && (
        <div className={classes.right}>
          <form className={classes.form} onSubmit={onSubmit}>
            <ControlledTextAreaField
              name={'description'}
              label={'Add publication descriptions'}
              control={control}
            />
            <div onClick={onSubmit}>PUBLISH TEST</div>
          </form>
        </div>
      )}
    </div>
  );
};
