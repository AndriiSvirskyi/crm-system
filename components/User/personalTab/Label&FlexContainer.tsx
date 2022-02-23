import styled from "styled-components";

type FlexContainerProps = {
  padding?: string;
  justify?: string;
  width?: string;
  margin?: string;
};
export const FlexContainer = styled.div<FlexContainerProps>`
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  display: flex;
  justify-content: ${({ justify }) => justify};
  align-items: center;
  flex-wrap: nowrap;
`;
export const Label = styled.label`
  cursor: pointer;
  min-width: 130px;
  margin-right: 15px;
  padding: 10px 0;
  color: #6b7280;
  display: flex;
  flex-wrap: nowrap;
`;
