import styled from "styled-components";

type ButtonProps = {
  height?: string;
  width?: string;
  margin?: string;
  position?: string;
  right?: string;
  bottom?: string;
}
const ButtonComponent= styled.button<ButtonProps>`
  position: ${({position}) => position};
  right: ${({right}) =>  right};
  bottom: ${({bottom}) =>  bottom};
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
  children?: string | JSX.Element;
  height?: string;
  width?: string;
  margin?: string;
  onClick?: () => void;
  position?: string;
  right?: string;
  bottom?: string;
}

export const Button = ({ width, children, height, margin, onClick , position, right, bottom }: ComponentProps) => {
  return <ButtonComponent 
    onClick={onClick} 
    height={height} 
    width={width} 
    margin={margin}
    position={position}
    right={right}
    bottom={bottom}
      >
        {children}
      </ButtonComponent>;
};
