import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React, { ChangeEvent, useState } from 'react';
import { convertToPixelCrop, Crop } from 'react-image-crop';

import ImageCropper from '@/components/ImageCropper/ImageCropper';
import { Button } from '@/shared/ui/button';
import { ImageUploader } from '@/shared/ui/image-uploader/ImageUploader';
import { Modal } from '@/shared/ui/modal/Modal';
import { canvasToBlob } from '@/shared/utils/canvas/canvasToBlob';
import github from 'public/assets/gitHub.png';

type Props = {
    getBlob: (blob: Blob) => void;
    setCroppedImg: (img: string) => void;
};

const EditAvatarModal = ({ getBlob, setCroppedImg }: Props) => {
    const t = useTranslations();
    const [modalState, setModalState] = useState(false);
    const [croppedImage, setCroppedImage] = useState<HTMLImageElement | null>(null);
    const [croppedSrc, setCroppedSrc] = useState('');
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
                // const width = newImg.width;
                // const height = newImg.height;
                setCroppedImage(newImg);
                setCroppedSrc(imageURL);
            };
            // setImage(imageURL);
        }
    };

    const saveImageHandler = async () => {
        const results = await onCropComplete(tempCrop);
        if (results?.base64Image && results.blob) {
            getBlob(results.blob);
            setCroppedImg(results.base64Image);
            setModalState(false);
        }
    };
    const onCropComplete = async (percentCrop: Crop) => {
        if (croppedImage) {
            const pixelCrop = convertToPixelCrop(percentCrop, croppedImage.width, croppedImage.height);
            const canvas = document.createElement('canvas');
            const scaleX = croppedImage.naturalWidth / croppedImage.width;
            const scaleY = croppedImage.naturalHeight / croppedImage.height;
            canvas.width = pixelCrop.width;
            canvas.height = pixelCrop.height;
            const ctx = canvas.getContext('2d');

            if (ctx) {
                ctx.drawImage(
                    croppedImage,
                    pixelCrop.x * scaleX,
                    pixelCrop.y * scaleY,
                    pixelCrop.width * scaleX,
                    pixelCrop.height * scaleY,
                    0,
                    0,
                    pixelCrop.width,
                    pixelCrop.height
                );
            }

            const base64Image = canvas.toDataURL('image/jpeg');
            setCroppedSrc(base64Image);
            const blob = await canvasToBlob(canvas);
            return { base64Image, blob };
        }
        return null;
    };

    return (
        <Modal
            open={modalState}
            modalHandler={setModalState}
            modalTrigger={<Button variant={'outlined'}>{t('button.addAProfilePhoto')}</Button>}
            title={t('button.addAProfilePhoto')}
            customButtonsBlock={<></>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {croppedSrc ? (
                    <ImageCropper src={croppedSrc} isCircular onCrop={setTempCrop} destHeight={340} destWidth={340}>
                        <img src={croppedSrc} alt={'Avatar'} width={340} height={340} />
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
