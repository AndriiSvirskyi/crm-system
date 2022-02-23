import { ButtonStyled } from "components/ButtonStyled";
import styled from "styled-components";

type Tab = {
  array: string[];
  background?: string;
  padding?: string;
  tabsButtons;
};

const TabsStyled = styled.div`
  border-radius: 8px;
  font-size: 16px;
  user-select: none;
  cursor: pointer;
`;
const TabsContent = styled.div`
  width: 100%;
  color: ${(props) => props.color || props.theme.colors.text};
  background: ${(props) => props.color || props.theme.colors.background};
`;

export const TabComponent = (props) => {
  const clickInTabHanler = (tabs) => {
    props.setstate(tabs.toLocaleLowerCase());
  };
  return (
    <TabsStyled>
      {props.array.map((tab) => {
        return (
          <ButtonStyled
            width="160px"
            height="60px"
            margin="10px"
            background={
              props.state === tab.toLocaleLowerCase() ? "#9C9C9C" : "#D0D0D0"
            }
            key={tab}
            onClick={() => clickInTabHanler(tab)}
          >
            {tab}
          </ButtonStyled>
        );
      })}
      <TabsContent>{props.content[props.state]}</TabsContent>
    </TabsStyled>
  );
};
