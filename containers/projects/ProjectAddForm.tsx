import { Button } from "Components/Button";
import { Input } from "Components/Inputs/Input";
import { projectPositions } from "constants/positions";
import React from "react";
import { useRecoilValue } from "recoil";
import { usersState } from "state/atoms";
import { Flex } from "styled-components/Flex";
import { Form } from "styled-components/Form";
import { Label } from "styled-components/Label";

export default function ProjectAddForm({
  name,
  setName,
  onSubmit,
  position,
  setPosition,
  title,
  project,
  type = "add",
}) {
  const users = useRecoilValue(usersState);
  return (
    <Form submit={onSubmit} content={title}>
      {!(type === "edit") && (
        <Flex margin='0 0 10px 0' direction='column' width='100%'>
          <Label htmlFor='name' required={true}>
            Name
          </Label>
          <Input
            list='people'
            value={name}
            onChange={(e) => setName(e.target.value)}
            width='100%'
            height='40px'
            outline='1px solid #d0d0d0'
            background='none'
            margin='0 0 10px 0'
            required
          />
          <datalist id='people' role='datalist'>
            {users.map((user) =>
              type === "add"
                ? !project.team?.find((item) => item.id === user.id) &&
                  project.lead?.id !== user.id && (
                    <option key={user.id}>
                      {user.name} {user.surname}
                    </option>
                  )
                : project.team?.lead?.id !== user.id && (
                    <option key={user.id}>
                      {user.name} {user.surname}
                    </option>
                  ),
            )}
          </datalist>
        </Flex>
      )}
      {!(type == "change") && (
        <Flex margin='0 0 10px 0' direction='column' width='100%'>
          <Label htmlFor='position' required={true}>
            Position
          </Label>
          <Input
            list='positions'
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            width='100%'
            height='40px'
            outline='1px solid #d0d0d0'
            background='none'
            margin='0 0 10px 0'
            required
          />
          <datalist id='positions'>
            {Object.values(projectPositions).map((item) => {
              return <option key={item}>{item}</option>;
            })}
          </datalist>
        </Flex>
      )}
      <Flex direction='column' width='100%'>
        <Button
          height='35px'
          padding='10px'
          color='#FFFFFF'
          background='#ff9f69'
          hoverBack='#ff9f69CC'
          width='fit-content'
          margin='20px 0 0 '
        >
          <b>Save</b>
        </Button>
      </Flex>
    </Form>
  );
}
