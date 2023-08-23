import {Modal} from "@/shared/ui/modal/Modal";
import React, {ReactNode, useEffect, useState} from "react";
import {Button} from "@/shared/ui/button";
import s from './CreatePostModal.module.scss'
import {Typography} from "@/shared/ui/typography";
import ConfirmCloseModal from "@/shared/ui/modal/ConfirmCloseModal";
import {ImageUploader} from "@/shared/ui/file-uploader/file-uploader";
import { addImage, setCurrentImage} from "@/redux/store/imageSlice/imageSlice";
import {useDispatch} from "react-redux";
import {ImagePlaceholder} from "@/shared/ui/placeholder/placeholder";
import {ImageEditor} from "@/components/ImageEditor/ImageEditor";
import {useSubmitUserDataMutation} from "@/api/authApi";
import {useAppSelector} from "@/redux/store";
import {parseImageBlob} from "@/shared/utils/parseImageBlob";

export type StepType = 'Cropping' | 'Filters' | 'Publication'

type Props = {
    open: boolean
    modalHandler: (isOpen: boolean) => void
    // children: ReactNode
}

const CreatePostModal = (props: Props) => {

    const dispatch = useDispatch();
    const [preview, setPreview] = useState<string>(''); // Фото-превью
    const [editModal, setEditModal] = useState(false)
    const [error, setError] = useState('')
    const [confirmCloseModal, setConfirmCloseModal] = useState(false)
    const [currentStep, setCurrentStep] = useState<StepType>('Cropping')

    const {title,images,description} = useAppSelector(state => state.images)
    const currentImage = useAppSelector((state) => state.images.currentImage);

    const [publishPost] = useSubmitUserDataMutation()

    const nextBtnHandler = () => {
        if (currentStep === 'Cropping') setCurrentStep('Filters')
        else if (currentStep === 'Filters') setCurrentStep('Publication')
        else if (currentStep === 'Publication') {
            console.log('publish')
            publishPost({title,files:images as any,description})
            // setEditModal(false)
            // props.modalHandler(false)
            // setCurrentStep('Cropping')
        }
    }
    const prevBtnHandler = () => {
        if (currentStep === 'Filters') setCurrentStep('Cropping')
        else if (currentStep === 'Publication') setCurrentStep('Filters')
        else if (currentStep === 'Cropping') setConfirmCloseModal(true)
    }


    const nextButton = <Button className={s.btn} variant={"outlined"} onClick={nextBtnHandler}>
        {currentStep === 'Publication' ? 'Publish' : 'Next'}
    </Button>

    const previousButton = <Button className={s.btn} variant={"outlined"} onClick={prevBtnHandler}>
        Prev
    </Button>


    const discardHandler = () => {
        setConfirmCloseModal(false)
        setEditModal(false)
        props.modalHandler(false)
        setCurrentStep('Cropping')
    }
    const saveDraftHandler = () => {
        setConfirmCloseModal(false)
        setEditModal(false)
        setCurrentStep('Cropping')
    }
    const onPointerOutsideClickHandler = () => {
        setConfirmCloseModal(true)
    }
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
    }, [currentImage])

    return (
        <Modal
            className={s.container}
            title='Add photo'
            open={props.open}
            customButtonsBlock={
                <>
                    <ImageUploader
                        label="Select from Computer"
                        onImageChangeHandler={onImageChangeHandler}/>
                    <Button onClick={() => {
                        if (preview) setEditModal(true)
                        else setError('Upload image first')
                    }}>Next</Button>
                </>}
            modalHandler={props.modalHandler}
        >
            <div className={s.preview}>
                {!preview ?
                    <ImagePlaceholder/>
                    :
                    <img width='250px' height='250px' src={preview} alt=""/>}
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
                onPointerOutsideClickHandler={onPointerOutsideClickHandler}

            >
                <ImageEditor step={currentStep}/>
                <ConfirmCloseModal
                    open={confirmCloseModal}
                    modalHandler={setConfirmCloseModal}
                    customButtonsBlock={
                        <>
                            <Button onClick={discardHandler}> Discard </Button>
                            <Button onClick={saveDraftHandler}> Save draft </Button>
                        </>}
                >
                    <Typography variant={"regular16"} as={'div'} style={{maxWidth: '333px'}}>
                        Do you really want to close the creation of a publication?
                        <br/>
                        If you close everything will be deleted
                    </Typography>
                </ConfirmCloseModal>
            </Modal>
        </Modal>
    );
};

export default CreatePostModal;
