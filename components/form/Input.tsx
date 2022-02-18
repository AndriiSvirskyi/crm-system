import styled from "styled-components";

type Props = {
  height: string;
  margin: string;
  mediaMargin: string;
  marginBottom: string;
  list?: string;
  error?: string;
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
  error?: string;
  list?: string;
  height: string;
  value: string;
  setValue: (value: string) => void;
  type?: string;
  placeholder: string;
  mediaMargin?: string;
  margin?: string;
  marginBottom?: string
};

export const Input = ({
  value,
  setValue,
  type = "",
  placeholder,
  height,
  list,
  error,
  mediaMargin,
  margin,
  marginBottom,
}: InputProps) => {
  return (
    <StyledInput
      marginBottom={marginBottom}
      list={list}
      mediaMargin={mediaMargin}
      margin={margin}
      error={error}
      height={height}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e: { target: { value: string } }) => setValue(e.target.value)}
      required
    />
  );
};
