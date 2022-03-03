import { ButtonStyled } from "components/ButtonStyled";
import { Flex } from "components/User/Flex";
import { FaTh, FaList } from "react-icons/fa";
import styled from "styled-components";

const TabContainer = styled.div``;
export default function EmployeeTabs({activeTabRender, setActiveTabRender}) {
  const iconsTab = [
    { title: "block", icon: <FaTh size="2em" /> },
    { title: "table", icon: <FaList size="2em" /> },
  ];
  const contentTab = {
    list: 1,
    block: 2
  }
  const clickInTabHanler = (tabs) => {
    setActiveTabRender(tabs.toLocaleLowerCase());
  };
  return (
    <TabContainer>
      <Flex>
        {iconsTab.map((tab) => {
          return (
            <ButtonStyled
              width="20%"
              height="60px"
              margin="10px"
              background={
                activeTabRender === tab.title.toLocaleLowerCase() ? "#9C9C9C" : "#D0D0D0"
              }
              key={tab.title}
              onClick={() => clickInTabHanler(tab.title)}
            >
              {tab.icon}
            </ButtonStyled>
          );
        })}
      </Flex>
    </TabContainer>
  );
}
