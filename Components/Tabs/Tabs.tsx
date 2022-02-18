import { ButtonStyled } from "components/Styled/ButtonStyled";
import { Flex } from "components/Styled/Flex";
import { TabComponent } from "components/Tabs/TabComponent";
import { useState } from "react";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("first");
  const tabContent = {
    personal:  <>
    <p>First</p>
  </>,
    work:  <>
    <p>Second</p>
  </>,
    "pdp time": (
      <>
        <p>Third</p>
      </>
    ),
    weekend: (
      <>
        <p>Four</p>
      </>
    ),
    additional: (
      <>
        <p>Five</p>
      </>
    ),
  };
  const clickInTabHanler = (tabs, event) => {
    setActiveTab(tabs.toLocaleLowerCase());
  };

  return (
    <Flex justify='space-around'>
    <TabComponent>
      {["Personal", "Work", "PDP time", "Weekend", "Additional"].map((tab) => {
        return (
          <ButtonStyled
            margin="10px"
            background={
              activeTab === tab.toLocaleLowerCase() ? "#9C9C9C" : "#D0D0D0"
            }
            key={tab}
            onClick={(e) => clickInTabHanler(tab, e.target)}
          >
            {tab}
          </ButtonStyled>
        );
      })}
      {tabContent[activeTab]}
    </TabComponent>
    </Flex>
  );
}
