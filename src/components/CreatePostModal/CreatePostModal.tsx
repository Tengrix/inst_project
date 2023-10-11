import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useCreatePostMutation, useGetUserDataQuery } from '@/api/api';
import { ImageEditor } from '@/components/ImageEditor/ImageEditor';
import { useAppSelector } from '@/redux/store';
import { addImage, resetImageState } from '@/redux/store/imageSlice/imageSlice';
import { ImageType } from '@/redux/store/imageSlice/types/store';
import { Button } from '@/shared/ui/button';
import { ImageUploader } from '@/shared/ui/image-uploader/ImageUploader';
import ConfirmCloseModal from '@/shared/ui/modal/ConfirmCloseModal';
import { Modal } from '@/shared/ui/modal/Modal';
import { ImagePlaceholder } from '@/shared/ui/placeholder/placeholder';
import { Typography } from '@/shared/ui/typography';
import { canvasCreator } from '@/shared/utils/canvas/canvasCreator';
import { canvasToBlob } from '@/shared/utils/canvas/canvasToBlob';
import { parseImageBlob } from '@/shared/utils/canvas/parseImageBlob';
import { getUniqFileName } from '@/shared/utils/generateFileName/generateFileName';

import s from './CreatePostModal.module.scss';
import { PostDB } from './api/postDB';
export type StepType = 'Cropping' | 'Filters' | 'Publication';

type Props = {
    open: boolean;
    // eslint-disable-next-line no-unused-vars
    modalHandler: (isOpen: boolean) => void;
    // children: ReactNode
};

const CreatePostModal = (props: Props) => {
    const dispatch = useDispatch();
    const [preview, setPreview] = useState<string>('');
    const [editModal, setEditModal] = useState(false);
    const [error, setError] = useState('');
    const [confirmCloseModal, setConfirmCloseModal] = useState(false);
    const [currentStep, setCurrentStep] = useState<StepType>('Cropping');
    const router = useRouter();
    const t = useTranslations('');
    const postDB = new PostDB();

    const tModalTitles = {
        Publication: t('post.publication'),
        Cropping: t('post.cropping'),
        Filters: t('post.filters')
    };

    const { images, description } = useAppSelector(state => state.images);
    const currentImage = useAppSelector(state => state.images.currentImage);
    const { data: userData } = useGetUserDataQuery();

    useEffect(() => {
        if (images.length === 0 && userData?.id) {
            (async () => {
                for await (const img of postDB.getImages(userData.id)) {
                    const image: ImageType = img;
                    dispatch(addImage(image));
                }
            })();
        }
    }, [userData]);

    const [publishPost] = useCreatePostMutation();

    const nextBtnHandler = async () => {
        if (currentStep === 'Cropping') setCurrentStep('Filters');
        else if (currentStep === 'Filters') setCurrentStep('Publication');
        else if (currentStep === 'Publication') {
            const imagesBlob = [];
            for (const image of images) {
                const canvas = await canvasCreator(image.src, image.filters, image.crop, currentStep);
                const blob = await canvasToBlob(canvas, image.type);
                /* FIXME: temp solution must be realized on backend  */
                const uniqFileName = getUniqFileName(image.name);
                imagesBlob.push({ blob, filename: uniqFileName });
            }
            publishPost({ files: imagesBlob, description })
                .unwrap()
                .then(() => {
                    setEditModal(false);
                    props.modalHandler(false);
                    setCurrentStep('Cropping');
                    dispatch(resetImageState());
                    postDB.delete();
                    router.push('/home');
                });
        }
    };
    const prevBtnHandler = () => {
        if (currentStep === 'Filters') setCurrentStep('Cropping');
        else if (currentStep === 'Publication') setCurrentStep('Filters');
        else if (currentStep === 'Cropping') setConfirmCloseModal(true);
    };
    const tPublish = t('button.publish');
    const tNext = t('button.next');

    const nextButton = (
        <Button className={s.btn} variant={'outlined'} onClick={nextBtnHandler}>
            {currentStep === 'Publication' ? tPublish : tNext}
        </Button>
    );

    const previousButton = (
        <Button className={s.btn} variant={'outlined'} onClick={prevBtnHandler}>
            {t('button.prev')}
        </Button>
    );

    const discardHandler = () => {
        setConfirmCloseModal(false);
        setEditModal(false);
        props.modalHandler(false);
        setCurrentStep('Cropping');
        dispatch(resetImageState());
        postDB.resetImages(userData?.id as string);
    };

    const createIndexedDbDraft = async () => {
        //postDB.saveDescription('Lorem Ipsum', userData?.id as string);
        postDB.saveImages(images, userData?.id as string);
    };

    const saveDraftHandler = () => {
        setConfirmCloseModal(false);
        setEditModal(false);
        setCurrentStep('Cropping');
        createIndexedDbDraft();
    };
    const onPointerOutsideClickHandler = () => {
        setConfirmCloseModal(true);
    };
    const onImageChangeHandler = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            const blob = event.target.files[0];
            const image = parseImageBlob(blob);
            dispatch(addImage(image));
            setError('');
        }
    };

    useEffect(() => {
        setPreview(currentImage.src);
    }, [currentImage]);

    return (
        <Modal
            className={s.container}
            title={t('modal.addPhotoModalTitle')}
            open={props.open}
            customButtonsBlock={
                <>
                    <ImageUploader label={t('button.selectFromComputer')} onImageChangeHandler={onImageChangeHandler} />
                    <Button
                        onClick={() => {
                            if (preview) setEditModal(true);
                            else setError('Upload image first');
                        }}>
                        {t('button.next')}
                    </Button>
                </>
            }
            modalHandler={props.modalHandler}>
            <div className={s.preview}>
                {!preview ? <ImagePlaceholder /> : <img width="250px" height="250px" src={preview} alt="" />}
                {error}
            </div>

            <Modal
                title={tModalTitles[currentStep]}
                open={editModal}
                modalHandler={setEditModal}
                nextStepBtn={nextButton}
                customButtonsBlock={<></>}
                previousStepBtn={previousButton}
                isPostModal={true}
                onPointerOutsideClickHandler={onPointerOutsideClickHandler}>
                <ImageEditor step={currentStep} />
                <ConfirmCloseModal
                    open={confirmCloseModal}
                    modalHandler={setConfirmCloseModal}
                    customButtonsBlock={
                        <>
                            <Button onClick={discardHandler}> {t('button.discard')} </Button>
                            <Button onClick={saveDraftHandler}> {t('button.saveDraft')} </Button>
                        </>
                    }>
                    <Typography variant={'regular16'} as={'div'} style={{ maxWidth: '333px' }}>
                        {t('modal.closeModalText')}
                    </Typography>
                </ConfirmCloseModal>
            </Modal>
        </Modal>
    );
};

export default CreatePostModal;
