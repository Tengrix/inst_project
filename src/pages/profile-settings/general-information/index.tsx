import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Crop } from 'react-image-crop';
import { z } from 'zod';

import { useGetUserDataQuery, useSubmitUserDataMutation } from '@/api/authApi';
import { Canvas } from '@/components/Canvas/Canvas';
import EditAvatarModal from '@/components/EditAvatarModal/EditAvatarModal';
import { getLayout } from '@/components/Layout/BaseLayout/BaseLayout';
import styles from '@/pages/profile-settings/general-information/styles.module.css';
import { Button } from '@/shared/ui/button';
import { ControlledTextField } from '@/shared/ui/controlled';
import { ControlledTextAreaField } from '@/shared/ui/controlled/controlled-text-area';
import NewDatePicker from '@/shared/ui/newDatePicker/NewDatePicker';
import { editProfileSchema } from '@/shared/utils/schemas/editProfileSchema';
import github from 'public/assets/gitHub.png';

export type EditProfileType = z.infer<typeof editProfileSchema>;

const FormPage = () => {
    const [image, setImage] = useState('');
    const [crop, setCrop] = useState<Crop>();
    const [canvas, setCanvas] = useState<HTMLCanvasElement>();
    const [blob, setBlob] = useState<Blob>();

    const [editProfile] = useSubmitUserDataMutation();
    const { data: userData } = useGetUserDataQuery();

    const { control, handleSubmit, reset } = useForm<EditProfileType>({
        resolver: zodResolver(editProfileSchema)
    });
    useEffect(() => {
        console.log(userData);
        if (userData) {
            userData.photo && setImage(userData.photo);
            reset({
                birthdayDate: userData?.birthdayDate ? new Date(userData?.birthdayDate) : undefined,
                aboutMe: userData?.aboutMe,
                city: userData?.city,
                firstName: userData?.firstName,
                lastName: userData?.lastName,
                userName: userData?.login
            });
        }
    }, [userData]);

    const getCanvas = (canvas: HTMLCanvasElement) => {
        setCanvas(canvas);
    };

    const onSubmit = handleSubmit(async data => {
        console.log(data);
        const date = format(data.birthdayDate, "yyyy-MM-dd'T'HH:mm:ss'Z'");
        blob && editProfile({ ...data, file: blob, birthdayDate: date });
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
                                    defHeight={192}
                                    defWidth={192}
                                    getCanvas={getCanvas}
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
                        />
                    </div>
                    <div className={styles.profileInfo}>
                        <ControlledTextField name="userName" label="Username" control={control} />
                        <ControlledTextField name="firstName" label="Firstname" control={control} />
                        <ControlledTextField name="lastName" label="Lastname" control={control} />
                        <NewDatePicker name="birthdayDate" label="Date of Birthday" control={control} />
                        <ControlledTextField name="city" label="City" control={control} />
                        <ControlledTextAreaField name="aboutMe" label="About me" control={control} />
                    </div>
                </div>
                <div className={styles.line}></div>
                <Button className={styles.btn}>Save changes</Button>
            </form>
        </div>
    );
};

FormPage.getLayout = getLayout;
export default FormPage;
