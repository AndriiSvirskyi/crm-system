import styled from "styled-components";

export const TabsStyled = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 1em;
    background: #d0d0d0;
    padding: 1em;
    border-radius: 8px;
    font-size: 16px;
    user-select: none;
    cursor: pointer;
    background: #9c9c9c;

`;

export const TabComponent = ({children}) => {
    return (
        <TabsStyled>{children}</TabsStyled>
    )
}