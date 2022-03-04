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
          <>
            <tr>
            <TableTitle width="25%">Effective From</TableTitle>
            <TableTitle width="25%">Type</TableTitle>
            <TableTitle width="25%">Probation Policy</TableTitle>
            <TableTitle width="25%">Work Pattern</TableTitle>
          </tr>
          <tr>
            <TableCell width="25%">{user.startDate}</TableCell>
            <TableCell width="25%">{user.typeOfWork}</TableCell>
            <TableCell width="25%">hard: 2 Month</TableCell>
            <TableCell width="25%">?</TableCell>
          </tr>
          </>
        </TableContainer>
      </UserBlockItem>
      <UserBlockItem>
        <Title>Positions</Title>
        <TableContainer>
          <>
            <tr>
            <TableTitle width="20%">Effective From</TableTitle>
            <TableTitle width="20%">Position</TableTitle>
            <TableTitle width="20%">Location</TableTitle>
            <TableTitle width="15%">Division</TableTitle>
            <TableTitle width="15%">Department</TableTitle>
            <TableTitle width="10%">Reporting To</TableTitle>
          </tr>
          <tr>
            <TableCell width="20%">{user.startDate}</TableCell>
            <TableCell width="20%">{user.position}</TableCell>
            <TableCell width="20%">{user.address}</TableCell>
            <TableCell width="15%">{user.department}</TableCell>
            <TableCell width="15%">{user.team}</TableCell>
            <TableCell width="10%">hard:?</TableCell>
          </tr>
          </>
        </TableContainer>
      </UserBlockItem>
      {user.role ==='admin' && (
      <UserBlockItem>
        <Title>Compensation</Title>
        <TableContainer>
          <>
            <tr>
            <TableTitle width="20%">Effective From</TableTitle>
            <TableTitle width="20%">Amount</TableTitle>
            <TableTitle width="20%">Per</TableTitle>
            <TableTitle width="20%">Overtime</TableTitle>
            <TableTitle width="20%">Pay Schedule</TableTitle>
          </tr>
          <tr>
            <TableCell width="20%">{user.startDate}</TableCell>
            <TableCell width="20%">{user.amount}</TableCell>
            <TableCell width="20%">hard:Month</TableCell>
            <TableCell width="20%">hard:No</TableCell>
            <TableCell width="20%">hard:Paymens</TableCell>
          </tr>
          </>
        </TableContainer>
      </UserBlockItem>
      )}
    </Flex>
  );
}
