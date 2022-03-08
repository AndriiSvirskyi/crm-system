import styled from "styled-components";

type StyledInputProps = {
  value?: string;
  height: string;
  width: string;
  list?: string;
  error?: string;
  outline?: string;
  background?: string;
};

type InputWrapProps = {
  width: string;
  margin: string;
};

const InputWrap = styled.div<InputWrapProps>`
  position: relative;
  width: ${({ width }) => width || "auto"};
  margin: ${({ margin }) => margin || "auto"};
`;

const Error = styled.div`
  position: absolute;
  top: calc(50% - 7px);
  right: 8px;
  color: #fe5959c9;
  font-size: 12px;
`;

const StyledInput = styled.input<StyledInputProps>`
  outline: ${({ outline }) => outline || "none"};
  height: ${({ height }) => height || "auto"};
  width: ${({ width }) => `calc(${width} - 25px)` || "auto"};
  background: ${({ background }) => background || "#d0d0d0"};
  border: ${({ error }) =>
    error ? "1px solid #fe5959c9" : "1px solid transparent"};
  border-radius: 8px;
  padding: 0 0 0 25px;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

type InputProps = {
  value?: string;
  error?: string;
  list?: string;
  height?: string;
  width?: string;
  type?: string;
  placeholder?: string;
  mediaMargin?: string;
  margin?: string;
  onChange?: any;
  outline?: string;
  readonly?: boolean;
  background?: string;
  id?: string;
};

export const Input = ({
  type = "",
  placeholder,
  height,
  width,
  list,
  error,
  margin,
  onChange,
  value,
  outline,
  readonly,
  background,
  id,
}: InputProps) => {
  return (
    <InputWrap width={width} margin={margin}>
      <StyledInput
        id={id}
        outline={outline}
        readOnly={readonly}
        background={background}
        list={list}
        width={width}
        error={error}
        height={height}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {error && <Error>{error}</Error>}
    </InputWrap>
  );
};
