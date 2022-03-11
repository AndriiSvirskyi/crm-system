import router from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { BiCalendar, BiCheck } from "react-icons/bi";
import { Button } from "../../components/Button";
import { Flex } from "styled-components/Flex";
import { HiDotsHorizontal } from "react-icons/hi";
import { Options } from "../../components/Options";
import { RemoveModal } from "containers/profile/RemoveModal";
import { ImageContainer } from "styled-components/ImageContainer";

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
  text-decoration: ${(props: { line?: string }) => props.line || ""};
`;
const OptionsContainer = styled.div`
  position: relative;
`;

type UserProps = { id: string; image: string; name: string; surname: string };

type TaskProps = {
  assignedTo: string;
  starts: string;
  end: string;
  title: string;
  description: string;
  status: string;
  users: [UserProps];
  changeStatus: () => void;
  removeTask?: () => void;
  setTaskInfoToEdit?: () => void;
  isCreatedByMe?: boolean;
  setIsEditable?: any;
  user: UserProps;
};

export const Task = ({
  assignedTo,
  starts,
  end,
  title,
  description,
  status,
  users,
  changeStatus,
  removeTask,
  isCreatedByMe,
  setIsEditable,
  setTaskInfoToEdit,
  user,
}: TaskProps) => {
  const [showTask, setShowTask] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [askToRemove, setAskToRemove] = useState(false);
  const assignedToUser: UserProps | [] = users
    ? users.find(({ id }) => id === assignedTo)
    : { id: "", image: "", name: "", surname: "" };
  return (
    <>
      <TaskContainer>
        <Flex align="center">
          <Flex
            width="100%"
            justify="space-between"
            onClick={() => {
              setShowTask(!showTask);
            }}
          >
            <Title line={status === "completed" && "line-through"}>
              {title}
            </Title>
            <Flex width="200" align="center">
              <Flex width="105px" justify="space-between">
                <BiCalendar /> {end}
              </Flex>
            </Flex>
          </Flex>
          {isCreatedByMe && (
            <OptionsContainer>
              <Button
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
              </Button>
              {showOptions && (
                <Options
                  editTask={() => {
                    setIsEditable(true);
                    setShowOptions(false);
                    setTaskInfoToEdit();
                  }}
                  askToRemove={() => {
                    setAskToRemove(true);
                    setShowOptions(false);
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
              <Button
                width="130px"
                background={status === "new" ? "#fffcd0" : "#b5f7a2"}
                hoverBack={status === "new" ? "#fffcd0" : "#b5f7a2"}
                onClick={changeStatus}
              >
                <Flex width="100%" align="center" justify="space-evenly">
                  <BiCheck size="25" />
                  {status === "new" ? "mark complete" : "completed"}
                </Flex>
              </Button>
              <h3>{title}</h3>
              <p>{description}</p>
            </Flex>
            <Flex direction="column" width="20%">
              <div>
                <b>Assigned to</b>
                <Flex align="center" margin="10px 0 20px 0">
                  <ImageContainer
                    image={assignedToUser.image}
                    width="30px"
                    height="30px"
                    margin="0 10px 0 0"
                  />
                  <Fullname
                    onClick={() =>
                      router.push(`/employees/${assignedToUser.id}`)
                    }
                  >
                    {assignedToUser.name}
                    {assignedToUser.surname}
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
                    image={user.image}
                    width="30px"
                    height="30px"
                    margin="0 10px 0 0"
                  />
                  <Fullname
                    onClick={() => router.push(`/employees/${user.id}`)}
                  >
                    {user.name} {user.surname}
                  </Fullname>
                </Flex>
              </div>
            </Flex>
          </Flex>
        </TaskInfo>
      )}
      {askToRemove && (
        <RemoveModal
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
