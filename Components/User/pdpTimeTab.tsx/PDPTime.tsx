import React from "react";
import moment from "moment";
import { UserBlockItem, UserText, UserTitle } from "../UserForm";
import { Flex } from "../Flex";
import styled from "styled-components";

const Progress = styled.progress`
  width: 700px;
`;

export default function PDPTime() {
  const today = moment();
  const startDay = moment([2022, 0, 26]);
  const deadline = moment([2022, 2, 27]);
  return (
    <UserBlockItem>
      <Flex justify="space-between" margin="15px">
        <UserTitle>PDPTime</UserTitle>
        <UserText>Left:{deadline.diff(today, "d")} days </UserText>
      </Flex>

      <Flex margin="15px" width="100%">
        <Progress
          value={today.diff(startDay, "d")}
          max={deadline.diff(startDay, "d")}
        >
          {" "}
        </Progress>
      </Flex>
      <Flex justify="space-between">
        <UserText>Start: {startDay.format("D, MMMM, y")}</UserText>
        <UserText>End: {deadline.format("D, MMMM, y")}</UserText>
      </Flex>
    </UserBlockItem>
  );
}
