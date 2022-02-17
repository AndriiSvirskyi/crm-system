import styled from 'styled-components';

const ButtonComponent = styled.button`
    user-select: none;
    height: 50px;
    background: #D0D0D0;
    border: none;
    border-radius: 8px;
    margin: 0 0 35px 0;
    cursor: pointer;
    width: ${(props: {width: string}) => props.width};
    @media all and (max-width: 960px) {
        width: 90%;
    }
    @media all and (max-width: 470px) {
        height: 35px;
        margin: 0 0 10px 0;
    }
`

export const Button = ({width, children}) => {
    return(<ButtonComponent width={width}>{children}</ButtonComponent>)
}