import styled from 'styled-components';

const StyledFlex = styled.div`
display:flex;
flex-direction: ${props => props.direction || 'row'};
flex-wrap: ${props => props.wrap || ''};
align-items: ${props => props.align || ''};
align-content:${props => props.content || ''} ;
justify-content:${props => props.justify || ''} ;
margin: ${({margin}) => margin || ''};
padding: ${({padding}) => padding || ''};
margin-right:${props => props.right || ''};
margin-left:${props => props.left || ''};
`


export const Flex = (props) => {
  return <StyledFlex {...props} />
}