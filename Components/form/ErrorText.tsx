import styled from "styled-components";

const Error = styled.p`
  width: 100%;
  height: 19px;
  margin: 0 0 1px;
  padding: 4px 0 0 10px;
  font-size: 12px;
  border-radius: 3px;
  color: red;
  background: ${(props: { background: string }) => props.background};
`;

export const ErrorText = ({ background, children }) => {
  return <Error background={background}>{children}</Error>;
};