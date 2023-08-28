import Image from 'next/image';
import React, { ChangeEvent, useRef } from 'react';
import { Crop } from 'react-image-crop';

import ImageCropper from '@/components/ImageCropper/ImageCropper';
import { Button } from '@/shared/ui/button';
import { ImageUploader } from '@/shared/ui/image-uploader/ImageUploader';
import { Modal } from '@/shared/ui/modal/Modal';
import { canvasToBlob } from '@/shared/utils/canvasToBlob';
import github from 'public/assets/gitHub.png';

type Props = {
    image: string;
    setImage: (src: string) => void;
    onCrop: (crop: Crop) => void;
    canvas: HTMLCanvasElement | undefined;
    // eslint-disable-next-line no-unused-vars
    setBlob: (blob: Blob) => void;
};

const EditAvatarModal = ({ image, setImage, onCrop, canvas, setBlob }: Props) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const onImageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const img = e.target.files && e.target.files[0];
        if (img) {
            const imageURL = URL.createObjectURL(img);
            setImage(imageURL);
        }
    };

    const saveImageHandler = async () => {
        if (canvas) {
            const blob = await canvasToBlob(canvas);
            setBlob(blob);
        }
    };

    return (
        <Modal
            modalTrigger={<Button variant={'outlined'}>Add a Profile Photo</Button>}
            title={'Add a Profile Photo'}
            customButtonsBlock={<></>}>
            {image ? (
                <ImageCropper src={image} isCircular onCrop={onCrop}>
                    <img src={image} alt={'Avatar'} ref={imgRef} height={340} width={340} />
                </ImageCropper>
            ) : (
                <Image src={github} alt={'Avatar'} height={340} width={340} />
            )}
            <ImageUploader
                label="Add a Profile Photo"
                btnVariant={'outlined'}
                onImageChangeHandler={onImageChangeHandler}
            />
            <Button onClick={saveImageHandler}>Save image</Button>
        </Modal>
    );
};

export default EditAvatarModal;
