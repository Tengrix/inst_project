import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React, { ChangeEvent, useState } from 'react';
import { Crop } from 'react-image-crop';

import ImageCropper from '@/components/ImageCropper/ImageCropper';
import { Button } from '@/shared/ui/button';
import { ImageUploader } from '@/shared/ui/image-uploader/ImageUploader';
import { Modal } from '@/shared/ui/modal/Modal';
import { canvasToBlob } from '@/shared/utils/canvas/canvasToBlob';
import github from 'public/assets/gitHub.png';

type Props = {
    image: string;
    setImage: (src: string) => void;
    onCrop: (crop: Crop) => void;
    canvas: HTMLCanvasElement | undefined;
    setBlob: (blob: Blob) => void;
    blob?: Blob;
};

const EditAvatarModal = ({ image, setImage, onCrop, canvas, setBlob, blob }: Props) => {
    const t = useTranslations();
    const [modalState, setModalState] = useState(false);
    const [tempCrop, setTempCrop] = useState<Crop>();
    const onImageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const img = e.target.files && e.target.files[0];
        if (img) {
            const imageURL = URL.createObjectURL(img);
            setImage(imageURL);
        }
    };

    const saveImageHandler = async () => {
        if (canvas) {
            tempCrop && onCrop(tempCrop);
            const newBlob = blob || (await canvasToBlob(canvas));
            setBlob(newBlob);
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
                {image ? (
                    <ImageCropper src={image} isCircular onCrop={setTempCrop}>
                        <img src={image} alt={'Avatar'} width={340} height={340} />
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
