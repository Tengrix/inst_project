import * as Dialog from '@radix-ui/react-dialog';
import { PointerDownOutsideEvent } from '@radix-ui/react-dismissable-layer';
import clsx from 'clsx';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

import Cross from '@/assets/icons/Cross';
import { Button } from '@/shared/ui/button';
import s from 'src/shared/ui/modal/Modal.module.scss';

type ModalPropsType = {
    title?: string;
    children: ReactNode;
    previousStepBtn?: ReactNode;
    nextStepBtn?: ReactNode;
    open?: boolean;
    isPostModal?: boolean;
    // eslint-disable-next-line no-unused-vars
    modalHandler?: (isOpen: boolean) => void;
    modalTrigger?: ReactNode;
    className?: string;
    onPointerOutsideClickHandler?: () => void;
    customButtonsBlock?: ReactNode;
    onSubmit?: () => void;
    editPost?: boolean;
} & ComponentPropsWithoutRef<'div'>;

export const Modal = ({
    modalHandler,
    open,
    children,
    title,
    modalTrigger,
    nextStepBtn = false,
    previousStepBtn = false,
    isPostModal = false,
    onPointerOutsideClickHandler,
    customButtonsBlock = false,
    onSubmit,
    editPost
}: ModalPropsType) => {
    const modalContentClassName = clsx({
        [s.DialogDescription]: true,
        [s.DialogDescription_postModal]: isPostModal
    });

    const onPointerDownOutside = (e: PointerDownOutsideEvent) => {
        if (onPointerOutsideClickHandler) {
            e.preventDefault();
            onPointerOutsideClickHandler();
        }
    };
    const DialogTriger = Dialog.Trigger as any;
    const DialogPortal = Dialog.Portal as any;
    const DialogContent = Dialog.Content as any;
    const DialogTitle = Dialog.Title as any;
    const DialogClose = Dialog.Close as any;
    const DialogDescription = Dialog.Description as any;
    return (
        <Dialog.Root open={open} onOpenChange={modalHandler}>
            {modalTrigger && <DialogTriger asChild>{modalTrigger}</DialogTriger>}
            <DialogPortal>
                <div className={s.DialogOverlay} />
                <DialogContent
                    className={s.DialogContent}
                    onOpenAutoFocus={(e: any) => e.preventDefault()}
                    onPointerDownOutside={onPointerDownOutside}>
                    <div className={s.modalHeader}>
                        {previousStepBtn}
                        <DialogTitle className={s.DialogTitle}>{title}</DialogTitle>
                        {nextStepBtn ? (
                            nextStepBtn
                        ) : (
                            <DialogClose asChild>
                                <Button className={s.closeBtn}>
                                    <Cross />
                                </Button>
                            </DialogClose>
                        )}
                    </div>
                    <hr className={s.border} />
                    <DialogDescription className={modalContentClassName}>
                        {children}
                        {customButtonsBlock ? (
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    marginTop: 'auto',
                                    justifyContent: 'space-between'
                                }}>
                                {customButtonsBlock}
                            </div>
                        ) : (
                            <div style={{ display: 'flex', marginTop: 'auto', justifyContent: 'flex-end' }}>
                                {editPost ? (
                                    <Button onClick={onSubmit}>Save changes</Button>
                                ) : (
                                    <DialogClose asChild>
                                        <Button>OK</Button>
                                    </DialogClose>
                                )}
                            </div>
                        )}
                    </DialogDescription>
                </DialogContent>
            </DialogPortal>
        </Dialog.Root>
    );
};
