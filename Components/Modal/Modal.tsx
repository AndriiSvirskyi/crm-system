import styled from "styled-components";

type ModalProps = {
top: string;
right: string;
left: string;
bottom: string;
visibility:string;
}

const ModalContainer = styled.div<ModalProps>`
  position: fixed;
  width: 25%;
  min-height: 50%;
  top: ${props => props.top || ''};
  right: ${({right}) => right || ''};
  left:${({left}) => left || ''};
  bottom:${({bottom}) => bottom || ''};
  padding: 10px;
  text-align: center;
  font-weight: 500;
  color: #666666;
  border: 2px solid #d0d0d0;
  background-color: #ffffff;
  box-shadow: 0px 4px 41px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  visibility: ${({visibility}) => visibility};
 
`;

export default function Modal(props) {
  return <ModalContainer {...props} visibility={props.visibility}>{props.children}</ModalContainer>;
}
