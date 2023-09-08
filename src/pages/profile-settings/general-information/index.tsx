import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { GetStaticPropsContext } from 'next';
import Image from 'next/image';
import { createTranslator, useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Crop } from 'react-image-crop';
import { z } from 'zod';

import { useGetUserDataQuery, useSubmitUserDataMutation } from '@/api/api';
import { Canvas } from '@/components/Canvas/Canvas';
import EditAvatarModal from '@/components/EditAvatarModal/EditAvatarModal';
import styles from '@/pages/profile-settings/general-information/styles.module.scss';
import { Button } from '@/shared/ui/button';
import { ControlledTextField } from '@/shared/ui/controlled';
import { ControlledTextAreaField } from '@/shared/ui/controlled/controlled-text-area';
import NewDatePicker from '@/shared/ui/newDatePicker/NewDatePicker';
import { TextField } from '@/shared/ui/text-field';
import { Typography } from '@/shared/ui/typography';
import { editProfileSchema } from '@/shared/utils/schemas/editProfileSchema';
import github from 'public/assets/gitHub.png';

export type EditProfileType = z.infer<typeof editProfileSchema>;

export async function getStaticProps({ locale = 'en' }: GetStaticPropsContext) {
    const messages = (await import(`messages/${locale}/auth.json`)).default;

    const t = createTranslator({ locale: locale as string, messages });

    return {
        props: {
            messages: messages,
            title: t('profileSettings.pageTitle')
        }
    };
}

const FormPage = () => {
    const [isSuccess, setIsSuccess] = useState<'error' | 'success' | null>(null);
    const [image, setImage] = useState('');
    const [crop, setCrop] = useState<Crop>();
    const [canvas, setCanvas] = useState<HTMLCanvasElement>();
    const [blob, setBlob] = useState<Blob>();
    const translationPath = 'auth';
    const t = useTranslations(translationPath);

    const [editProfile, { isLoading }] = useSubmitUserDataMutation();
    const { data: userData } = useGetUserDataQuery();

    const { control, handleSubmit, reset } = useForm<EditProfileType>({
        resolver: zodResolver(editProfileSchema)
    });

    useEffect(() => {
        if (userData) {
            if (userData.photo) {
                setImage(userData.photo);
                // const getBlob = async () => {
                //     const response = await fetch(userData.photo!).then(r => r.blob());
                //     return response;
                // };
                // getBlob().then(blobData => {
                //     setBlob(blobData);
                // });
                reset({
                    birthdayDate: userData?.birthdayDate ? new Date(userData?.birthdayDate) : undefined,
                    aboutMe: userData?.aboutMe ?? '',
                    city: userData?.city ?? '',
                    firstName: userData?.firstName ?? '',
                    lastName: userData?.lastName ?? ''
                });
            }
        }
    }, [userData]);
    useEffect(() => {
        blob && setIsSuccess(null);
    }, [blob]);

    const onSubmit = handleSubmit(async data => {
        setIsSuccess(null);
        const date = data.birthdayDate ? format(data.birthdayDate, "yyyy-MM-dd'T'HH:mm:ss'Z'") : '';
        editProfile({
            ...data,
            file: blob,
            birthdayDate: date
        })
            .unwrap()
            .then(() => setIsSuccess('success'));
    });
    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={onSubmit}>
                <div className={styles.formContent}>
                    <div className={styles.imageUpload}>
                        <div className={styles.avatar}>
                            {image ? (
                                <Canvas
                                    crop={crop}
                                    step={'Publication'}
                                    filters={{}}
                                    imageSRC={image}
                                    destHeight={192}
                                    destWidth={192}
                                    getCanvas={setCanvas}
                                />
                            ) : (
                                <Image src={github} alt={'Avatar'} height={192} width={192} />
                            )}
                        </div>
                        <EditAvatarModal
                            image={image}
                            setImage={setImage}
                            onCrop={setCrop}
                            canvas={canvas}
                            setBlob={setBlob}
                            blob={blob}
                        />
                    </div>
                    <div className={styles.profileInfo}>
                        <TextField label={t('form.username')} value={userData?.login} readOnly />
                        <ControlledTextField
                            name="firstName"
                            translation={translationPath}
                            label={t('form.firstname')}
                            control={control}
                        />
                        <ControlledTextField
                            name="lastName"
                            translation={translationPath}
                            label={t('form.lastname')}
                            control={control}
                        />
                        <NewDatePicker name="birthdayDate" label={t('form.dateOfBirthday')} control={control} />
                        <ControlledTextField
                            name="city"
                            translation={translationPath}
                            label={t('form.city')}
                            control={control}
                        />
                        <ControlledTextAreaField
                            name="aboutMe"
                            translation={translationPath}
                            label={t('form.aboutMe')}
                            control={control}
                        />
                    </div>
                </div>
                <div className={styles.line}></div>
                <div className={styles.footer}>
                    <div>
                        {isSuccess !== null && (
                            <Typography variant={'regular14'} color={isSuccess === 'error' ? 'error' : 'success'}>
                                {isSuccess === 'error'
                                    ? 'Please upload your photo first'
                                    : 'The information was successfully updated'}
                            </Typography>
                        )}
                    </div>
                    <Button disabled={isLoading} isLoading={isLoading} className={styles.btn}>
                        {t('button.saveChanges')}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FormPage;
