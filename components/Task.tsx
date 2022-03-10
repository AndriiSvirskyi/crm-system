import router from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { BiCalendar, BiCheck } from "react-icons/bi";
import { ButtonStyled } from "./ButtonStyled";
import { ImageContainer } from "./ImageContainer";
import { Flex } from "./User/Flex";
import { HiDotsHorizontal } from "react-icons/hi";
import { Options } from "./Options";
import { RemoveUserModal } from "./Modal/RemoveModal";

const TaskContainer = styled.div`
  width: 100%;
  min-height: 45px;
  box-sizing: border-box;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 8px;
  margin: 0 0 10px 0;
  padding: 10px;
  h3 {
    min-width: 150px;
    font-size: 16px;
    display: inline;
    margin: 0 30px 0 0;
  }
  :hover {
    background: #d9d9ff36;
  }
`;
const TaskInfo = styled.div`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid black;
  border-radius: 8px;
  margin: 0 0 10px 0;
  padding: 10px;
`;
const Fullname = styled.span`
  cursor: pointer;
  color: #0d74bc;
  &:hover {
    color: #2196f3;
  }
`;
const Title = styled.h3`
  font-weight: 500;
  text-decoration: ${(props: { line: string }) => props.line || ""};
`;

const OptionsContainer = styled.div`
  position: relative;
`;
type TaskProps = {
  title: string;
  end: string;
  starts: string;
  status: string;
  description: string;
  createdBy: string;
  assignedTo: string;
  users: [{ id: string; image: string; name: string; surname: string }];
  changeStatus: () => void;
  removeTask?: () => void;
  completed?: boolean;
  isCreatedByMe?: boolean;
  editTask?: () => void;
};
export const Task = ({
  title,
  end,
  starts,
  status,
  description,
  createdBy,
  assignedTo,
  users,
  changeStatus,
  removeTask,
  completed,
  isCreatedByMe,
  editTask
}: TaskProps) => {
  const [showTask, setShowTask] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [askToRemove, setAskToRemove] = useState(false);

  return (
    <>
      <TaskContainer>
        <Flex align="center">
          <Flex
            width="100%"
            justify="space-between"
            onClick={() => setShowTask(!showTask)}
          >
            <Title line={completed && "line-through"}>{title}</Title>
            <Flex width="200" align="center">
              <Flex width="105px" justify="space-between">
                <BiCalendar /> {end}
              </Flex>
            </Flex>
          </Flex>
          {isCreatedByMe && (
            <OptionsContainer>
              <ButtonStyled
                background="none"
                hoverBack="#0d73bc4c"
                padding="4px 10px 0 10px"
              >
                <HiDotsHorizontal
                  size="25"
                  fill="#0d74bc"
                  onClick={() => {
                    setShowOptions(!showOptions);
                  }}
                />
              </ButtonStyled>
              {showOptions && (
                <Options
                  editTask={editTask}
                  askToRemove={() => {
                  
                    setAskToRemove(true);
                  }}
                />
              )}
            </OptionsContainer>
          )}
        </Flex>
      </TaskContainer>
      {showTask && (
        <TaskInfo>
          <Flex justify="space-between">
            <Flex direction="column" width="70%">
              <ButtonStyled
                width="130px"
                background="#fffcd0"
                hoverBack="#dfddc6"
                onClick={changeStatus}
              >
                <Flex width="100%" align="center">
                  <BiCheck size="25" />
                  {status === "new" ? "Mark complete" : "completed"}
                </Flex>
              </ButtonStyled>
              <h3>{title}</h3>
              <p>{description}</p>
            </Flex>
            <Flex direction="column" width="20%">
              <div>
                <b>Assigned to</b>
                <Flex align="center" margin="10px 0 20px 0">
                  <ImageContainer
                    image={
                      users
                        ? users.find(({ id }) => id === assignedTo).image
                        : []
                    }
                    width="30px"
                    height="30px"
                    margin="0 10px 0 0"
                  />
                  <Fullname
                    onClick={() =>
                      router.push(
                        `/employees/${
                          users
                            ? users.find(({ id }) => id === assignedTo).id
                            : []
                        }`
                      )
                    }
                  >
                    {users
                      ? users.find(({ id }) => id === assignedTo).name
                      : []}{" "}
                    {users
                      ? users.find(({ id }) => id === assignedTo).surname
                      : []}
                  </Fullname>
                </Flex>
              </div>
              <div>
                <b>Starts on</b>
                <p>{starts}</p>
              </div>
              <div>
                <b>Ends on</b>
                <p>{end}</p>
              </div>
              <div>
                <b>Created by</b>
                <Flex align="center" margin="10px 0 20px 0">
                  <ImageContainer
                    image={
                      users
                        ? users.find(({ id }) => id === createdBy).image
                        : []
                    }
                    width="30px"
                    height="30px"
                    margin="0 10px 0 0"
                  />
                  <Fullname
                    onClick={() =>
                      router.push(
                        `/employees/${
                          users
                            ? users.find(({ id }) => id === createdBy).id
                            : []
                        }`
                      )
                    }
                  >
                    {users ? users.find(({ id }) => id === createdBy).name : []}{" "}
                    {users
                      ? users.find(({ id }) => id === createdBy).surname
                      : []}
                  </Fullname>
                </Flex>
              </div>
            </Flex>
          </Flex>
        </TaskInfo>
      )}
      {askToRemove && (
        <RemoveUserModal
          yes={() => {
            removeTask();
            setAskToRemove(false);
          }}
          no={() => {
            setAskToRemove(false);
          }}
          question="Remove this task?"
        />
      )}
    </>
  );
};
