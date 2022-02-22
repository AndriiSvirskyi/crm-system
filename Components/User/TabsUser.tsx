import { ButtonStyled } from "components/ButtonStyled";
import { Flex } from "components/User/Flex";
import { TabComponent } from "components/Tabs/TabComponent";
import { useState } from "react";
import { Personal } from "./Personal";

export default function Tabs({ user, users }) {
  const [activeTab, setActiveTab] = useState("first");
  const tabsButtons = ["Personal", "Work", "PDP time", "Weekend", "Additional"];
  const tabContent = {
    personal: <Personal user={user} users={users}/>,
    work: <p>Second</p>,
    "pdp time": <p>Third</p>,
    weekend: <p>Four</p>,
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