import {useAppDispatch, useAppSelector} from '@/store';
import { ImageSlider } from '../ImageSlider/ImageSlider';
import classes from './ImageEditor.module.scss';
import { ImageNavbar } from './Navbar/ImageNavbar';
import { ImageFilter } from './NavbarItems/Filter/ImageFilter';
import { StepType } from '@/pages/post/createPostModal/CreatePostModal';
import { ControlledTextField } from '@/shared/ui/controlled';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreatePostFormType, createPostSchema } from '@/shared/utils/schemas/createPostSchema';
import { ControlledTextAreaField } from '@/shared/ui/controlled/controlled-text-area';
import { Typography } from '@/shared/ui/typography';
import Person from 'public/assets/icons/fonts/person.svg';
import Image from 'next/image';
import {KeyboardEvent, useEffect, useState} from 'react';
import {setDescription} from "@/shared/lib/imageStore";

type ImageEditorPropsType = {
  step: StepType;
};

export const ImageEditor = (props: ImageEditorPropsType) => {
  const dispatch = useAppDispatch()
  const currentImage = useAppSelector((state) => state.images.currentImage);
  const images = useAppSelector((state) => state.images.images);

  const [descriptionSymbols, setDescriptionSymbols] = useState('');

  const {control, setValue, trigger, watch, formState} = useForm<CreatePostFormType>({
    resolver: zodResolver(createPostSchema),
  });

  const handleChange = (name:keyof CreatePostFormType, value:string) => {
    setValue(name, value)
    trigger(name)
  }
  const [title, description] = watch(['title', 'description'])

  useEffect(()=> {
    formState.isValid && dispatch(setDescription({title,description}))
  },[title,description])


  const calculateSymbols = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    setDescriptionSymbols(e.currentTarget.value);
  };

  return (
    <div className={classes.container}>
      <div className={classes.currentImageField}>
        <ImageSlider currImage={currentImage} images={images} step={props.step} />
          {props.step === 'Cropping' && <ImageNavbar/>}
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
            <form className={classes.form}>
              <ControlledTextField
                  name={'title'}
                  label={'Post title'}
                  control={control}
                  onKeyDown={(e) => handleChange('title', e.currentTarget.value)}
              />
              <ControlledTextAreaField
                name={'description'}
                label={'Add publication descriptions'}
                control={control}
                onKeyUp={(e) => {
                  handleChange('description', e.currentTarget.value)
                  calculateSymbols(e)
                }}
              />
              <Typography
                variant="medium14"
                className={classes.symbolsCounter}
              >{`${descriptionSymbols.length}/500 `}</Typography>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
