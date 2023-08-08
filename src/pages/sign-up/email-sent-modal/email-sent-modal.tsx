import {Modal} from '@/shared/ui/modal/Modal'
import {Typography} from "@/shared/ui/typography";

type EmailSentModalType = {
    isOpen: boolean
    setOn: () => void
    title: string
    email: string
}
export const EmailSentModal = ({isOpen, setOn, title, email}: EmailSentModalType) => {
    if (!isOpen) return null

    return (
        <Modal title={title} open={isOpen} onChangeHandler={setOn}>
            <Typography variant={'regular16'}>
                We have sent a link to confirm your email to {email ? email : 'your email'}
            </Typography>
        </Modal>
    )
}