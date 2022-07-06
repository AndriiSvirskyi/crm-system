import { Button } from "Components/Button";
import { Input } from "Components/Inputs/Input";
import { projectPositions } from "constants/positions";
import React from "react";
import { useRecoilValue } from "recoil";
import { usersState } from "state/atoms";
import { Flex } from "styled-components/Flex";
import { Form } from "styled-components/Form";
import { Label } from "styled-components/Label";

export default function ProjectAddForm({ name, setName, onSubmit, position, setPosition, title }) {
  const users = useRecoilValue(usersState);
  return (
    <Form submit={onSubmit} content={title}>
      <Label htmlFor='name' width='50px'>
        Name
      </Label>
      <Input
        id='name'
        list='people'
        value={name}
        onChange={(e) => setName(e.target.value)}
        width='100%'
        height='40px'
        outline='1px solid black'
        background='none'
        margin='0 0 10px 0'
        required
      />
      <datalist id='people'>
        {users.map(({ name, surname, id }) => {
          return (
            <option key={id}>
              {name} {surname}
            </option>
          );
        })}
      </datalist>
      {position !== "Lead" && (
        <>
          <Label htmlFor='position' width='50px'>
            Position
          </Label>
          <Input
            id='position'
            list='positions'
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            width='100%'
            height='40px'
            outline='1px solid black'
            background='none'
            margin='0 0 10px 0'
            required
          />
          <datalist id='positions'>
            {Object.values(projectPositions).map((item) => {
              return <option key={item}>{item}</option>;
            })}
          </datalist>
        </>
      )}
      <Flex direction='column' width='100%'>
        <Button height='35px' padding='10px' color='#FFFFFF' background='#ff9f69' hoverBack='#ff9f69CC'>
          <b>Save</b>
        </Button>
      </Flex>
    </Form>
  );
}
