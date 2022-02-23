import styled from "styled-components";

type ButtonProps = {
  height?: string;
  width?: string;
  margin?: string;
}
const ButtonComponent= styled.button<ButtonProps>`
  padding: 5px 10px;
  user-select: none;
  height: ${({height}) => height};
  background: #d0d0d0;
  border: none;
  border-radius: 8px;
  margin: ${({margin}) => margin} ;
  cursor: pointer;
  width: ${({width}) => width};
  @media all and (max-width: 470px) {
    height: 35px;
    margin: 0 0 10px 0;
  }
`;

type ComponentProps = {
  children?: string;
  height?: string;
  width?: string;
  margin?: string;
  onClick?: () => void;
}

export const Button = ({ width, children, height, margin, onClick }: ComponentProps) => {
  return <ButtonComponent 
    onClick={onClick} 
    height={height} 
    width={width} 
    margin={margin}
      >
        {children}
      </ButtonComponent>;
};
