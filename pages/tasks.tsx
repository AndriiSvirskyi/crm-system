import MainLayout from "Layouts/MainLayout";
import { UserBlockItem, UserTitle, UserWindow } from "components/User/UserForm";
import { Flex } from "components/User/Flex";
import { ButtonStyled } from "components/ButtonStyled";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import Modal from "components/Modal/Modal";
import { Form } from "components/form/Form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { usersState } from "state/atoms";
import { InputComponent } from "components/InputComponent";
import { Label } from "components/User/personalTab/Label";
import styled from "styled-components";

export const Select = styled.select`
  height: "auto";
  height: 40px;
  width: 100%;
  border-radius: 8px;
  padding: 0 0 0 25px;
  margin: 0 0 10px 0;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

const Textarea = styled.textarea`
  max-width: 100%;
  min-width: 100%;
  width: 100%;
  min-height: 80px;
  border-radius: 8px;
  margin: 0 0 10px 0;
  padding: 10px 0 0 0;
`;
const Tasks = () => {
  const [createTask, setCreateTask] = useState(false);
  const [byMe, setByMe] = useState(true);
  const [toMe, setToMe] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [future, setFuture] = useState(false);
  const setUsersToRecoil = useSetRecoilState(usersState);
  const users = useRecoilValue(usersState);
  //   const [user, setUser] = useState(null);

  useEffect(() => {
    if (!users) {
      const response = fetch("http://localhost:4200/users");
      response
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setUsersToRecoil(res);
        });
    }
    // if (localStorage.user) {
    //   setUser(JSON.parse(localStorage.user));
    // }
  }, []);

  const getTask = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("CREATED");
  };
  console.log(users);
  return (
    <MainLayout>
      <UserWindow>
        <Flex justify="space-between" align="center" padding="0 10px 0 0">
          <UserTitle size="40px" margin="0 60px 0 0">
            Tasks
          </UserTitle>
          <ButtonStyled
            height="35px"
            padding="10px 9px"
            color="#FFFFFF"
            background="#ff9f69"
            hoverBack="#ff9f69CC"
            onClick={() => setCreateTask(true)}
          >
            <Flex width="80px" justify="space-between">
              <FaPlus />
              <b>Add Task</b>
            </Flex>
          </ButtonStyled>
        </Flex>
        <Flex width="100%">
          <ButtonStyled
            width="25%"
            height="40px"
            margin="10px"
            background={byMe && "#9C9C9C"}
            onClick={() => {
              setToMe(false);
              setCompleted(false);
              setFuture(false);
              setByMe(true);
            }}
          >
            <b>Created by me</b>
          </ButtonStyled>
          <ButtonStyled
            width="25%"
            height="40px"
            margin="10px"
            background={toMe && "#9C9C9C"}
            onClick={() => {
              setCompleted(false);
              setFuture(false);
              setByMe(false);
              setToMe(true);
            }}
          >
            <b>Assigned to me</b>
          </ButtonStyled>
          <ButtonStyled
            width="25%"
            height="40px"
            margin="10px"
            background={completed && "#9C9C9C"}
            onClick={() => {
              setFuture(false);
              setByMe(false);
              setToMe(false);
              setCompleted(true);
            }}
          >
            <b>Completed</b>
          </ButtonStyled>
          <ButtonStyled
            width="25%"
            height="40px"
            margin="10px"
            background={future && "#9C9C9C"}
            onClick={() => {
              setByMe(false);
              setToMe(false);
              setCompleted(false);
              setFuture(true);
            }}
          >
            <b>Future</b>
          </ButtonStyled>
        </Flex>
        <Flex>
          {byMe && <UserBlockItem>By me</UserBlockItem>}
          {toMe && <UserBlockItem>To me</UserBlockItem>}
          {completed && <UserBlockItem>Completed</UserBlockItem>}
          {future && <UserBlockItem>Future</UserBlockItem>}
        </Flex>
        {createTask && (
          <Modal close={() => setCreateTask(false)}>
            <Form
              submit={(e: { preventDefault: () => void }) => getTask(e)}
              content="New task"
            >
              <InputComponent
                placeholder="Title *"
                width="100%"
                height="40px"
                outline="1px solid black"
                background="none"
                margin="0 0 10px 0"
              />
              <Select>
                <option>Assigned to *</option>
                {users.map(({ name, surname, id, unit, department }) => {
                  return (
                    <option key={id}>
                      {`
                      ${name} ${surname} | \n
                       ${unit} - ${department} 
                      `}
                    </option>
                  );
                })}
              </Select>
              <Textarea placeholder="Description *" />
              <Flex direction="column" width="100%">
                <Flex margin="0 0 10px 0">
                  <Label htmlFor="from">Starts on *</Label>
                  <InputComponent
                    id="from"
                    type="date"
                    width="100%"
                    height="40px"
                    outline="1px solid black"
                    background="none"
                  />
                </Flex>
                <Flex margin="0 0 10px 0">
                  <Label htmlFor="to">Ends on *</Label>
                  <InputComponent
                    id="to"
                    type="date"
                    width="100%"
                    height="40px"
                    outline="1px solid black"
                    background="none"
                  />
                </Flex>
              </Flex>
            </Form>
          </Modal>
        )}
      </UserWindow>
    </MainLayout>
  );
};
export default Tasks;
