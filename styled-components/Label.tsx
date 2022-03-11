import styled from "styled-components";

export const Label = styled.label`
  cursor: pointer;
  min-width: ${(props: { width: string }) => props.width};
  margin-right: 15px;
  padding: 10px 0;
  color: #6b7280;
  display: flex;
  flex-wrap: nowrap;
`;
