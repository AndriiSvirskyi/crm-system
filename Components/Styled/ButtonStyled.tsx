import styled from "styled-components";

const StyledButton = styled.button`
border:none;
cursor:pointer;
padding: 10px 15px;
margin: ${props => props.margin || ''};
font-size:18px;
border-radius: 8px;
align-self: ${props => props.align || 'stretch'};
color: ${props => props.color || props.theme.colors.text};
background: ${props => props.background || props.theme.colors.primary};
`;

export const ButtonStyled = (props) =>{
  return <StyledButton {...props}></StyledButton>
}
 
