import {ComponentPropsWithoutRef, ReactNode} from 'react'
import {Button} from "@/shared/ui/button";
import * as Dialog from '@radix-ui/react-dialog';
import s from 'src/shared/ui/modal/Modal.module.scss';
import Cross from "@/assets/icons/Cross";

type ModalPropsType = {
    open?: boolean
    onClose?: () => void
    modalTrigger?: ReactNode,
    title: string,
    children: ReactNode
    className?: string
} & ComponentPropsWithoutRef<'div'>

export const Modal = ({ onClose,open,children, title, modalTrigger}: ModalPropsType) => {
    function onCloseHandler() {
        onClose?.()
    }
    return (
        <Dialog.Root open={open} onOpenChange={onCloseHandler}>
            {modalTrigger&&(
            <Dialog.Trigger asChild>
                {modalTrigger}
            </Dialog.Trigger>
        )}
            {open && (
                <Dialog.Portal>
                    <Dialog.Overlay className={s.DialogOverlay}/>
                    <Dialog.Content className={s.DialogContent}>
                        <div className={s.modalHeader}>
                            <Dialog.Title className={s.DialogTitle}>{title}</Dialog.Title>
                            <Dialog.Close asChild>
                                <Button className={s.closeBtn}><Cross/></Button>
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
            )}

        </Dialog.Root>
    )
}
