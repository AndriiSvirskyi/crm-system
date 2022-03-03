import { AiFillCloseCircle } from "react-icons/ai";
import styled from "styled-components";

const Container = styled.div`
  width: 500px;
  padding: 0 40px 30px 40px;
  background: #ffffff;
  box-shadow: 0px 4px 41px rgba(0, 0, 0, 0.05);
  border-radius: 8px;

  @media all and (max-width: 850px) {
    width: 90%;
  }
`;

const Title = styled.h2`
  font-weight: normal;
  font-size: 25px;
  line-height: 30px;
  text-align: center;
  margin: 0 0 30px 0;
  @media all and (max-width: 470px) {
    margin: 0 0 15px 0;
  }
`;

const InputsForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const CloseContainer = styled.div`
  cursor: pointer;
  position: relative;
  left: 100%;
  top: 10px;
`;
export const Form = ({ closeModal, submit, children, content }) => {
  return (
    <Container>
      {/* <CloseContainer>
        <AiFillCloseCircle size="30" onClick={closeModal} />
      </CloseContainer> */}
      <Title>{content}</Title>
      <InputsForm onSubmit={submit} action="">
        {children}
      </InputsForm>
    </Container>
  );
};
