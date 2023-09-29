import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { GetStaticPropsContext } from 'next';
import { createTranslator, useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useGetUserDataQuery, useSubmitUserDataMutation } from '@/api/api';
import { Avatar } from '@/entities/avatar';
import { ProfileInfoForm } from '@/entities/profileInfoForm';
import EditAvatarModal from '@/features/EditAvatarModal/EditAvatarModal';
import styles from '@/pages/profile-settings/general-information/styles.module.scss';
import { Button } from '@/shared/ui/button';
import { Typography } from '@/shared/ui/typography';
import { editProfileSchema, EditProfileType } from '@/shared/utils/schemas/editProfileSchema';

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

export const GeneralInformation = () => {
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
    const setCroppedImg = (img: string) => setImage(img);

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
                        <Avatar image={image} width={192} height={192} />
                        <EditAvatarModal getBlob={getBlob} getCroppedImg={setCroppedImg} />
                    </div>
                    <ProfileInfoForm userData={userData} control={control} />
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
