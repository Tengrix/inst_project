import * as Dialog from '@radix-ui/react-dialog';
import { PointerDownOutsideEvent } from '@radix-ui/react-dismissable-layer';
import clsx from 'clsx';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

import Cross from '@/assets/icons/Cross';
import { Button } from '@/shared/ui/button';
import s from 'src/shared/ui/modal/Modal.module.scss';

type ModalPropsType = {
    title: string;
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
    customButtonsBlock = false
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

    return (
        <Dialog.Root open={open} onOpenChange={modalHandler}>
            {modalTrigger && <Dialog.Trigger asChild>{modalTrigger}</Dialog.Trigger>}
            <Dialog.Portal>
                <div className={s.DialogOverlay} />
                <Dialog.Content
                    className={s.DialogContent}
                    onOpenAutoFocus={e => e.preventDefault()}
                    onPointerDownOutside={onPointerDownOutside}>
                    <div className={s.modalHeader}>
                        {previousStepBtn}
                        <Dialog.Title className={s.DialogTitle}>{title}</Dialog.Title>
                        {nextStepBtn ? (
                            nextStepBtn
                        ) : (
                            <Dialog.Close asChild>
                                <Button className={s.closeBtn}>
                                    <Cross />
                                </Button>
                            </Dialog.Close>
                        )}
                    </div>
                    <hr className={s.border} />
                    <Dialog.Description className={modalContentClassName}>
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
                                <Dialog.Close asChild>
                                    <Button>OK</Button>
                                </Dialog.Close>
                            </div>
                        )}
                    </Dialog.Description>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
