import { Modal } from '@/shared/ui/modal/Modal';
import { Typography } from '@/shared/ui/typography';

type EmailSentModalType = {
    isOpen: boolean;
    // eslint-disable-next-line no-unused-vars
    modalHandler: (isOpen: boolean) => void;
    title: string;
    email: string;
};
const EmailSentModal = ({ isOpen, modalHandler, title, email }: EmailSentModalType) => {
    return (
        <Modal title={title} open={isOpen} modalHandler={modalHandler}>
            <Typography variant={'regular16'}>
                We have sent a link to confirm your email to {email ? email : 'your email'}
            </Typography>
        </Modal>
    );
};
export default EmailSentModal;
