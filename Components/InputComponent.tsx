import styled from "styled-components";

type Props = {
  value?: string;
  height: string;
  margin: string;
  width: string;
  list?: string;
  error?: string;
};
const StyledInput = styled.input<Props>`
  outline: none;
  height: ${({ height }) => height || ''};
  width: ${({ width }) => width || ''};
  background: #d0d0d0;
  border: ${({ error }) => (error ? "1px solid red" : "1px solid transparent")};
  border-radius: 8px;
  margin:${({ margin }) =>margin || ''};
  padding: 0 0 0 25px;

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
};

export const InputComponent = ({
  type = "",
  placeholder,
  height,
  width,
  list,
  error,
  margin,
  onChange,
  value,
}: InputProps) => {
  return (
    <StyledInput
      list={list}
      margin={margin}
      error={error}
      height={height}
      width={width}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      
    />
  );
};
