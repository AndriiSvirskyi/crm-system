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
import { Input } from "components/Input";
import { Task } from "components/Task";

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

const Tasks = () => {
  const setUsersToRecoil = useSetRecoilState(usersState);
  const users = useRecoilValue(usersState);
  const [user, setUser] = useState(null);
  const [createTask, setCreateTask] = useState(false);
  const [tabContent, setTabContent] = useState("byMe");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskAssignedTo, setTaskAssignedTo] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStarts, setTaskStarts] = useState("");
  const [taskEnds, setTaskEnds] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState("");
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

  const uid = () =>
    Date.now().toString(36) + Math.random().toString(36).substring(2);

  const updateEmployeeTasks = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const randomId = uid();
    const assignedTo = users
      ? users.find(
          ({ name, surname }) => `${name} ${surname}` === taskAssignedTo
        )
      : [{ tasks: [] }];

    await fetch(`http://localhost:4200/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tasks: [
          ...user?.tasks,
          {
            id: randomId,
            assignedTo: assignedTo.id,
            createdBy: user.id,
            starts: taskStarts,
            end: taskEnds,
            title: taskTitle,
            description: taskDescription,
            status: "new",
          },
        ],
      }),
    });

    await fetch(`http://localhost:4200/users/${assignedTo?.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tasks: [
          ...assignedTo?.tasks,
          {
            id: randomId,
            assignedTo: assignedTo.id,
            createdBy: user.id,
            starts: taskStarts,
            end: taskEnds,
            title: taskTitle,
            description: taskDescription,
            status: "new",
          },
        ],
      }),
    });

    setTaskTitle("");
    setTaskAssignedTo("");
    setTaskDescription("");
    setTaskStarts(moment().format("YYYY-MM-DD"));
    setTaskEnds(moment().format("YYYY-MM-DD"));
  };

  const changeTaskStatus = async (id, taskAssignedTo) => {
    const assignedTo = users
      ? users.find(({ id }) => id === taskAssignedTo)
      : [{ tasks: [] }];

    await fetch(`http://localhost:4200/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tasks: user?.tasks.reduce((acc, cur) => {
          if (cur.id === id) {
            acc.push({
              id: cur.id,
              assignedTo: cur.assignedTo,
              createdBy: cur.createdBy,
              starts: cur.starts,
              end: cur.end,
              title: cur.title,
              description: cur.description,
              status: "completed",
            });
          } else {
            acc.push(cur);
          }
          return acc;
        }, []),
      }),
    });

    await fetch(`http://localhost:4200/users/${assignedTo?.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tasks: assignedTo?.tasks.reduce((acc, cur) => {
          if (cur.id === id) {
            acc.push({
              id: cur.id,
              assignedTo: cur.assignedTo,
              createdBy: cur.createdBy,
              starts: cur.starts,
              end: cur.end,
              title: cur.title,
              description: cur.description,
              status: "completed",
            });
          } else {
            acc.push(cur);
          }
          return acc;
        }, []),
      }),
    });
  };
  const removeTask = async (taskId, taskAssignedTo) => {
    const assignedTo = users
      ? users.find(({ id }) => id === taskAssignedTo)
      : [{ tasks: [] }];

    await fetch(`http://localhost:4200/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tasks: user?.tasks.reduce((acc, cur) => {
          if (cur.id !== taskId) {
            acc.push(cur);
          }
          return acc;
        }, []),
      }),
    });

    await fetch(`http://localhost:4200/users/${assignedTo?.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tasks: assignedTo?.tasks.reduce((acc, cur) => {
          if (cur.id !== taskId) {
            acc.push(cur);
          }
          return acc;
        }, []),
      }),
    });
  };
  const editTask = (e) => {
    e.preventDefault()
    console.log("edited");
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
            background={tabContent === "byMe" && "#9C9C9C"}
            onClick={() => {
              setTabContent("byMe");
            }}
          >
            <b>Created by me</b>
          </ButtonStyled>
          <ButtonStyled
            width="25%"
            height="40px"
            margin="10px"
            background={tabContent === "toMe" && "#9C9C9C"}
            onClick={() => {
              setTabContent("toMe");
            }}
          >
            <b>Assigned to me</b>
          </ButtonStyled>
          <ButtonStyled
            width="25%"
            height="40px"
            margin="10px"
            background={tabContent === "completed" && "#9C9C9C"}
            onClick={() => {
              setTabContent("completed");
            }}
          >
            <b>Completed</b>
          </ButtonStyled>
          <ButtonStyled
            width="25%"
            height="40px"
            margin="10px"
            background={tabContent === "future" && "#9C9C9C"}
            onClick={() => {
              setTabContent("future");
            }}
          >
            <b>Future</b>
          </ButtonStyled>
        </Flex>
        <Flex>
          {tabContent === "byMe" && (
            <UserBlockItem width="100%">
              {user &&
                user.tasks
                  .filter(({ createdBy }) => createdBy === user.id)
                  .map(
                    ({
                      id,
                      title,
                      end,
                      description,
                      starts,
                      status,
                      createdBy,
                      assignedTo,
                    }) => {
                      return (
                        <div key={id}>
                          <Task
                            title={title}
                            end={end}
                            starts={starts}
                            status={status}
                            description={description}
                            createdBy={createdBy}
                            assignedTo={assignedTo}
                            users={users}
                            isCreatedByMe={true}
                            changeStatus={() => {
                              changeTaskStatus(id, assignedTo);
                            }}
                            removeTask={() => {
                              removeTask(id, assignedTo);
                            }}
                            editTask={() => {
                              setIsEditable(true);
                              setTaskToEdit(id);
                            }}
                          />
                          {isEditable && (
                            <Modal
                              close={() => {
                                setIsEditable(false);
                              }}
                            >
                              <Form
                                submit={(e) => {
                                  editTask(e);
                                }}
                                content="Edit task"
                              >
                                <InputComponent
                                  value={title}
                                  onChange={(e: {
                                    target: { value: SetStateAction<string> };
                                  }) => setTaskTitle(e.target.value)}
                                  width="100%"
                                  height="40px"
                                  outline="1px solid black"
                                  background="none"
                                  margin="0 0 10px 0"
                                />
                                <InputComponent
                                  list="people"
                                  value={
                                    users
                                      ? users.find(
                                          ({ id }) => id === assignedTo
                                        ).surname
                                      : []
                                  }
                                  onChange={(e: {
                                    target: { value: SetStateAction<string> };
                                  }) => setTaskAssignedTo(e.target.value)}
                                  width="100%"
                                  height="40px"
                                  outline="1px solid black"
                                  background="none"
                                  margin="0 0 10px 0"
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
                                  value={description}
                                  onChange={(e: {
                                    target: { value: SetStateAction<string> };
                                  }) => setTaskDescription(e.target.value)}
                                />
                                <Flex direction="column" width="100%">
                                  <Flex margin="0 0 10px 0">
                                    <Label width="70px" htmlFor="from">
                                      Starts on:
                                    </Label>
                                    <InputComponent
                                      value={starts}
                                      onChange={(e: {
                                        target: {
                                          value: SetStateAction<string>;
                                        };
                                      }) => setTaskStarts(e.target.value)}
                                      id="from"
                                      type="date"
                                      width="100%"
                                      height="40px"
                                      outline="1px solid black"
                                      background="none"
                                    />
                                  </Flex>
                                  <Flex margin="0 0 30px 0">
                                    <Label width="70px" htmlFor="to">
                                      Ends on:
                                    </Label>
                                    <InputComponent
                                      value={end}
                                      onChange={(e: {
                                        target: {
                                          value: SetStateAction<string>;
                                        };
                                      }) => setTaskEnds(e.target.value)}
                                      id="to"
                                      type="date"
                                      width="100%"
                                      height="40px"
                                      outline="1px solid black"
                                      background="none"
                                    />
                                  </Flex>
                                  <ButtonStyled
                                    height="35px"
                                    padding="10px"
                                    color="#FFFFFF"
                                    background="#ff9f69"
                                    hoverBack="#ff9f69CC"
                                  >
                                    <b>Save changes</b>
                                  </ButtonStyled>
                                </Flex>
                              </Form>
                            </Modal>
                          )}
                        </div>
                      );
                    }
                  )}
            </UserBlockItem>
          )}
          {tabContent === "toMe" && (
            <UserBlockItem>
              {user &&
                user.tasks
                  .filter(({ assignedTo }) => assignedTo === user.id)
                  .map(
                    ({
                      id,
                      title,
                      end,
                      description,
                      starts,
                      status,
                      createdBy,
                      assignedTo,
                    }) => {
                      return (
                        <Task
                          key={id}
                          title={title}
                          end={end}
                          starts={starts}
                          status={status}
                          description={description}
                          createdBy={createdBy}
                          assignedTo={assignedTo}
                          users={users}
                          changeStatus={() => changeTaskStatus(id, assignedTo)}
                        />
                      );
                    }
                  )}
            </UserBlockItem>
          )}
          {tabContent === "completed" && (
            <UserBlockItem>
              {user.tasks
                .filter(({ status }) => status === "completed")
                .map(
                  ({
                    id,
                    title,
                    end,
                    description,
                    starts,
                    status,
                    createdBy,
                    assignedTo,
                  }) => {
                    return (
                      <Task
                        key={id}
                        completed={true}
                        title={title}
                        end={end}
                        starts={starts}
                        status={status}
                        description={description}
                        createdBy={createdBy}
                        assignedTo={assignedTo}
                        users={users}
                        changeStatus={() => changeTaskStatus(id, assignedTo)}
                      />
                    );
                  }
                )}
            </UserBlockItem>
          )}
          {tabContent === "future" && <UserBlockItem></UserBlockItem>}
        </Flex>
        {createTask && (
          <Modal close={() => setCreateTask(false)}>
            <Form
              submit={(e: { preventDefault: () => void }) =>
                updateEmployeeTasks(e)
              }
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
