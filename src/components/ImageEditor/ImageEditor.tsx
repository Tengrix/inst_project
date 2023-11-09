import { zodResolver } from '@hookform/resolvers/zod';
import { GetStaticPropsContext } from 'next';
import Image from 'next/image';
import { createTranslator, useTranslations } from 'next-intl';
import { KeyboardEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useGetUserDataQuery } from '@/api/api';
import { StepType } from '@/components/CreatePostModal/CreatePostModal';
import { ImageNavbar } from '@/components/ImageEditor/Navbar/ImageNavbar';
import { ImageFilter } from '@/components/ImageEditor/NavbarItems/Filter/ImageFilter';
import { ImageSlider } from '@/components/ImageSlider/ImageSlider';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setDescription } from '@/redux/store/imageSlice/imageSlice';
import { ControlledTextAreaField } from '@/shared/ui/controlled/controlled-text-area';
import { Typography } from '@/shared/ui/typography';
import { CreatePostFormType, createPostSchema } from '@/shared/utils/schemas/createPostSchema';
import Person from 'public/assets/icons/fonts/person.svg';

import s from './ImageEditor.module.scss';

type ImageEditorPropsType = {
    step: StepType;
};

export async function getStaticProps({ locale = 'en' }: GetStaticPropsContext) {
    const messages = (await import(`messages/${locale}/auth.json`)).default;

    const t = createTranslator({ locale: locale as string, messages });

    return {
        props: {
            messages: messages,
            title: t('myProfile.pageTitle')
        }
    };
}

export const ImageEditor = (props: ImageEditorPropsType) => {
    const dispatch = useAppDispatch();
    const currentImage = useAppSelector(state => state.images.currentImage);
    const images = useAppSelector(state => state.images.images);
    const translationPath = 'auth';
    const t = useTranslations(translationPath);

    const [descriptionSymbols, setDescriptionSymbols] = useState('');

    const { control, setValue, trigger, watch, formState } = useForm<CreatePostFormType>({
        resolver: zodResolver(createPostSchema)
    });
    const { data: userData } = useGetUserDataQuery();
    const handleChange = (name: keyof CreatePostFormType, value: string) => {
        setValue(name, value);
        trigger(name);
    };
    const [description] = watch(['description']);

    useEffect(() => {
        formState.isValid && dispatch(setDescription({ description }));
    }, [description, dispatch, formState.isValid]);

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
                            <Image
                                src={userData?.photo ? userData.photo : Person}
                                alt="Person avatar"
                                width={50}
                                height={50}
                            />
                            <Typography variant="regular16">{`${userData?.firstName} ${userData?.lastName}`}</Typography>
                        </div>
                        <form className={s.form}>
                            <ControlledTextAreaField
                                name={'description'}
                                label={t('form.addPublicationDescription')}
                                translation={translationPath}
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
