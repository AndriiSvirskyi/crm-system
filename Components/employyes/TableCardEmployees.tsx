import React from 'react'
import router from "next/router";
import styled from 'styled-components';

const UserTitle = styled.div`
  color: rgb(25, 118, 186);
  cursor: pointer;
`;

const TableMarkup = styled.table`
  width: 100%;
  padding: 0;
  margin: 10px;
  text-align:left;
border: 1px solid #ddd;

`;
const TableMarkupTitle = styled.th``;

const TableMarkupUserCard = styled.td`
border-top: 1px solid #ddd;
    font-size: 15px;
    padding:10px 0;
`;

export default function TableCardEmployees({filteredEmployees}) {
  return (
    <TableMarkup>
                <tr>
                  <TableMarkupTitle>Full Name</TableMarkupTitle>
                  <TableMarkupTitle>Employment Type</TableMarkupTitle>
                  <TableMarkupTitle>Position</TableMarkupTitle>
                  <TableMarkupTitle>Department</TableMarkupTitle>
                  <TableMarkupTitle>Location</TableMarkupTitle>
                  <TableMarkupTitle>Reporting To</TableMarkupTitle>
                </tr>
                
                {filteredEmployees.map((user) => (
                  <tr key={user.id}>
                    <TableMarkupUserCard
                      onClick={() => router.push(`/employees/${user.id}`)}
                    >
                      <UserTitle>
                        {user.name} {user.surname}
                      </UserTitle>
                    </TableMarkupUserCard>
                    <TableMarkupUserCard>hard:FullTime</TableMarkupUserCard>
                    <TableMarkupUserCard>{user.position}</TableMarkupUserCard>
                    <TableMarkupUserCard>{user.department}</TableMarkupUserCard>
                    <TableMarkupUserCard>{user.address}</TableMarkupUserCard>
                    <TableMarkupUserCard>{user.team}</TableMarkupUserCard>
                  </tr>
                ))}
              </TableMarkup>
  )
}
