import {Modal} from '@/shared/ui/modal/Modal'
import {Typography} from "@/shared/ui/typography";

type EmailSentModalType = {
    isOpen: boolean
    setOn: (value: boolean) => void
    title: string
    email: string
}
export const EmailSentModal = ({isOpen, setOn, title, email}: EmailSentModalType) => {
    if (!isOpen) return null
    const handler = () => {
        setOn(false)
        // router.push('/sign-in')
    }
    return (
        <Modal title={title} open={isOpen} onClose={handler}>
            <Typography variant={'body2'}>
                We have sent a link to confirm your email to {email ? email : 'your email'}
            </Typography>
        </Modal>
    )
}