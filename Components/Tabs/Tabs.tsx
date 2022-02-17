import { useState } from "react";
import Personal from "./Personal";
import { Work } from "./Work";
import styled from "styled-components";

export const TabsStyled = styled.div`
  .tabs-menu {
    display: flex;
    justify-content: space-around;
    padding: 1em;
  }
  .tabs-menu div {
    background: #d0d0d0;
    padding: 1em;
    border-radius: 8px;
    font-size: 16px;
    user-select: none;
    cursor: pointer;
  }
  .tabs-menu .current-tab {
    background: #9c9c9c;
  }
`;

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("first");

  const tabContent = {
    personal: <Personal />,
    work: <Work />,
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
    <TabsStyled>
      <div className="tabs-menu">
        {["Personal", "Work", "PDP time", "Weekend", "Additional"].map(
          (tab) => {
            return (
              <div
                className={
                  activeTab === tab.toLocaleLowerCase() ? "current-tab" : ""
                }
                key={tab}
                onClick={(e) => clickInTabHanler(tab, e.target)}
              >
                {tab}
              </div>
            );
          }
        )}
      </div>
      {tabContent[activeTab]}
    </TabsStyled>
  );
}
