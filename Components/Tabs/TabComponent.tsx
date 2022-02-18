import styled from "styled-components";

 const TabsStyled = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 1em;
    background: ${props => props.color || props.theme.colors.primary}
    padding: 1em;
    border-radius: 8px;
    font-size: 16px;
    user-select: none;
    cursor: pointer;
`;
const TabsContent = styled.div`
width:100%;
color:${props => props.color || props.theme.colors.text};
background:${props => props.color || props.theme.colors.background};

`
export const TabComponent = (props) => {
    return (
        <TabsStyled><TabsContent>{props.children}</TabsContent></TabsStyled>
    )
}