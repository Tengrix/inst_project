import React, {ReactNode} from 'react'
import styled from 'styled-components'

type ModalDivProps = {
    block?: string; // Свойство block может быть строкой
}
type StyledModalProps = {
    handleClose: () => void;
    show: boolean;
    children: ReactNode;
}

const ModalDiv = styled.div<ModalDivProps>`
  display: ${(props) => (props.block ? props.block : 'block')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`


const ContentDiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 50%;
  height: auto;
  padding: 2rem;
  transform: translate(-50%, -50%);
  background: white;
`

const BasicModal: React.FC<StyledModalProps> = ({ handleClose, show, children }) => {
    return (
        <ModalDiv block={show ? 'block' : 'none'}>
            <ContentDiv>
                {children}
                <button onClick={handleClose}>OK</button>
            </ContentDiv>
        </ModalDiv>
    );
};

export default BasicModal;