import styled from "styled-components";
const TextareaContainer = styled.textarea`
  resize: none;
  outline: none;
  width: calc(100% - 50px);
  height: 80px;
  border-radius: 8px;
  margin: 0 0 10px 0;
  padding: 10px 25px;
  border: 1px solid black;
`;
type TextareaProps = {
  value?: string;
  onChange?: any;
  placeholder?: string;
};

export const Textarea = ({ value, onChange, placeholder }: TextareaProps) => {
  return (
    <TextareaContainer
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
