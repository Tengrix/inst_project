import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { KeyboardEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { StepType } from '@/components/CreatePostModal/CreatePostModal';
import { ImageNavbar } from '@/components/ImageEditor/Navbar/ImageNavbar';
import { ImageFilter } from '@/components/ImageEditor/NavbarItems/Filter/ImageFilter';
import { ImageSlider } from '@/components/ImageSlider/ImageSlider';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setDescription } from '@/redux/store/imageSlice/imageSlice';
import { ControlledTextField } from '@/shared/ui/controlled';
import { ControlledTextAreaField } from '@/shared/ui/controlled/controlled-text-area';
import { Typography } from '@/shared/ui/typography';
import { CreatePostFormType, createPostSchema } from '@/shared/utils/schemas/createPostSchema';
import Person from 'public/assets/icons/fonts/person.svg';

import s from './ImageEditor.module.scss';

type ImageEditorPropsType = {
    step: StepType;
};

export const ImageEditor = (props: ImageEditorPropsType) => {
    const dispatch = useAppDispatch();
    const currentImage = useAppSelector(state => state.images.currentImage);
    const images = useAppSelector(state => state.images.images);

    const [descriptionSymbols, setDescriptionSymbols] = useState('');

    const { control, setValue, trigger, watch, formState } = useForm<CreatePostFormType>({
        resolver: zodResolver(createPostSchema)
    });

    const handleChange = (name: keyof CreatePostFormType, value: string) => {
        setValue(name, value);
        trigger(name);
    };
    const [title, description] = watch(['title', 'description']);

    useEffect(() => {
        formState.isValid && dispatch(setDescription({ title, description }));
    }, [title, description, dispatch, formState.isValid]);

    const calculateSymbols = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        setDescriptionSymbols(e.currentTarget.value);
    };

    return (
        <div className={s.container}>
            <div className={s.currentImageField}>
                <ImageSlider currImage={currentImage} images={images} step={props.step} />
                {props.step === 'Cropping' && <ImageNavbar />}
            </div>
            {props.step === 'Filters' && (
                <div className={s.right}>
                    <ImageFilter image={currentImage} />
                </div>
            )}
            {props.step === 'Publication' && (
                <div className={s.right}>
                    <div className={s.publicationDescriptionBlock}>
                        <div className={s.user}>
                            <Image src={Person} alt="Person avatar" />
                            <Typography variant="regular16">User name</Typography>
                        </div>
                        <form className={s.form}>
                            <ControlledTextField
                                name={'title'}
                                label={'Post title'}
                                control={control}
                                onKeyDown={e => handleChange('title', e.currentTarget.value)}
                            />
                            <ControlledTextAreaField
                                name={'description'}
                                label={'Add publication descriptions'}
                                control={control}
                                onKeyUp={e => {
                                    handleChange('description', e.currentTarget.value);
                                    calculateSymbols(e);
                                }}
                            />
                            <Typography
                                variant="medium14"
                                className={s.symbolsCounter}>{`${descriptionSymbols.length}/500 `}</Typography>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
