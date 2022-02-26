import { ButtonStyled } from "components/ButtonStyled";
import React from "react";
import { Flex } from "../Flex";
import { UserBlockItem, UserText, UserTitle } from "../UserForm";

export default function TimeOffTab({ user }) {
  console.log(user.timeoff.requests);
  const requests = user.timeoff.requests;
  const historyTitle = ['Occurred', 'On',	'Description',	'Used (-)', 	'Accrued (+)', 	'Balance']
  return (
    <Flex direction="column">
      <Flex justufy="center">
        <UserBlockItem>
          <UserTitle>Vacation</UserTitle>
          <UserTitle>{user.timeoff.type.vacation.days}</UserTitle>
          <UserText>Available days</UserText>
          <ButtonStyled>Record Time Of</ButtonStyled>
          <UserText></UserText>
        </UserBlockItem>
        <UserBlockItem>
          <UserTitle>Paid</UserTitle>
          <UserTitle>{user.timeoff.type.paid.days}</UserTitle>
          <UserText>Available days</UserText>
          <ButtonStyled>Record Time Of</ButtonStyled>
        </UserBlockItem>
        <UserBlockItem>
          <UserTitle>Hospital</UserTitle>
          <UserTitle>{user.timeoff.type.hospital.days}</UserTitle>
          <UserText>Available days</UserText>
          <ButtonStyled>Record Time Of</ButtonStyled>
        </UserBlockItem>
      </Flex>
      <UserBlockItem>
        <Flex borderBottom='2px solid grey' justify='space-between'>
        <UserTitle>Requests</UserTitle>
        <select>
          <option>All</option>
          <option>Hospital</option>
          <option>Paid</option>
          <option>Vacation</option>
        </select>
        </Flex>
          {requests.map(({ id, type, startTime, endtime, reviewers }) => {
            return (
              <Flex key={id + reviewers.name} justify="space-between">
                <UserText>
                  {id} Type: {type} Start: {startTime}, End: {endtime}
                </UserText>
                <UserText>
                  Start: {startTime}, End: {endtime}
                </UserText>

                <UserText>
                  {reviewers.map(({ name, status }) => (
                    <UserText key={name + status}>
                      {name} - {status}
                    </UserText>
                  ))}
                </UserText>
              </Flex>
            );
          })}

      </UserBlockItem>
      <UserBlockItem >
      <Flex borderBottom='2px solid grey' justify='space-between'>
        <UserTitle>History</UserTitle>
        <select>
          <option>All</option>
          <option>Hospital</option>
          <option>Paid</option>
          <option>Vacation</option>
        </select>
        </Flex>
<UserText>
Total Used
</UserText>
<UserText>
Total Adjustments
</UserText>
<UserText>
Displaying
</UserText>
<UserText direction='row'>
<Flex justify='space-around'>
{historyTitle.map(title=>{
  return(
    <span>{title}</span>
    )
  })}
  </Flex>
</UserText>


      </UserBlockItem>
    </Flex>

  );
}
