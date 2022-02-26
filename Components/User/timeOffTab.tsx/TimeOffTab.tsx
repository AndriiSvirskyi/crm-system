
import { ButtonStyled } from 'components/ButtonStyled'
import React from 'react'
import { Flex } from '../Flex'
import { UserBlockItem, UserText, UserTitle } from '../UserForm'

export default function TimeOffTab({user}) {
    console.log(user.timeoff.type.vacation.days)
  return (
      <Flex direction='column'>
        <Flex justufy='center'>
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
<UserTitle>Requests</UserTitle>

</UserBlockItem>
</Flex>
  )
}
