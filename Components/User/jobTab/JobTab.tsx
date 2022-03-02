import styled from "styled-components";
import { Flex } from "../Flex";
import { TableCell, TableContainer, TableTitle } from "../timeOffTab.tsx/Table";

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

  return (
    <Flex direction="column">
      <UserBlockItem>
        <Title padding="10px">Job</Title>
        <UserText size="15px">Hired on</UserText>
        <Input readOnly={true} disabled value={user.startDate}></Input>
      </UserBlockItem>
      <UserBlockItem>
        <Title>Employment Status</Title>
        <TableContainer>
            <tr>
            <TableTitle>Effective From</TableTitle>
            <TableTitle>Type</TableTitle>
            <TableTitle>Probation Policy</TableTitle>
            <TableTitle>Work Pattern</TableTitle>
          </tr>
          <tr>
            <TableCell>{user.startDate}</TableCell>
            <TableCell>{user.typeOfWork}</TableCell>
            <TableCell>hard: 2 Month</TableCell>
            <TableCell>?</TableCell>
          </tr>
        </TableContainer>
      </UserBlockItem>
      <UserBlockItem>
        <Title>Positions</Title>
        <TableContainer>
            <tr>
            <TableTitle>Effective From</TableTitle>
            <TableTitle>Position</TableTitle>
            <TableTitle>Location</TableTitle>
            <TableTitle>Division</TableTitle>
            <TableTitle>Department</TableTitle>
            <TableTitle>Reporting To</TableTitle>
          </tr>
          <tr>
            <TableCell>{user.startDate}</TableCell>
            <TableCell>{user.position}</TableCell>
            <TableCell>{user.address}</TableCell>
            <TableCell>{user.department}</TableCell>
            <TableCell>{user.team}</TableCell>
            <TableCell>hard:?</TableCell>
          </tr>
        </TableContainer>
      </UserBlockItem>
      {user.role ==='admin' && (
      <UserBlockItem>
        <Title>Compensation</Title>
        <TableContainer>
            <tr>
            <TableTitle>Effective From</TableTitle>
            <TableTitle>Amount</TableTitle>
            <TableTitle>Per</TableTitle>
            <TableTitle>Overtime</TableTitle>
            <TableTitle>Pay Schedule</TableTitle>
          </tr>
          <tr>
            <TableCell>{user.startDate}</TableCell>
            <TableCell>{user.amount}</TableCell>
            <TableCell>hard:Month</TableCell>
            <TableCell>hard:No</TableCell>
            <TableCell>hard:Paymens</TableCell>
          </tr>
        </TableContainer>
      </UserBlockItem>
      )}
    </Flex>
  );
}
