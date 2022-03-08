import React from "react";
import moment from "moment";
import {
  UserBlockItem,
  UserText,
  UserTitle,
} from "../../../styled-components/UserForm";
import { Flex } from "../../../styled-components/Flex";
import styled from "styled-components";

const Progress = styled.progress`
  width: 700px;
  margin-left: 10px;
`;

export default function PDPTime() {
  const today = moment();
  const startDay = moment([2022, 0, 26]);
  const deadline = moment([2022, 2, 27]);
  return (
    <UserBlockItem>
      <UserTitle borderBottom="1px solid grey">PDPTime</UserTitle>
      <Flex justify="end" margin=" 10px 10px 0">
        <UserText size="20px">Left:{deadline.diff(today, "d")} days </UserText>
      </Flex>
      <Flex>
        <Progress
          value={today.diff(startDay, "d")}
          max={deadline.diff(startDay, "d")}
        ></Progress>
      </Flex>
      <Flex justify="space-between" margin="0 10px">
        <UserText>Start: {startDay.format("D, MMMM, y")}</UserText>
        <UserText margin="16px 50px 0 0">
          End: {deadline.format("D, MMMM, y")}
        </UserText>
      </Flex>
    </UserBlockItem>
  );
}
