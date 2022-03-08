import React, { useState } from "react";
import { Flex } from "../../../styled-components/Flex";
import {
  UserBlockItem,
  UserText,
  UserTitle,
} from "../../../styled-components/UserForm";
import Select from "../../../components/Select";
import {
  TableCell,
  TableContainer,
  TableTitle,
} from "../../../styled-components/Table";

export default function History({ history }) {
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
        <>
          <tr>
            <TableTitle width="20%">Data</TableTitle>
            <TableTitle width="40%">Description</TableTitle>
            <TableTitle width="10%">Used(-)</TableTitle>
            <TableTitle width="10%">Accrued(+)</TableTitle>
            <TableTitle width="10%">Balance</TableTitle>
          </tr>
          {filteredHiltory.map(
            ({ id, description, data, used, accured, availableDays }) => {
              return (
                <tr key={id}>
                  <TableCell width="20%">{data}</TableCell>
                  <TableCell width="40%">{description}</TableCell>
                  <TableCell width="10%">{used}</TableCell>
                  <TableCell width="10%">{accured}</TableCell>
                  <TableCell width="10%">{availableDays}</TableCell>
                </tr>
              );
            }
          )}
        </>
      </TableContainer>
    </UserBlockItem>
  );
}
