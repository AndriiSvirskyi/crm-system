import React, { useState } from 'react'
import { Flex } from '../Flex';
import { UserBlockItem, UserText, UserTitle } from '../UserForm';
import Select from './Select';
import { TableCell, TableContainer, TableTitle } from './Table';

export default function History({history}) {

  const [filteredHiltory, setFilteredHistory] = useState(history);
  const selectOptions = ["All", "Hospital", "Paid", "Vacation"];


  return (
    <UserBlockItem>
    <Flex borderBottom="1px solid grey" justify="space-between">
      <UserTitle>History</UserTitle>
      <Select
        options={selectOptions}
        stateOriginal={history}
        setFilteredState={setFilteredHistory}
      />
    </Flex>
    <Flex justify="space-around">
      <UserText>Total Used</UserText>
      <UserText>Total Adjustments</UserText>
      <UserText>Displaying</UserText>
    </Flex>
    <UserText direction="row">
      <UserText size="15px">
        Displaying {filteredHiltory.length} - {history.length} of{" "}
        {history.length} in total
      </UserText>
    </UserText>
    <TableContainer>
      <tr>
        <TableTitle>Data</TableTitle>
        <TableTitle>Description</TableTitle>
        <TableTitle>Used(-)</TableTitle>
        <TableTitle>Accrued(+)</TableTitle>
        <TableTitle>Balance</TableTitle>
      </tr>
      {filteredHiltory.map(
        ({ id, description, data, used, accured, availableDays }) => {
          return (
            <tr key={id}>
              <TableCell>{data}</TableCell>
              <TableCell>{description}</TableCell>
              <TableCell>{used}</TableCell>
              <TableCell>{accured}</TableCell>
              <TableCell>{availableDays}</TableCell>
            </tr>
          );
        }
      )}
    </TableContainer>
  </UserBlockItem>
  )
}
