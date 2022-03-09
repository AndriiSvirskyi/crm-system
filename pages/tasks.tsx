import MainLayout from "Layouts/MainLayout";
import { UserBlockItem, UserTitle, UserWindow } from "components/User/UserForm";
import { Flex } from "components/User/Flex";
import { ButtonStyled } from "components/ButtonStyled";
import { FaPlus } from "react-icons/fa";
import { SetStateAction, useEffect, useState } from "react";
import Modal from "components/Modal/Modal";
import { Form } from "components/form/Form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { usersState } from "state/atoms";
import { Label } from "components/User/personalTab/Label";
import styled from "styled-components";
import moment from "moment";
import { BiCalendar, BiCheck } from "react-icons/bi";
import { ImageContainer } from "components/ImageContainer";
import router, { Router } from "next/router";
import { Input } from "components/Input";

const Textarea = styled.textarea`
  resize: none;
  outline: none;
  width: calc(100% - 50px);
  height: 80px;
  border-radius: 8px;
  margin: 0 0 10px 0;
  padding: 10px 25px;
  border: 1px solid black;
`;
const Task = styled.div`
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
const Tasks = () => {
  const setUsersToRecoil = useSetRecoilState(usersState);
  const users = useRecoilValue(usersState);
  const [user, setUser] = useState(null);
  const [createTask, setCreateTask] = useState(false);
  const [byMe, setByMe] = useState(true);
  const [toMe, setToMe] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [future, setFuture] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskAssignedTo, setTaskAssignedTo] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStarts, setTaskStarts] = useState(moment().format("YYYY-MM-DD"));
  const [taskEnds, setTaskEnds] = useState(moment().format("YYYY-MM-DD"));
  const [showTask, setShowTask] = useState("");

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
    if (localStorage.user) {
      setUser(JSON.parse(localStorage.user));
    }
  }, []);

  const getTask = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await fetch(`http://localhost:4200/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: user.id,
        email: user.email,
        password: user.password,
        name: user.name,
        surname: user.surname,
        role: user.role,
        startDate: user.startDate,
        image: user.image,
        projects: [...user.projects],
        tasks: [
          ...user.tasks,
          {
            assignedTo: users
              ? users.find(
                  ({ name, surname }) => `${name} ${surname}` === taskAssignedTo
                ).id
              : [],
            createdBy: user.id,
            starts: taskStarts,
            end: taskEnds,
            title: taskTitle,
            description: taskDescription,
            status: "new",
          },
        ],
        superintendent: user.superintendent,
        company: user.company,
        position: user.position,
        typeOfWork: user.typeOfWork,
        department: user.department,
        unit: user.unit,
        amount: user.amount,
        team: user.team,
        birth: user.birth,
        gender: user.gender,
        mobile: user.mobile,
        username: user.username,
        address: user.address,
        links: {
          facebook: user.links.facebook,
          linkedin: user.links.linkedin,
          twitter: user.links.twitter,
        },
        timeoff: {
          type: {
            vacation: {
              days: user.timeoff.type.vacation.days,
            },
            paid: {
              days: user.timeoff.type.paid.days,
            },
            hospital: {
              days: user.timeoff.type.hospital.days,
            },
          },
          requests: [...user.timeoff.requests],
          history: [...user.timeoff.history],
        },
      }),
    });

    setTaskTitle("");
    setTaskAssignedTo("");
    setTaskDescription("");
    setTaskStarts(moment().format("YYYY-MM-DD"));
    setTaskEnds(moment().format("YYYY-MM-DD"));
  };

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
          {byMe && (
            <UserBlockItem>
              {user &&
                user.tasks
                  .filter(({ createdBy }) => createdBy === user.id)
                  .map(
                    (
                      {
                        title,
                        end,
                        description,
                        starts,
                        status,
                        createdBy,
                        assignedTo,
                      },
                      i
                    ) => {
                      return (
                        <div key={i}>
                          <Task onClick={() => setShowTask(title)}>
                            <Flex justify="space-between">
                              <h3>{title} </h3>
                              <Flex
                                width="105px"
                                align="center"
                                justify="space-between"
                              >
                                <BiCalendar /> {end}
                              </Flex>
                            </Flex>
                          </Task>
                          {showTask === title && (
                            <TaskInfo>
                              <Flex justify="space-between">
                                <ButtonStyled
                                  background="#fffcd0"
                                  hoverBack="#dfddc6"
                                >
                                  <Flex width="120px" align="center">
                                    <BiCheck size="25" />
                                    {status === "new"
                                      ? "Mark complete"
                                      : "completed"}
                                  </Flex>
                                </ButtonStyled>
                                <ButtonStyled
                                  padding="3px 7px"
                                  color="#FFFFFF"
                                  background="#ff9f69"
                                  hoverBack="#ff9f69CC"
                                  onClick={() => setShowTask("")}
                                >
                                  Close
                                </ButtonStyled>
                              </Flex>
                              <Flex justify="space-between">
                                <Flex direction="column">
                                  <h3>{title}</h3>
                                  <p>{description}</p>
                                </Flex>
                                <Flex direction="column">
                                  <div>
                                    <b>Assigned to</b>
                                    <Flex align="center" margin="10px 0 20px 0">
                                      <ImageContainer
                                        image={
                                          users
                                            ? users.find(
                                                ({ id }) => id === assignedTo
                                              ).image
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
                                                ? users.find(
                                                    ({ id }) =>
                                                      id === assignedTo
                                                  ).id
                                                : []
                                            }`
                                          )
                                        }
                                      >
                                        {users
                                          ? users.find(
                                              ({ id }) => id === assignedTo
                                            ).name
                                          : []}{" "}
                                        {users
                                          ? users.find(
                                              ({ id }) => id === assignedTo
                                            ).surname
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
                                            ? users.find(
                                                ({ id }) => id === createdBy
                                              ).image
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
                                                ? users.find(
                                                    ({ id }) => id === createdBy
                                                  ).id
                                                : []
                                            }`
                                          )
                                        }
                                      >
                                        {users
                                          ? users.find(
                                              ({ id }) => id === createdBy
                                            ).name
                                          : []}{" "}
                                        {users
                                          ? users.find(
                                              ({ id }) => id === createdBy
                                            ).surname
                                          : []}
                                      </Fullname>
                                    </Flex>
                                  </div>
                                </Flex>
                              </Flex>
                            </TaskInfo>
                          )}
                        </div>
                      );
                    }
                  )}
            </UserBlockItem>
          )}
          {toMe && (
            <UserBlockItem>
              {user &&
                user.tasks
                  .filter(({ assignedTo }) => assignedTo === user.id)
                  .map(
                    (
                      {
                        title,
                        end,
                        description,
                        starts,
                        status,
                        createdBy,
                        assignedTo,
                      },
                      i
                    ) => {
                      return (
                        <div key={i}>
                          <Task onClick={() => setShowTask(title)}>
                            <Flex justify="space-between">
                              <h3>{title} </h3>
                              <Flex
                                width="105px"
                                align="center"
                                justify="space-between"
                              >
                                <BiCalendar /> {end}
                              </Flex>
                            </Flex>
                          </Task>
                          {showTask === title && (
                            <TaskInfo>
                              <Flex justify="space-between">
                                <ButtonStyled
                                  background="#fffcd0"
                                  hoverBack="#dfddc6"
                                >
                                  <Flex width="120px" align="center">
                                    <BiCheck size="25" />
                                    {status === "new"
                                      ? "Mark complete"
                                      : "completed"}
                                  </Flex>
                                </ButtonStyled>
                                <ButtonStyled
                                  padding="3px 7px"
                                  color="#FFFFFF"
                                  background="#ff9f69"
                                  hoverBack="#ff9f69CC"
                                  onClick={() => setShowTask("")}
                                >
                                  Close
                                </ButtonStyled>
                              </Flex>
                              <Flex justify="space-between">
                                <Flex direction="column">
                                  <h3>{title}</h3>
                                  <p>{description}</p>
                                </Flex>
                                <Flex direction="column">
                                  <div>
                                    <b>Assigned to</b>
                                    <Flex align="center" margin="10px 0 20px 0">
                                      <ImageContainer
                                        image={
                                          users
                                            ? users.find(
                                                ({ id }) => id === assignedTo
                                              ).image
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
                                                ? users.find(
                                                    ({ id }) =>
                                                      id === assignedTo
                                                  ).id
                                                : []
                                            }`
                                          )
                                        }
                                      >
                                        {users
                                          ? users.find(
                                              ({ id }) => id === assignedTo
                                            ).name
                                          : []}{" "}
                                        {users
                                          ? users.find(
                                              ({ id }) => id === assignedTo
                                            ).surname
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
                                            ? users.find(
                                                ({ id }) => id === createdBy
                                              ).image
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
                                                ? users.find(
                                                    ({ id }) => id === createdBy
                                                  ).id
                                                : []
                                            }`
                                          )
                                        }
                                      >
                                        {users
                                          ? users.find(
                                              ({ id }) => id === createdBy
                                            ).name
                                          : []}{" "}
                                        {users
                                          ? users.find(
                                              ({ id }) => id === createdBy
                                            ).surname
                                          : []}
                                      </Fullname>
                                    </Flex>
                                  </div>
                                </Flex>
                              </Flex>
                            </TaskInfo>
                          )}
                        </div>
                      );
                    }
                  )}
            </UserBlockItem>
          )}
          {completed && (
            <UserBlockItem>
              {user.tasks
                .filter(({ status }) => status === "completed")
                .map(
                  (
                    {
                      title,
                      end,
                      description,
                      starts,
                      status,
                      createdBy,
                      assignedTo,
                    },
                    i
                  ) => {
                    return (
                      <>
                        <Task key={i} onClick={() => setShowTask(title)}>
                          <Flex justify="space-between">
                            <h3>{title} </h3>
                            <Flex
                              width="105px"
                              align="center"
                              justify="space-between"
                            >
                              <BiCalendar /> {end}
                            </Flex>
                          </Flex>
                        </Task>
                        {showTask === title && (
                          <TaskInfo>
                            <Flex justify="space-between">
                              <ButtonStyled>{status}</ButtonStyled>
                              <ButtonStyled
                                padding="3px 7px"
                                color="#FFFFFF"
                                background="#ff9f69"
                                hoverBack="#ff9f69CC"
                                onClick={() => setShowTask("")}
                              >
                                Close
                              </ButtonStyled>
                            </Flex>
                            <Flex justify="space-between">
                              <Flex direction="column">
                                <h3>{title}</h3>
                                <p>{description}</p>
                              </Flex>
                              <Flex direction="column">
                                <div>
                                  <b>Assigned to</b>
                                  <Flex align="center" margin="10px 0 20px 0">
                                    <ImageContainer
                                      image={
                                        users
                                          ? users.find(
                                              ({ id }) => id === assignedTo
                                            ).image
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
                                              ? users.find(
                                                  ({ id }) => id === assignedTo
                                                ).id
                                              : []
                                          }`
                                        )
                                      }
                                    >
                                      {users
                                        ? users.find(
                                            ({ id }) => id === assignedTo
                                          ).name
                                        : []}{" "}
                                      {users
                                        ? users.find(
                                            ({ id }) => id === assignedTo
                                          ).surname
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
                                          ? users.find(
                                              ({ id }) => id === createdBy
                                            ).image
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
                                              ? users.find(
                                                  ({ id }) => id === createdBy
                                                ).id
                                              : []
                                          }`
                                        )
                                      }
                                    >
                                      {users
                                        ? users.find(
                                            ({ id }) => id === createdBy
                                          ).name
                                        : []}{" "}
                                      {users
                                        ? users.find(
                                            ({ id }) => id === createdBy
                                          ).surname
                                        : []}
                                    </Fullname>
                                  </Flex>
                                </div>
                              </Flex>
                            </Flex>
                          </TaskInfo>
                        )}
                      </>
                    );
                  }
                )}
            </UserBlockItem>
          )}
          {future && <UserBlockItem>Future</UserBlockItem>}
        </Flex>
        {createTask && (
          <Modal close={() => setCreateTask(false)}>
            <Form
              submit={(e: { preventDefault: () => void }) => getTask(e)}
              content="New task"
            >
              <Input
                value={taskTitle}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setTaskTitle(e.target.value)
                }
                placeholder="Title"
                width="100%"
                height="40px"
                outline="1px solid black"
                background="none"
                margin="0 0 10px 0"
                required
              />
              <Input
                list="people"
                value={taskAssignedTo}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setTaskAssignedTo(e.target.value)
                }
                placeholder="Assigned to"
                width="100%"
                height="40px"
                outline="1px solid black"
                background="none"
                margin="0 0 10px 0"
                required
              />
              <datalist id="people">
                {users.map(({ name, surname, id }) => {
                  return (
                    <option key={id}>
                      {name} {surname}
                    </option>
                  );
                })}
              </datalist>
              <Textarea
                placeholder="Description"
                value={taskDescription}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setTaskDescription(e.target.value)
                }
              />
              <Flex direction="column" width="100%">
                <Flex margin="0 0 10px 0">
                  <Label width="70px" htmlFor="from">
                    Starts on:
                  </Label>
                  <Input
                    value={taskStarts}
                    onChange={(e: {
                      target: { value: SetStateAction<string> };
                    }) => setTaskStarts(e.target.value)}
                    id="from"
                    type="date"
                    width="100%"
                    height="40px"
                    outline="1px solid black"
                    background="none"
                    required
                  />
                </Flex>
                <Flex margin="0 0 30px 0">
                  <Label width="70px" htmlFor="to">
                    Ends on:
                  </Label>
                  <Input
                    value={taskEnds}
                    onChange={(e: {
                      target: { value: SetStateAction<string> };
                    }) => setTaskEnds(e.target.value)}
                    id="to"
                    type="date"
                    width="100%"
                    height="40px"
                    outline="1px solid black"
                    background="none"
                    required
                  />
                </Flex>
                <ButtonStyled
                  height="35px"
                  padding="10px"
                  color="#FFFFFF"
                  background="#ff9f69"
                  hoverBack="#ff9f69CC"
                >
                  <b>Save</b>
                </ButtonStyled>
              </Flex>
            </Form>
          </Modal>
        )}
      </UserWindow>
    </MainLayout>
  );
};
export default Tasks;
