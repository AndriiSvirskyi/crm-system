import styled from "styled-components";

const ModalContainer = styled.div`
  position: absolute;
  width: 25%;
  min-height: 50%;
  top: 5em;
  right: 2em;
  left: ;
  padding: 10px;
  text-align: center;
  font-weight: 500;
  color: #666666;
  border: 2px solid #d0d0d0;
  background-color: #ffffff;
  box-shadow: 0px 4px 41px rgba(0, 0, 0, 0.05);
  border-radius: 8px;

  visibility: ${(props: { visibility: string }) => props.visibility};
  //  --webkit-animation: fadeIn 1s;
  //  animation: fadeIn 1s;
`;

export default function Modal({ visibility, children }) {
  return <ModalContainer visibility={visibility}>{children}</ModalContainer>;
}
