import React, {useState, ChangeEvent, useRef} from 'react';
import {ControlledTextField} from '@/shared/ui/controlled';
import styles from '@/pages/profile-settings/general-information/styles.module.css';
import {getLayout} from '@/components/Layout/BaseLayout/BaseLayout';
import {useForm} from 'react-hook-form';
import {editProfileSchema} from "@/shared/utils/schemas/editProfileSchema";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {ControlledTextAreaField} from "@/shared/ui/controlled/controlled-text-area";
import {Button} from "@/shared/ui/button";
import NewDatePicker from "@/shared/ui/newDatePicker/NewDatePicker";
import EditAvatarModal from "@/components/EditAvatarModal/EditAvatarModal";
import github from "public/assets/gitHub.png"
import Image from "next/image";
import {Crop} from "react-image-crop";
import {Canvas} from "@/components/Canvas/Canvas";
import {useSubmitUserDataMutation} from "@/api/authApi";
import {format} from "date-fns";

export type EditProfileType = z.infer<typeof editProfileSchema>

const FormPage = () => {
    const [image, setImage] = useState('');
    const [crop, setCrop] = useState<Crop>()
    const [editProfile, {error, isLoading}] = useSubmitUserDataMutation()
    const [canvas, setCanvas] = useState<HTMLCanvasElement>()
    const [blob, setBlob] = useState<Blob>()

    const {control, handleSubmit} = useForm<EditProfileType>({resolver: zodResolver(editProfileSchema)});
    const getCanvas = (canvas: HTMLCanvasElement) => {
        setCanvas(canvas)
    }


    const onSubmit = handleSubmit((data) => {
        const date = format(data.birthdayDate,"yyyy-MM-dd")
        blob && editProfile({...data, file: blob,birthdayDate:date})
    });


    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={onSubmit}>
                <div className={styles.formContent}>
                    <div className={styles.imageUpload}>
                        <div className={styles.avatar}>
                            {image ?
                                // <Image src={image} alt={"Avatar"} height={192} width={192}/>
                                <Canvas crop={crop} step={'Publication'} filters={{}} imageSRC={image} defHeight={192}
                                        defWidth={192} getCanvas={getCanvas}/>
                                :
                                <Image src={github} alt={"Avatar"} height={192} width={192}/>
                            }
                        </div>
                        <EditAvatarModal image={image} setImage={setImage} onCrop={setCrop} canvas={canvas}
                                         setBlob={setBlob}/>
                    </div>
                    <div className={styles.profileInfo}>
                        <ControlledTextField name="userName" label='Username' control={control}/>
                        <ControlledTextField name="firstName" label='Firstname' control={control}/>
                        <ControlledTextField name="lastName" label='Lastname' control={control}/>
                        <NewDatePicker name="birthdayDate" label='Date of Birthday' control={control}/>
                        <ControlledTextField name="city" label='City' control={control}/>
                        <ControlledTextAreaField name="aboutMe" label="About me" control={control}/>
                    </div>
                </div>
                <div className={styles.line}></div>
                <Button className={styles.btn}>
                    Save changes
                </Button>
            </form>

        </div>
    );
}

FormPage.getLayout = getLayout
export default FormPage;
