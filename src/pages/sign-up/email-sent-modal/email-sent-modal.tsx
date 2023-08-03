import { Modal } from '@/shared/ui/modal/Modal'
import {Typography} from "@/shared/ui/typography";

type EmailSentModalType = {
    isOpen: boolean
    setOn: (value: boolean) => void
    title: string
}
export const EmailSentModal=({isOpen,setOn,title}:EmailSentModalType )=>{
    if (!isOpen) return null
    const handler=()=>{
        setOn(false)
        // router.push('/sign-in')
    }
    return (
        <Modal title={title} open={isOpen} onClose={handler}>
            <Typography variant={'body2'}>
                We have sent a link to confirm your email to //epam@epam.com//
            </Typography>
        </Modal>
    )
}