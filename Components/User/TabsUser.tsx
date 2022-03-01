import { ButtonStyled } from "components/ButtonStyled";
import { Flex } from "components/User/Flex";
import { TabComponent } from "components/tabs/TabComponent";
import { useState } from "react";
import { Personal } from "./personalTab";
import PDPTime from "./pdpTimeTab.tsx/PDPTime";
import TimeOffTab from "./timeOffTab.tsx/TimeOffTab";
import JobTab from "./jobTab/JobTab";

export default function Tabs({ user }) {
  const [activeTab, setActiveTab] = useState("first");
  const tabsButtons = ["Personal", "Job", "PDP time", "Time Off", "Additional"];
  const tabContent = {
    personal: <Personal user={user} />,
    job: <JobTab user={user} />,
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