import {Button} from "@/shared/ui/button";
import {Typography} from "@/shared/ui/typography";
import {Modal} from "@/shared/ui/modal/Modal";
import React, {ReactNode, useState} from "react";

type Props = {
    open: boolean
    modalHandler: (isOpen: boolean) => void
    children: ReactNode
    customButtonsBlock: ReactNode
}
const ConfirmCloseModal = (props: Props) => {


    return (
        <Modal
            title={"Close"}
            open={props.open}
            modalHandler={props.modalHandler}
            customButtonsBlock={props.customButtonsBlock}
        >
            {props.children}
        </Modal>
    );
};

export default ConfirmCloseModal;