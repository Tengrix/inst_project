import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react';
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
    const [modalState, setModalState] = useState(false);
    const [tempImg, setTempImg] = useState(image);
    const [tempCrop, setTempCrop] = useState<Crop>();
    const onImageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const img = e.target.files && e.target.files[0];
        if (img) {
            const imageURL = URL.createObjectURL(img);
            setTempImg(imageURL);
        }
    };

    const saveImageHandler = async () => {
        if (canvas) {
            const blob = await canvasToBlob(canvas);
            console.log(blob);
            setBlob(blob);
            tempCrop && onCrop(tempCrop);
            setModalState(false);
            setImage(tempImg);
        }
    };

    return (
        <Modal
            open={modalState}
            modalHandler={setModalState}
            modalTrigger={<Button variant={'outlined'}>Add a Profile Photo</Button>}
            title={'Add a Profile Photo'}
            customButtonsBlock={<></>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {image ? (
                    <ImageCropper src={tempImg} isCircular onCrop={setTempCrop}>
                        <img src={tempImg} alt={'Avatar'} width={340} height={340} />
                    </ImageCropper>
                ) : (
                    <Image src={github} alt={'Avatar'} height={340} width={340} />
                )}
                <ImageUploader
                    label="Add a Profile Photo"
                    btnVariant={'outlined'}
                    onImageChangeHandler={onImageChangeHandler}
                />
                <Button fullWidth onClick={saveImageHandler}>
                    Save image
                </Button>
            </div>
        </Modal>
    );
};

export default EditAvatarModal;
