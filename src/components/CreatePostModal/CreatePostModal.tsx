import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useCreatePostMutation } from '@/api/authApi';
import { ImageEditor } from '@/components/ImageEditor/ImageEditor';
import { useAppSelector } from '@/redux/store';
import { addImage, resetImageState } from '@/redux/store/imageSlice/imageSlice';
import { Button } from '@/shared/ui/button';
import { ImageUploader } from '@/shared/ui/image-uploader/ImageUploader';
import ConfirmCloseModal from '@/shared/ui/modal/ConfirmCloseModal';
import { Modal } from '@/shared/ui/modal/Modal';
import { ImagePlaceholder } from '@/shared/ui/placeholder/placeholder';
import { Typography } from '@/shared/ui/typography';
import { canvasCreator } from '@/shared/utils/canvas/canvasCreator';
import { canvasToBlob } from '@/shared/utils/canvas/canvasToBlob';
import { parseImageBlob } from '@/shared/utils/canvas/parseImageBlob';

import s from './CreatePostModal.module.scss';
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

    const { title, images, description } = useAppSelector(state => state.images);
    const currentImage = useAppSelector(state => state.images.currentImage);

    const [publishPost] = useCreatePostMutation();

    const nextBtnHandler = async () => {
        if (currentStep === 'Cropping') setCurrentStep('Filters');
        else if (currentStep === 'Filters') setCurrentStep('Publication');
        else if (currentStep === 'Publication') {
            const imagesBlob = [];
            for (const image of images) {
                /* const blob = await fetch(image.src).then(r => r.blob()); */
                const canvas = canvasCreator(image.src, image.filters);
                const blob = await canvasToBlob(canvas, image.type);

                imagesBlob.push({ blob, filename: image.name });
            }
            publishPost({ title, files: imagesBlob, description })
                .unwrap()
                .then(() => {
                    setEditModal(false);
                    props.modalHandler(false);
                    setCurrentStep('Cropping');
                    dispatch(resetImageState());
                    router.push('/home');
                });
        }
    };
    const prevBtnHandler = () => {
        if (currentStep === 'Filters') setCurrentStep('Cropping');
        else if (currentStep === 'Publication') setCurrentStep('Filters');
        else if (currentStep === 'Cropping') setConfirmCloseModal(true);
    };

    const nextButton = (
        <Button className={s.btn} variant={'outlined'} onClick={nextBtnHandler}>
            {currentStep === 'Publication' ? 'Publish' : 'Next'}
        </Button>
    );

    const previousButton = (
        <Button className={s.btn} variant={'outlined'} onClick={prevBtnHandler}>
            Prev
        </Button>
    );

    const discardHandler = () => {
        setConfirmCloseModal(false);
        setEditModal(false);
        props.modalHandler(false);
        setCurrentStep('Cropping');
        dispatch(resetImageState());
    };
    const saveDraftHandler = () => {
        setConfirmCloseModal(false);
        setEditModal(false);
        setCurrentStep('Cropping');
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
            title="Add photo"
            open={props.open}
            customButtonsBlock={
                <>
                    <ImageUploader label="Select from Computer" onImageChangeHandler={onImageChangeHandler} />
                    <Button
                        onClick={() => {
                            if (preview) setEditModal(true);
                            else setError('Upload image first');
                        }}>
                        Next
                    </Button>
                </>
            }
            modalHandler={props.modalHandler}>
            <div className={s.preview}>
                {!preview ? <ImagePlaceholder /> : <img width="250px" height="250px" src={preview} alt="" />}
                {error}
            </div>

            <Modal
                title={currentStep}
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
                            <Button onClick={discardHandler}> Discard </Button>
                            <Button onClick={saveDraftHandler}> Save draft </Button>
                        </>
                    }>
                    <Typography variant={'regular16'} as={'div'} style={{ maxWidth: '333px' }}>
                        Do you really want to close the creation of a publication?
                        <br />
                        If you close everything will be deleted
                    </Typography>
                </ConfirmCloseModal>
            </Modal>
        </Modal>
    );
};

export default CreatePostModal;
