import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import logo from "/public/logo.png";

const Container = styled.div`
  width: 400px;
  padding: 30px 57px 0 57px;
  background: #ffffff;
  box-shadow: 0px 4px 41px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  margin-top: 10px;

  @media all and (max-width: 850px) {
    width: 90%;
  }
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 0 60px 0;
`;

const Title = styled.h2`
  font-weight: normal;
  font-size: 25px;
  line-height: 30px;
  text-align: center;
  margin: 0 0 65px 0;

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
      <Logo>
        <Link href="/">
          <a>
            <Image src={logo} alt="Logo" />
          </a>
        </Link>
      </Logo>
      <Title>{content}</Title>
      <InputsForm onSubmit={submit} action="">
        {children}
      </InputsForm>
    </Container>
  );
};
