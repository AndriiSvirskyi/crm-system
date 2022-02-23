import styled from "styled-components";

type Props = {
  height: string;
  width?: string;
  error?: string;
  marginBottom: string;
  marginFirstChild: string;
  background?: string;
  margin?: string;
  outline?: string;
  readonly?: boolean;
};

const StyledInput = styled.input<Props>`
  outline: ${({ outline }) => outline};
  height: ${({ height }) => height};
  background: ${({ background }) => background || "#d0d0d0"};
  border: ${({ error }) => (error ? "1px solid red" : "1px solid transparent")};
  border-radius: 8px;
  width: ${({ width }) => width || "95%"};
  margin-bottom: ${({ marginBottom }) => marginBottom};
  padding: 0 0 0 25px;
  margin: ${({ margin }) => margin};

  ::placeholder {
    color: #000000;
  }

  :nth-child(1) {
    margin: ${({ marginFirstChild }) => marginFirstChild};
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

type InputProps = {
  value: string;
  setValue?: (value: string) => void;
  type?: string;
  placeholder?: string;
  height?: string;
  list?: string;
  error?: string;
  marginFirstChild?: string;
  marginBottom?: string;
  id?: string;
  background?: string;
  width?: string;
  margin?: string;
  defaultValue?: string;
  outline?: string;
  readonly?: boolean;
};

export const Input = ({
  value,
  setValue,
  type,
  placeholder,
  height,
  list,
  error,
  marginFirstChild,
  marginBottom,
  background,
  width,
  margin,
  id,
  defaultValue,
  readonly,
  outline,
}: InputProps) => {
  return (
    <StyledInput
      value={value}
      onChange={setValue}
      type={type}
      placeholder={placeholder}
      height={height}
      list={list}
      error={error}
      marginFirstChild={marginFirstChild}
      marginBottom={marginBottom}
      background={background}
      width={width}
      margin={margin}
      id={id}
      defaultValue={defaultValue}
      outline={outline}
      readOnly={readonly}
      required
    />
  );
};
