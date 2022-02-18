import styled from 'styled-components';

type FlexStyle = {
  direction:string;
  wrap: string;
  align: string;
  content: string;
  justify:string;
  margin:string;
  padding:string;
  rigth:string;
  width:string;
  right:string;
  left:string;
}
const StyledFlex = styled.div<FlexStyle>`
display:flex;
flex-direction: ${props => props.direction || 'row'};
flex-wrap: ${props => props.wrap || ''};
align-items: ${props => props.align || ''};
align-content:${props => props.content || ''} ;
justify-content:${props => props.justify || ''} ;
margin: ${({margin}) => margin || ''};
padding: ${({padding}) => padding || ''};
width:${({width}) => width || ''};
margin-right:${props => props.right || ''};
margin-left:${props => props.left || ''};
`


export const Flex = (props) => {
  return <StyledFlex {...props} />
}