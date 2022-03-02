import React, { useState } from 'react'
import { BiChevronDownCircle, BiHourglass, BiUser, BiUserX } from 'react-icons/bi';
import { IoAirplane, IoBagAdd, IoMedicalSharp } from 'react-icons/io5';
import { Flex } from '../Flex';
import { UserBlockItem, UserText, UserTitle } from '../UserForm';
import Select from './Select';
import { TableCell, TableContainer, TableTitle } from './Table';

export default function Request({requests}) {
    const [filteredRequests, setFilteredRequests] = useState(requests);
    const selectOptions = ["All", "Hospital", "Paid", "Vacation"];
  return (
    <UserBlockItem>
        <Flex borderBottom="1px solid grey" justify="space-between">
          <UserTitle>Requests</UserTitle>
          <Select
            options={selectOptions}
            stateOriginal={requests}
            setFilteredState={setFilteredRequests}
          />
        </Flex>
        <UserText size="15px">
          Displaying {filteredRequests.length} - {requests.length} of{" "}
          {requests.length} in total
        </UserText>

        <TableContainer>
          <tr>
            <TableTitle>Type</TableTitle>
            <TableTitle>Count</TableTitle>
            <TableTitle>Status</TableTitle>
          </tr>
          {filteredRequests.map(({ id, type, reviewers, count }) => {
            let accepted = [];
            let rejected = [];
            let inProcess = [];
            let pending = [];

            for (let i = 0; i < reviewers.length; i++) {
              if (reviewers[i].status === "accept") {
                accepted.push(reviewers[i]);
                continue;
              }
              if (reviewers[i].status === "reject") {
                rejected.push(reviewers[i]);
                continue;
              }
              if (reviewers[i].status === "inProcess") {
                inProcess.push(reviewers[i]);
                continue;
              }
              if (reviewers[i].status === "pending") {
                pending.push(reviewers[i]);
                continue;
              }
            }
            return (
              <tr key={id + reviewers.name}>
                <TableCell>
                  <Flex direction="column">
                    {type === "Hospital" && <IoBagAdd size={30} color="red" />}
                    {type === "Paid" && (
                      <IoMedicalSharp size={30} color="blue" />
                    )}
                    {type === "Vacation" && (
                      <IoAirplane size={30} color="#30d5c8" />
                    )}
                    <UserText size="10px">1.01 2000 - 11.02.2022</UserText>
                  </Flex>
                </TableCell>
                <TableCell>
                  <UserText>{count} Days</UserText>
                </TableCell>
                <TableCell>
                  <Flex justify='end' >
                    {accepted.length === 4 && (
                      <UserText
                        color="green"
                        background="#0aff5363"
                        radius="8px"
                        margin=''
                      >
                        Accepted
                      </UserText>
                    )}
                    {rejected.length < 1 && accepted.length < 4 && (
                      <UserText
                        color="grey"
                        background="#a5a4a47c"
                        radius="8px"
                      >
                        Open
                      </UserText>
                    )}
                    {rejected.length >= 1 && (
                      <UserText color="red" background="#ff040442" radius="8px">
                        Denied
                      </UserText>
                    )}
                    <Flex margin=' 10px 0 0 0'>
                    {accepted.length >= 1 &&
                      accepted.map((accept) => (
                        <BiChevronDownCircle
                          key={accept.name}
                          size={25}
                          color="green"
                        />
                      ))}
                    {rejected.length >= 1 &&
                      rejected.map((accept) => (
                        <BiUserX key={accept.name} size={25} color="red" />
                      ))}
                    {inProcess.length >= 1 &&
                      inProcess.map((accept) => (
                        <BiHourglass
                          key={accept.name}
                          size={25}
                          color={rejected.length >= 1 ? "grey" : "#c9ab01"}
                        />
                      ))}
                    {pending.length >= 1 &&
                      pending.map((accept) => (
                        <BiUser
                          key={accept.name}
                          size={25}
                          color={rejected.length >= 1 ? "grey" : "black"}
                        />
                      ))}
                      </Flex>
                  </Flex>
                </TableCell>
              </tr>
            );
          })}
        </TableContainer>
      </UserBlockItem>
  )
}
