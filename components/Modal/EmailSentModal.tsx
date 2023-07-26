import BasicModal from "components/Modal/BasicModal";

type Props = {
    handleClose: () => void;
    show: boolean;
}

const EmailSentModal = (props:Props) => {


    return (
        <BasicModal handleClose={() => props.handleClose()} show={props.show}>
            <div>
                Email sent X
                We have sent a link to confirm your email to epam@epam.com
            </div>
        </BasicModal>
    );
};

export default EmailSentModal;