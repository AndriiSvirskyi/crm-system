import { Button } from "components/Button";
import { Flex } from "../../../styled-components/Flex";
import {
  UserBlockItem,
  UserText,
  UserTitle,
} from "../../../styled-components/UserForm";
import { IoAirplane, IoMedicalSharp, IoBagAdd } from "react-icons/io5";

import History from "./History";
import Request from "./Request";

export default function TimeOffTab({ user }) {
  const requests = user.timeoff.requests;
  const history = user.timeoff.history;

  return (
    <Flex direction="column">
      <Flex>
        <UserBlockItem>
          <Flex direction="column" align="center">
            <UserTitle>Vacation</UserTitle>
            <IoAirplane size={40} color="#30d5c8" />
            <UserTitle size="30px" margin="0">
              {user.timeoff.type.vacation.days}
            </UserTitle>
            <UserText>Available days</UserText>
            <Button margin="0 0 20px 0">Record Time Of</Button>
          </Flex>
        </UserBlockItem>
        <UserBlockItem>
          <Flex direction="column" align="center">
            <UserTitle>Paid</UserTitle>
            <IoMedicalSharp size={40} color="blue" />
            <UserTitle size="30px" margin="0">
              {user.timeoff.type.paid.days}
            </UserTitle>
            <UserText>Available days</UserText>
            <Button margin="0 0 20px 0">Record Time Of</Button>
          </Flex>
        </UserBlockItem>
        <UserBlockItem>
          <Flex direction="column" align="center">
            <UserTitle>Hospital</UserTitle>
            <IoBagAdd size={40} color="red" />
            <UserTitle size="30px" margin="0">
              {user.timeoff.type.hospital.days}
            </UserTitle>
            <UserText>Available days</UserText>
            <Button margin="0 0 20px 0">Record Time Of</Button>
          </Flex>
        </UserBlockItem>
      </Flex>
      <Request requests={requests} />
      <History history={history} />
    </Flex>
  );
}
