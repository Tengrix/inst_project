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
import { Typography } from '@/shared/ui/typography';
import Person from 'public/assets/icons/fonts/person.svg';
import Image from 'next/image';
import { useState } from 'react';

type ImageEditorPropsType = {
  image: string;
  step: StepType;
};

export const ImageEditor = (props: ImageEditorPropsType) => {
  const currentImage = useAppSelector((state) => state.images.currentImage);
  const images = useAppSelector((state) => state.images.images);

  const [symbols, setSymbols] = useState([]);

  const { control, handleSubmit } = useForm<CreatePostFormType>({
    resolver: zodResolver(createPostSchema),
  });

  /*  В data лежит description и title для отправки на сервер. Присутуль, пожалуйста, к кнопке publish*/
  const onSubmit = handleSubmit((data) => {
    console.log('PUBLISH TEST : ', data);
  });
  /*  В data лежит description и title для отправки на сервер. Присутуль, пожалуйста, к кнопке publish*/

  const calculateSymbols = (e: any) => {
    console.log(e.currentTarget.value);
    setSymbols(e.currentTarget.value);
  };

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
          <div className={classes.publicationDescriptionBlock}>
            <div className={classes.user}>
              <Image src={Person} alt="Person avatar" />
              <Typography variant="regular16">User name</Typography>
            </div>
            <form className={classes.form} onSubmit={onSubmit}>
              <ControlledTextField name={'title'} label={'Post title'} control={control} />
              <ControlledTextAreaField
                name={'description'}
                label={'Add publication descriptions'}
                control={control}
                onKeyUp={calculateSymbols}
              />
              <Typography
                variant="medium14"
                className={classes.symbolsCounter}
              >{`${symbols.length}/500 `}</Typography>
              {/* Publish test  - это кнопка для теста, чтобы button c onSubmit не перезагружал страницу . Можно удалять */}
              <div className={classes.buttonForTest} onClick={onSubmit}>
                PUBLISH TEST
              </div>
              {/* Publish test  - это кнопка для теста, чтобы button c onSubmit не перезагружал страницу . Можно удалять */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
