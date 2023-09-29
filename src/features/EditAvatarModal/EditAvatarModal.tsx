import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React, { ChangeEvent, useState } from 'react';
import { Crop } from 'react-image-crop';

import ImageCropper from '@/features/ImageCropper/ImageCropper';
import { Button } from '@/shared/ui/button';
import { ImageUploader } from '@/shared/ui/image-uploader/ImageUploader';
import { Modal } from '@/shared/ui/modal/Modal';
import { imageToBlob } from '@/shared/utils/canvas/imageToBlob';
import github from 'public/assets/gitHub.png';

type Props = {
    getBlob: (blob: Blob) => void;
    getCroppedImg: (img: string) => void;
};

const EditAvatarModal = ({ getBlob, getCroppedImg }: Props) => {
    const t = useTranslations();
    const [modalState, setModalState] = useState(false);
    const [previewImage, setPreviewImage] = useState<HTMLImageElement | null>(null);
    const [previewSrc, setPreviewSrc] = useState('');
    const [tempCrop, setTempCrop] = useState<Crop>({
        unit: '%',
        x: 0,
        y: 0,
        width: 100,
        height: 100
    });
    const onImageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const img = e.target.files && e.target.files[0];
        if (img) {
            const imageURL = URL.createObjectURL(img);
            let newImg = new window.Image();
            newImg.src = imageURL;
            newImg.onload = () => {
                setPreviewImage(newImg);
                setPreviewSrc(imageURL);
            };
        }
    };

    const saveImageHandler = async () => {
        if (previewImage) {
            const { blob, base64Image } = await imageToBlob(tempCrop, previewImage);
            getBlob(blob);
            getCroppedImg(base64Image);
            setModalState(false);
        }
    };

    return (
        <Modal
            open={modalState}
            modalHandler={setModalState}
            modalTrigger={<Button variant={'outlined'}>{t('button.addAProfilePhoto')}</Button>}
            title={t('button.addAProfilePhoto')}
            customButtonsBlock={<></>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {previewSrc ? (
                    <ImageCropper src={previewSrc} isCircular onCrop={setTempCrop} destHeight={340} destWidth={340}>
                        <img src={previewSrc} alt={'Avatar'} width={340} height={340} />
                    </ImageCropper>
                ) : (
                    <Image src={github} alt={'Avatar'} height={340} width={340} />
                )}
                <ImageUploader
                    label={t('button.addAProfilePhoto')}
                    btnVariant={'outlined'}
                    onImageChangeHandler={onImageChangeHandler}
                />
                <Button fullWidth onClick={saveImageHandler}>
                    {t('button.save')}
                </Button>
            </div>
        </Modal>
    );
};

export default EditAvatarModal;
