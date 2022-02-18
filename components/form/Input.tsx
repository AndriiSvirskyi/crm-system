import styled from "styled-components";

type Props = {
  height: string;
  error?: string;
  marginBottom: string;
  margin: string;
};

const StyledInput = styled.input<Props>`
  outline: none;
  height: ${({ height }) => height};
  background: #d0d0d0;
  border: ${({ error }) => (error ? "1px solid red" : "1px solid transparent")};
  border-radius: 8px;
  width: 95%;
  margin-bottom: ${({marginBottom}) => marginBottom};
  padding: 0 0 0 25px;

  ::placeholder {
    color: #000000;
  }

  :nth-child(1) {
    margin: ${({ margin }) => margin};
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  @media all and (max-width: 470px) {
    width: 80%;
    margin: 0 0 10px 0;
    height: 35px;
  }
`;

type InputProps = {
  value: string;
  setValue: (value: string) => void;
  type?: string;
  placeholder: string;
  height: string;
  list?: string;
  error?: string;
  margin?: string;
  marginBottom?: string;
};

export const Input = ({
  value,
  setValue,
  type = "",
  placeholder,
  height,
  list,
  error,
  margin,
  marginBottom,
}: InputProps) => {
  return (
    <StyledInput
      value={value}
      onChange={(e: { target: { value: string } }) => setValue(e.target.value)}
      type={type}
      placeholder={placeholder}
      height={height}
      list={list}
      error={error}
      margin={margin}
      marginBottom={marginBottom}
      required
    />
  );
};
