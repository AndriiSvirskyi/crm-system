import styled from "styled-components";

type ButtonProps = {
  margin:string;
  align:string;
  background:string;
  color:string;
  width: string;
  height: string;
  }

const StyledButton = styled.button<ButtonProps>`
border:none;
cursor:pointer;
padding: 10px 15px;
margin: ${props => props.margin || ''};
font-size:18px;
border-radius: 8px;
align-self: ${props => props.align || 'stretch'};
color: ${props => props.color || props.theme.colors.text};
background: ${props => props.background || props.theme.colors.primary};
width:${props => props.width || ''};
height:${props => props.height || ''};
&:hover {
  background:#EEEEEE;
}

`;

export const ButtonStyled = (props) =>{
  return <StyledButton {...props}>{props.children}</StyledButton>
}
 
