import { ButtonStyled } from "components/ButtonStyled";
import { FaTh, FaList } from "react-icons/fa";
import styled from "styled-components";

const TabContainer = styled.div`
  margin: 15px 15px 0 0;
`;

const ButtonTab = styled(ButtonStyled)`
  border-radius: 0;
`;

export default function EmployeeTabs({ activeTabRender, setActiveTabRender }) {
  const iconsTab = [
    { title: "block", icon: <FaTh size="2em" /> },
    { title: "table", icon: <FaList size="2em" /> },
  ];

  const clickInTabHanler = (tabs) => {
    setActiveTabRender(tabs.toLocaleLowerCase());
  };
  return (
    <TabContainer>
      {iconsTab.map((tab) => {
        return (
          <ButtonTab
            key={tab.title}
            background={
              activeTabRender === tab.title.toLocaleLowerCase()
                ? "#9C9C9C"
                : "#D0D0D0"
            }
            onClick={() => clickInTabHanler(tab.title)}
          >
            {tab.icon}
          </ButtonTab>
        );
      })}
    </TabContainer>
  );
}
