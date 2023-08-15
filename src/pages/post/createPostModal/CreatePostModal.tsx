import {Modal} from "@/shared/ui/modal/Modal";
import React, {ReactNode, useState} from "react";
import {Button} from "@/shared/ui/button";
import s from '@/pages/post/createPostModal/CreatePostModal.module.scss'
import {Typography} from "@/shared/ui/typography";
import ConfirmCloseModal from "@/shared/ui/modal/ConfirmCloseModal";

type StepType = 'Cropping' | 'Filters' | 'Publication'

type Props = {
    open: boolean
    modalHandler: (isOpen: boolean) => void
    children: ReactNode
}

const CreatePostModal = (props: Props) => {

    const [editModal, setEditModal] = useState(false)

    const [confirmCloseModal, setConfirmCloseModal] = useState(false)

    const [currentStep, setCurrentStep] = useState<StepType>('Cropping')

    const nextBtnHandler = () => {
        if (currentStep === 'Cropping') setCurrentStep('Filters')
        else if (currentStep === 'Filters') setCurrentStep('Publication')
        else if (currentStep === 'Publication') {
            //publish request
            setEditModal(false)
            props.modalHandler(false)
            setCurrentStep('Cropping')
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


    return (
        <Modal
            title='Add photo'
            open={props.open}
            modalHandler={props.modalHandler}
            modalTrigger={<Button>Create Post</Button>}
        >
            <Modal
                title={currentStep}
                open={editModal}
                modalHandler={setEditModal}
                // isOkBtn={false}
                customButtonsBlock={<></>}
                modalTrigger={
                    <Button>
                        Select from computer
                    </Button>}
                nextStepBtn={nextButton}
                previousStepBtn={previousButton}
                isPostModal={true}
                onPointerOutsideClickHandler={onPointerOutsideClickHandler}

            >
                {props.children}
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