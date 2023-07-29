import {ComponentPropsWithoutRef, ReactNode} from 'react'
import {Button} from "@/shared/ui/button";
import * as Dialog from '@radix-ui/react-dialog';
import s from './modal.module.scss';
import SvgComponent from "@/shared/ui/modal/cross";

type ModalPropsType = {
    modalTrigger: ReactNode,
    title: string,
    children: ReactNode
    className?: string
} & ComponentPropsWithoutRef<'div'>

export const Modal = ({children, className, title, modalTrigger}: ModalPropsType) => {
    // const classNames = {
    //     root: clsx(s.card, className),
    // }

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                {modalTrigger}
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className={s.DialogOverlay}/>
                <Dialog.Content className={s.DialogContent}>
                    <div className={s.modalHeader}>
                        <Dialog.Title className={s.DialogTitle}>{title}</Dialog.Title>
                        <Dialog.Close asChild>
                            <Button className={s.closeBtn}><SvgComponent/></Button>
                        </Dialog.Close>
                    </div>
                    <hr className={s.border}/>
                    <Dialog.Description className={s.DialogDescription}>
                        {children}
                        <div style={{display: 'flex', marginTop: "auto", justifyContent: 'flex-end'}}>
                            <Dialog.Close asChild>
                                <Button className={s.okBtn}>OK</Button>
                            </Dialog.Close>
                        </div>
                    </Dialog.Description>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
