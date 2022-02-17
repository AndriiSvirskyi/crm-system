import styled from 'styled-components';

type Props = {
    visibility: string,
    color: string
}

const Container = styled.div<Props>`
    position: absolute;
    top: 10px;
    padding: 10px 15px;
    text-align: center;
    color: ${({color}) => color};
    background-color: #F5F5F5;
    border-radius: 3px;
    visibility: ${({visibility}) => visibility};
    transition: all .3s cubic-bezier(0.53, 0.77, 0.58, 0.26);
`;

export const Message = ({color, visibility, children}) => {
    return(<Container color={color} visibility={visibility}>{children}</Container>)
}