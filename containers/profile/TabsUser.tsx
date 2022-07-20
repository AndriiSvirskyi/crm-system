import { Button } from "components/Button";
import { Flex } from "styled-components/Flex";
import { useState } from "react";
import { Personal } from "./personalTab";
import PDPTime from "./pdpTimeTab.tsx";
import TimeOffTab from "./timeOffTab.tsx";
import JobTab from "./jobTab";
import styled from "styled-components";

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

export default function Tabs({ user }) {
  const [activeTab, setActiveTab] = useState("personal");
  const tabsButtons = ["Personal", "Job", "PDP time", "Time Off", "Additional"];
  const tabContent = {
    personal: <Personal user={user} />,
    job: <JobTab user={user} />,
    "pdp time": <PDPTime />,
    "time off": user.timeOff ? <TimeOffTab user={user} /> : <div>No time off information</div>,
    additional: <p>Five</p>,
  };
  return (
    <Flex justify="space-around" width="100%">
      <TabsStyled>
        <Flex>
          {tabsButtons.map((tab) => {
            return (
              <Button
                width="20%"
                height="60px"
                margin="10px"
                background={
                  activeTab === tab.toLocaleLowerCase() ? "#9C9C9C" : "#D0D0D0"
                }
                key={tab}
                onClick={() => setActiveTab(tab.toLocaleLowerCase())}
              >
                {tab}
              </Button>
            );
          })}
        </Flex>
        <TabsContent>{tabContent[activeTab]}</TabsContent>
      </TabsStyled>
    </Flex>
  );
}
