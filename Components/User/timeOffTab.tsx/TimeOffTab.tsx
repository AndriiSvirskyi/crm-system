import { ButtonStyled } from "components/ButtonStyled";
import React, { useState } from "react";
import { Flex } from "../Flex";
import { UserBlockItem, UserText, UserTitle } from "../UserForm";
import Select from "./Select";
import { IoAirplane, IoMedicalSharp, IoBagAdd } from "react-icons/io5";
import { BiChevronDownCircle, BiUser } from "react-icons/bi";

export default function TimeOffTab({ user }) {
  const requests = user.timeoff.requests;
  const history = user.timeoff.history;
  const [filteredRequests, setFilteredRequests] = useState(requests);
  const [filteredHiltory, setFilteredHistory] = useState(history);
  const selectOptions = ["All", "Hospital", "Paid", "Vacation"];

  return (
    <Flex direction="column">
      <Flex>
        <UserBlockItem>
          <Flex direction="column" align="center">
            <UserTitle>Vacation</UserTitle>
            <IoAirplane size={40} color="#30d5c8" />
            <UserTitle size="30px" margin="0">
              {user.timeoff.type.vacation.days}
            </UserTitle>
            <UserText>Available days</UserText>
            <ButtonStyled margin="0 0 20px 0">Record Time Of</ButtonStyled>
          </Flex>
        </UserBlockItem>
        <UserBlockItem>
          <Flex direction="column" align="center">
            <UserTitle>Paid</UserTitle>
            <IoMedicalSharp size={40} color="blue" />
            <UserTitle size="30px" margin="0">
              {user.timeoff.type.paid.days}
            </UserTitle>
            <UserText>Available days</UserText>
            <ButtonStyled margin="0 0 20px 0">Record Time Of</ButtonStyled>
          </Flex>
        </UserBlockItem>
        <UserBlockItem>
          <Flex direction="column" align="center">
            <UserTitle>Hospital</UserTitle>
            <IoBagAdd size={40} color="red" />
            <UserTitle size="30px" margin="0">
              {user.timeoff.type.hospital.days}
            </UserTitle>
            <UserText>Available days</UserText>
            <ButtonStyled margin="0 0 20px 0">Record Time Of</ButtonStyled>
          </Flex>
        </UserBlockItem>
      </Flex>
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
        <Flex justify="space-between">
          <UserText>Type</UserText>
          <UserText>Count</UserText>
          <UserText>Status</UserText>
        </Flex>
        <Flex direction="column">
          {filteredRequests.map(({ id, type, reviewers, count }) => {
            return (
              <Flex
                key={id + reviewers.name}
                justify="space-between"
                borderTop="1px solid grey"
                padding="5px"
              >
                <Flex direction="column">
                  {type === "Hospital" ? (
                    <IoBagAdd size={30} color="red" />
                  ) : type === "Paid" ? (
                    <IoMedicalSharp size={30} color="blue" />
                  ) : (
                    <IoAirplane size={30} color="#30d5c8" />
                  )}
                  <UserText size="10px">1.01 2000 - 11.02.2022</UserText>
                </Flex>
                <UserText>{count} Days</UserText>
                <Flex>
                  <UserText>Status</UserText>
                  {reviewers.map(({ status }) => {
                    let countOfAccept = 0;
                    if (status === "accept") {
                      countOfAccept++;
                      return <BiChevronDownCircle size={25} color="green" />;
                    }
                    return <BiUser key={status} size={25} />;
                  })}
                </Flex>
              </Flex>
            );
          })}
        </Flex>
      </UserBlockItem>
      <UserBlockItem>
        <Flex borderBottom="1px solid grey" justify="space-between">
          <UserTitle>History</UserTitle>
          <Select
            options={selectOptions}
            stateOriginal={history}
            setFilteredState={setFilteredHistory}
          />
        </Flex>
        <Flex justify='space-around'>
          <UserText>Total Used</UserText>
          <UserText>Total Adjustments</UserText>
          <UserText>Displaying</UserText>
        </Flex>
        <UserText direction="row">
          <UserText size="15px">
            Displaying {filteredHiltory.length} - {history.length} of{" "}
            {history.length} in total
          </UserText>
          <Flex justify="space-between">
            <UserText size="15px">Data</UserText>
            <UserText size="15px">Description</UserText>
            <UserText size="15px">Used (-)</UserText>
            <UserText size="15px">Accrued (+)</UserText>
            <UserText size="15px">Balance</UserText>
          </Flex>
          {filteredHiltory.map(
            ({ id, description, data, used, accured, availableDays }) => {
              return (
                <Flex
                  key={id}
                  justify="space-between"
                  borderTop="1px solid grey"
                >
                  <UserText size="15px">{data}</UserText>
                  <UserText size="15px">{description}</UserText>
                  <UserText size="15px">{used}</UserText>
                  <UserText size="15px">{accured}</UserText>
                  <UserText size="15px">{availableDays}</UserText>
                </Flex>
              );
            }
          )}
        </UserText>
      </UserBlockItem>
    </Flex>
  );
}
