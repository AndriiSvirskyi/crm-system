import React from "react";
import router from "next/router";
import styled from "styled-components";

const UserTitle = styled.div`
  color: rgb(25, 118, 186);
  cursor: pointer;
`;

const TableGridMarkup = styled.div`
  height: 398px;

  display: grid;
  grid-auto-columns: minmax(100px, 350px);
  grid-auto-rows: 40px;
  grid-template-columns: repeat(6, 1fr);
  margin: 10px;
  border: 1px solid #ddd;
`;
const TableGridMarkupTitle = styled.div`
  padding-top: 10px;
  font-weight: bold;

`;

const TableGridMarkupUserCard = styled.div`
  border-top: 1px solid #ddd;
  font-size: 15px;
  padding-top: 10px;
`;

export default function TableCardEmployees({ filteredEmployees }) {
  return (
    <TableGridMarkup>
      <TableGridMarkupTitle>Full Name</TableGridMarkupTitle>
      <TableGridMarkupTitle>Employment Type</TableGridMarkupTitle>
      <TableGridMarkupTitle>Position</TableGridMarkupTitle>
      <TableGridMarkupTitle>Department</TableGridMarkupTitle>
      <TableGridMarkupTitle>Location</TableGridMarkupTitle>
      <TableGridMarkupTitle>Reporting To</TableGridMarkupTitle>

      {filteredEmployees.map((user) => (
        <>
          <TableGridMarkupUserCard
            onClick={() => router.push(`/employees/${user.id}`)}
          >
            <UserTitle>
              {user.name} {user.surname}
            </UserTitle>
          </TableGridMarkupUserCard>
          <TableGridMarkupUserCard>hard:FullTime</TableGridMarkupUserCard>
          <TableGridMarkupUserCard>{user.position}</TableGridMarkupUserCard>
          <TableGridMarkupUserCard>{user.department}</TableGridMarkupUserCard>
          <TableGridMarkupUserCard>{user.address}</TableGridMarkupUserCard>
          <TableGridMarkupUserCard>{user.team}</TableGridMarkupUserCard>
        </>
      ))}
    </TableGridMarkup>
  );
}
