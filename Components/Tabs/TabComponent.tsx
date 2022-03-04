import { ButtonStyled } from "components/ButtonStyled";
import { Flex } from "components/User/Flex";
import styled from "styled-components";

type TabProps = {
  arrayIcon: string[] | JSX.Element[];
  state: string;
  setstate: Function;
  content: {};
  padding?: string;
  background?: string;
};

const TabsStyled = styled.div`
  width: 100%;
  border-radius: 8px;
  font-size: 16px;
  user-select: none;
`;
const TabsContent = styled.div`
  width: 100%;
  color: ${(props) => props.color || props.theme.colors.text};
`;

export const TabComponent = ({arrayIcon, state, setstate, content}:TabProps) => {
  const clickInTabHanler = (tabs) => {
    setstate(tabs.toLocaleLowerCase());
  };
  return (
    <TabsStyled>
      <Flex>
        {arrayIcon.map((tab) => {
          return (
            <ButtonStyled
              width="20%"
              height="60px"
              margin="10px"
              background={
                state === tab.toLocaleLowerCase() ? "#9C9C9C" : "#D0D0D0"
              }
              key={tab}
              onClick={() => clickInTabHanler(tab)}
            >
              {tab}
            </ButtonStyled>
          );
        })}
      </Flex>
      <TabsContent>{content[state]}</TabsContent>
    </TabsStyled>
  );
};
