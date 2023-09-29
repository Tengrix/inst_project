import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { GetStaticPropsContext } from 'next';
import Image from 'next/image';
import { createTranslator, useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useGetUserDataQuery, useSubmitUserDataMutation } from '@/api/api';
import EditAvatarModal from '@/features/EditAvatarModal/EditAvatarModal';
import styles from '@/pages/profile-settings/general-information/styles.module.scss';
import { Button } from '@/shared/ui/button';
import { ControlledTextField } from '@/shared/ui/controlled';
import { ControlledTextAreaField } from '@/shared/ui/controlled/controlled-text-area';
import NewDatePicker from '@/shared/ui/newDatePicker/NewDatePicker';
import { TextField } from '@/shared/ui/text-field';
import { Typography } from '@/shared/ui/typography';
import { editProfileSchema, EditProfileType } from '@/shared/utils/schemas/editProfileSchema';
import github from 'public/assets/gitHub.png';

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
    const [image, setImage] = useState('');
    const [blob, setBlob] = useState<Blob>();
    const translationPath = 'profileSettings.tab.generalInformation';
    const t = useTranslations(translationPath);
    const tDefault = useTranslations();

    const [editProfile, { isLoading, isSuccess: isSaved }] = useSubmitUserDataMutation();
    const { data: userData, isSuccess } = useGetUserDataQuery();

    const { control, handleSubmit, reset } = useForm<EditProfileType>({
        resolver: zodResolver(editProfileSchema)
    });
    const getBlob = (blob: Blob) => setBlob(blob);
    const getCroppedImg = (img: string) => setImage(img);

    useEffect(() => {
        if (isSuccess) {
            if (userData.photo) {
                setImage(userData.photo);
                // const getBlob = async () => {
                //     const response = await fetch(userData.photo!).then(r => r.blob());
                //     return response;
                // };
                // getBlob().then(blobData => {
                //     setBlob(blobData);
                // });
            }
            reset({
                birthdayDate: userData?.birthdayDate ? new Date(userData?.birthdayDate) : undefined,
                aboutMe: userData?.aboutMe ?? '',
                city: userData?.city ?? '',
                firstName: userData?.firstName ?? '',
                lastName: userData?.lastName ?? ''
            });
        }
    }, [isSuccess]);

    const onSubmit = handleSubmit(async data => {
        const date = data.birthdayDate ? format(data.birthdayDate, "yyyy-MM-dd'T'HH:mm:ss'Z'") : '';
        editProfile({
            ...data,
            file: blob,
            birthdayDate: date
        }).unwrap();
    });
    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={onSubmit}>
                <div className={styles.formContent}>
                    <div className={styles.imageUpload}>
                        <div className={styles.avatar}>
                            {image ? (
                                <Image key={'UserAva'} alt={'UserAva'} src={image} width={192} height={192} />
                            ) : (
                                <Image src={github} alt={'Avatar'} height={192} width={192} />
                            )}
                        </div>
                        <EditAvatarModal getBlob={getBlob} getCroppedImg={getCroppedImg} />
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
                        {isSaved && (
                            <Typography variant={'regular14'} color={isSaved ? 'success' : 'error'}>
                                {'The information was successfully updated'}
                            </Typography>
                        )}
                    </div>
                    <Button disabled={isLoading} isLoading={isLoading} className={styles.btn}>
                        {tDefault('button.saveChanges')}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FormPage;
