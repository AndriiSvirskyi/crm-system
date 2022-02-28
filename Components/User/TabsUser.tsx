import { ButtonStyled } from "components/ButtonStyled";
import { Flex } from "components/User/Flex";
import { TabComponent } from "components/Tabs/TabComponent";
import { useState } from "react";
import { Personal } from "./personalTab";
import PDPTime from "./pdpTimeTab.tsx/PDPTime";
import TimeOffTab from "./timeOffTab.tsx/TimeOffTab";

export default function Tabs({ user }) {
  const [activeTab, setActiveTab] = useState("first");
  const tabsButtons = ["Personal", "Work", "PDP time", "Time Off", "Additional"];
  const tabContent = {
    personal: <Personal user={user} />,
    work: <p>Second</p>,
    "pdp time": <PDPTime />,
    "time off": <TimeOffTab user={user} />,
    additional: <p>Five</p>,
  };

  return (
    <Flex justify="space-around" width="100%">
      <TabComponent
        array={tabsButtons}
        state={activeTab}
        setstate={setActiveTab}
        content={tabContent}
      ></TabComponent>
    </Flex>
  );
}