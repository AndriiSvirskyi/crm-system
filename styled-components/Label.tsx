import styled from "styled-components";

export const Label = styled.label<{ required: boolean }>`
  margin-right: 15px;
  padding: 10px 0;
  color: #6b7280;
  display: flex;
  flex-wrap: nowrap;
  &:after {
    content: ${({ required }) => (required ? "' *'" : "' '")};
    color: red;
    padding-left: 4px;
  }
`;

export const DateLabel = styled.label`
  svg {
    position: absolute;
    border-left: solid 1px #d0d0d0;
    left: 220px;
    padding-left: 6px;
    height: 30px;
    bottom: 0;
    cursor: pointer;
  }
`;
