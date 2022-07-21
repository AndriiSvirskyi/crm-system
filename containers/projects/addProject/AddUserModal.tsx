import { Button } from "Components/Button";
import { Input } from "Components/Inputs/Input";
import Modal from "Components/Modal";
import { SnackbarContext } from "providers/useSnackbar";
import React, { useContext } from "react";
import { useRecoilValue } from "recoil";
import { usersState } from "state/atoms";
import { Flex } from "styled-components/Flex";
import { Form } from "styled-components/Form";
import { Label } from "styled-components/Label";

export default function AddUserModal({
  name,
  setName,
  position,
  setPosition,
  title,
  positions,
  team,
  setTeam,
  setOpen,
}) {
  const snackBar = useContext(SnackbarContext);
  const users = useRecoilValue(usersState);
  const onSubmit = (e) => {
    e.preventDefault();
    try {
      if (users.find((item) => `${item.name} ${item.surname}` === name)) {
        setTeam([...team, { [name]: position }]);
        setPosition("");
        setName("");
        snackBar.openSnackBar({
          message: "Team member added",
          type: "success",
        });
      } else
        snackBar.openSnackBar({
          message: "Invalid name",
          type: "error",
        });
    } catch (e) {
      snackBar.openSnackBar({
        message: "Failed to add Member",
        type: "error",
      });
    }
  };
  return (
    <Modal
      close={() => {
        setOpen(false), setPosition(""), setName("");
      }}
    >
      <Form submit={onSubmit} content={title}>
        <Flex margin='0 0 10px 0' direction='column' width='100%'>
          <Label htmlFor='name' required={true}>
            Name
          </Label>
          <Input
            list='users'
            value={name}
            onChange={(e) => setName(e.target.value)}
            width='100%'
            height='40px'
            outline='1px solid #d0d0d0'
            background='none'
            margin='0 0 10px 0'
            required
          />
          <datalist id='users' role='datalist'>
            {users.map(
              (user) =>
                !team.find((item) => item[`${user.name} ${user.surname}`]) && (
                  <option key={user.id}>
                    {user.name} {user.surname}
                  </option>
                ),
            )}
          </datalist>
        </Flex>
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
            {Object.values(positions).map((item, i) => {
              return <option key={`position ${i}`}>{item}</option>;
            })}
          </datalist>
        </Flex>
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
            <b>Add</b>
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
}
