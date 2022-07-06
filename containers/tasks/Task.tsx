/* eslint-disable react/no-danger-with-children */
import router from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { BiCalendar, BiCheck } from "react-icons/bi";
import { Button } from "../../Components/Button";
import { Flex } from "styled-components/Flex";
import { HiDotsVertical } from "react-icons/hi";
import { Options } from "../../Components/Options";
import { RemoveModal } from "containers/profile/RemoveModal";
import { ImageContainer } from "styled-components/ImageContainer";
import parse from "html-react-parser";
import FileView from "Components/FileView";

const TaskContainer = styled.div`
  width: 100%;
  min-height: 45px;
  box-sizing: border-box;
  cursor: pointer;
  box-shadow: 0px 0.3px 4px -2px #000000;
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
  box-shadow: 0px 0.3px 4px -2px #000000;
  border-radius: 8px;
  margin: 0 0 10px 0;
  padding: 10px;
  .description {
    img {
      cursor: pointer;
      display: block;
      width: 200px;
      &:hover {
        opacity: 0.8;
      }
    }
    img + img {
      margin-top: 10px;
    }
  }
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
  display: flex;
  justify-content: flex-end;
`;

const StyledModal = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 2;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  img {
    display: block;
    margin: auto auto;
    width: 60vw;
    height: 90vh;
    object-fit: contain;
  }
  button {
    position: fixed;
    right: 50px;
    top: 50px;
    color: white;
    font-size: 42px;
    background: none;
    border: none;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
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
  files: Array<{ name: string; src: string; type: string }>;
  setFiles: Dispatch<SetStateAction<[]>>;
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
  files,
  setFiles,
}: TaskProps) => {
  const [showTask, setShowTask] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [askToRemove, setAskToRemove] = useState(false);
  const [open, setOpen] = useState(false);
  const [imgOpen, setImgOpen] = useState(null);

  const assignedToUser: UserProps | [] = users
    ? users.find(({ id }) => id === assignedTo)
    : { id: "", image: "", name: "", surname: "" };

  document.querySelectorAll<HTMLImageElement>(".description p img").forEach(
    (node) =>
      (node.onclick = () => {
        setOpen(true);
        setImgOpen(node.src);
      }),
  );

  const renderDescription = () => {
    if (description && files) {
      return (
        <>
          {parse(description)}{" "}
          {files.map((file) => (
            <FileView key={file.name} file={file} files={files} setFiles={setFiles} editable={false} />
          ))}
        </>
      );
    } else if (description) {
      return parse(description);
    } else if (files) {
      return files.map((file) => (
        <FileView key={file.name} file={file} files={files} setFiles={setFiles} editable={false} />
      ));
    } else return "This task has no description";
  };

  return (
    <>
      <StyledModal open={open}>
        <button onClick={() => setOpen(false)}>x</button>
        <img src={imgOpen} />
      </StyledModal>
      <TaskContainer
        onClick={() => {
          setShowTask(!showTask);
        }}
      >
        <Flex align='center'>
          <Flex width='100%' justify='space-between'>
            <Title line={status === "completed" && "line-through"}>{title}</Title>
            <Flex width='200' align='center'>
              <Flex width='105px' justify='space-between'>
                <BiCalendar /> {end}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </TaskContainer>
      {showTask && (
        <TaskInfo>
          <Flex justify='space-between' padding='10px'>
            <Flex direction='column' width='70%'>
              <Button
                margin='0 0 10px 0'
                width='130px'
                height='35px'
                radius='4px'
                shadow='0px 0.3px 1.5px 0px grey'
                background={status === "new" ? "#fff" : "#b5f7a2"}
                hoverBack={status === "new" ? "#f5f5f5" : "#b5f7a2"}
                onClick={changeStatus}
              >
                <Flex width='100%' align='center' justify='space-beetween'>
                  <BiCheck size='25' />
                  {status === "new" ? "Mark complete" : "Completed"}
                </Flex>
              </Button>

              <h3>{title}</h3>
              <div className='description'>{renderDescription()}</div>
            </Flex>
            <Flex direction='column' width='140px'>
              {isCreatedByMe && (
                <OptionsContainer onMouseLeave={() => setShowOptions(false)}>
                  <Button
                    margin='0 0 20px 0'
                    flex='flex'
                    height='35px'
                    width='30px'
                    radius='4px'
                    shadow='0px 0.3px 1.5px 0px grey'
                    background='none'
                    hoverBack='#f5f5f5'
                    padding='0px 4px 0 4px'
                    onClick={() => {
                      setShowOptions(true);
                    }}
                  >
                    <HiDotsVertical size='25' fill='grey' />
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
              <div>
                <b>Assigned to</b>
                <Flex align='center' margin='10px 0 20px 0'>
                  <ImageContainer image={assignedToUser.image} width='30px' height='30px' margin='0 10px 0 0' />
                  <Fullname onClick={() => router.push(`/employees/${assignedToUser.id}`)}>
                    {assignedToUser.name}
                    <br />
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
                <Flex align='center' margin='10px 0 20px 0'>
                  <ImageContainer image={user.image} width='30px' height='30px' margin='0 10px 0 0' />
                  <Fullname onClick={() => router.push(`/employees/${user.id}`)}>
                    {user.name}
                    <br />
                    {user.surname}
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
          question='Remove this task?'
        />
      )}
    </>
  );
};
