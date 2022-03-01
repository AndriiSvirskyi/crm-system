import styled from "styled-components";
import { Flex } from "../Flex";

import { UserBlockItem, UserText, UserTitle } from "../UserForm";


const Input = styled.input`
  width: 20%;
  border-radius: 8px;
  padding: 8px;
`;
const Title = styled(UserTitle)`
  border-bottom: 1px solid grey;
`;

export default function JobTab({ user }) {
  const employmentStatusTitle = [
    "Effective From",
    "Type",
    "Probation Policy",
    "Work Pattern",
  ];
  const employmentInfo = [
    user.startDate,
    user.typeOfWork,
    user.probationPolicy,
    '?'
  ]
  const positionsTitle = [
    "Effective From",
    "Position",
    "Location",
    "Division",
    "Department",
    "Reporting To"
  ];
  const positionsInfo = [
    user.startDate,
    user.position,
    user.address,
    user.department,
    user.team
  ]
  const conpensationTitle = [
    "Effective From",
    "Amount",
    "Per",
    "Overtime",
    "Pay Schedule",
  ];
  const conpensationInfo = [
    user.startDate,
    user.amount,
    "Month",
    "No",
    "Paymens"
  ]
  return (
    <Flex direction="column">
      <UserBlockItem>
        <Title padding="10px">Job</Title>
        <UserText size="15px">Hired on</UserText>
        <Input readOnly={true} disabled value={user.startDate}></Input>
      </UserBlockItem>
      <UserBlockItem>
        <Title>Employment Status</Title>
        <Flex justify="space-between" borderBottom="1px solid grey">
          {employmentStatusTitle.map((title, id) => (
            <UserText key={id} size="15px" margin="5px">
              {title}
            </UserText>
          ))}
        </Flex>
        <Flex justify="space-between" borderBottom="1px solid grey">
          {employmentInfo.map((title, id) => (
            <UserText key={id} size="10px" margin="5px">
              {title}
            </UserText>
          ))}
        </Flex>
      </UserBlockItem>
      <UserBlockItem>
        <Title>Positions</Title>
        <Flex justify="space-between" borderBottom="1px solid grey">
          {positionsTitle.map((title, id) => (
            <UserText key={id} size="15px" margin="5px">
              {title}
            </UserText>
          ))}
        </Flex>
        <Flex justify="space-between" borderBottom="1px solid grey">
          {positionsInfo.map((title, id) => (
            <UserText key={id} size="10px" margin="5px">
              {title}
            </UserText>
          ))}
        </Flex>
      </UserBlockItem>
      {user.role ==='admin' && (
      <UserBlockItem>
        <Title>Compensation</Title>
        <Flex justify="space-between" borderBottom="1px solid grey">
          {conpensationTitle.map((title, id) => (
            <UserText key={id} size="15px" margin="5px">
              {title}
            </UserText>
          ))}
        </Flex>
        <Flex justify="space-between" borderBottom="1px solid grey">
          {conpensationInfo.map((title, id) => (
            <UserText key={id} size="10px" margin="5px">
              {title}
            </UserText>
          ))}
        </Flex>
      </UserBlockItem>
      )}
    </Flex>
  );
}
