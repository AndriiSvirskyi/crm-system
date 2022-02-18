import { ButtonStyled } from "components/Styled/ButtonStyled";
import { TabComponent } from "components/Styled/TabComponent";
import { useState } from "react";


export default function Tabs() {
  const [activeTab, setActiveTab] = useState("first");
  const tabContent = {
    personal: 11,
    work: 22,
    "pdp time": <>Third</>,
    weekend: (
      <>
        <p>Four</p>
      </>
    ),
    additional: <>Five</>,
  };
  const clickInTabHanler = (tabs, event) => {
    setActiveTab(tabs.toLocaleLowerCase());
    console.log(tabs, event);
  };

  return (
    <TabComponent>
        {["Personal", "Work", "PDP time", "Weekend", "Additional"].map(
          (tab) => {
            return (
              <ButtonStyled
                background={
                  activeTab === tab.toLocaleLowerCase() ? "'#9C9C9C'" : '#D0D0D0'
                }
                key={tab}
                onClick={(e) => clickInTabHanler(tab, e.target)}
              >
                {tab}
              </ButtonStyled>
            );
          }
        )}
      {tabContent[activeTab]}
      </TabComponent>
  );
}
