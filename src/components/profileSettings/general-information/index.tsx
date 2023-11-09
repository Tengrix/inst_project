import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { GetStaticPropsContext } from 'next';
import Image from 'next/image';
import { createTranslator, useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useGetUserDataQuery, useSubmitUserDataMutation } from '@/api/api';
import EditAvatarModal from '@/components/EditAvatarModal/EditAvatarModal';
import styles from '@/components/profileSettings/general-information/styles.module.scss';
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

const GeneralInformation = () => {
    const [isSaved, setIsSaved] = useState(false);
    const [image, setImage] = useState('');
    const [blob, setBlob] = useState<Blob>();
    const translationPath = 'profileSettings.tab.generalInformation';
    const t = useTranslations(translationPath);
    const tDefault = useTranslations();

    const [editProfile, { isLoading }] = useSubmitUserDataMutation();
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
        setIsSaved(false);
        const date = data.birthdayDate ? format(data.birthdayDate, "yyyy-MM-dd'T'HH:mm:ss'Z'") : '';
        editProfile({
            ...data,
            file: blob,
            birthdayDate: date
        })
            .unwrap()
            .then(() => setIsSaved(true));
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
                        <EditAvatarModal getBlob={getBlob} setCroppedImg={setCroppedImg} />
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
                            <Typography variant={'regular14'} color={isSaved ? 'success' : 'error'}>
                                {isSaved && 'The information was successfully updated'}
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

export default GeneralInformation;
