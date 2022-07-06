import styled from "styled-components";

const Container = styled.div`
  width: 600px;
  background: #ffffff;

  @media all and (max-width: 850px) {
    width: 400px;
  }
`;

const Title = styled.h2`
  font-weight: normal;
  font-size: 25px;
  line-height: 30px;
  text-align: left;
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

export const Form = ({ submit, children, content }) => {
  return (
    <Container>
      <Title>{content}</Title>
      <InputsForm onSubmit={submit} action=''>
        {children}
      </InputsForm>
    </Container>
  );
};
