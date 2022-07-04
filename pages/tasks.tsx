import {useContext, useEffect, useState } from "react";
import moment from "moment";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { usersState } from "state/atoms";
import { SnackbarContext } from "providers/useSnackbar";
import { FaPlus } from "react-icons/fa";
import MainLayout from "layouts/MainLayout";
import {
  UserTitle,
  UserWindow,
} from "styled-components/UserForm";
import { Flex } from "styled-components/Flex";
import { Button } from "components/Button";
import { ByMeTab } from "containers/tasks/ByMeTab";
import { ToMeTab } from "containers/tasks/ToMeTab";
import { CompletedTab } from "containers/tasks/CompletedTab";
import { FutureTab } from "containers/tasks/FutureTab";
import { CreateTask } from "containers/tasks/CreateTask";

const Tasks = () => {
  const setUsersToRecoil = useSetRecoilState(usersState);
  const users = useRecoilValue(usersState);
  const [user, setUser] = useState(null);
  const [createTask, setCreateTask] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [tabContent, setTabContent] = useState("byMe");
  const [taskId, setTaskId] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskAssignedTo, setTaskAssignedTo] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStarts, setTaskStarts] = useState("");
  const [taskEnds, setTaskEnds] = useState("");
  const snackBar = useContext(SnackbarContext);

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
          ...user.tasks,
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
    snackBar.openSnackBar({
      message: "Task added successfully!",
      type: "success",
    });
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
    snackBar.openSnackBar({
      message: "Task's status changed!",
      type: "success",
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
        tasks: user.tasks.reduce((acc, cur) => {
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
    snackBar.openSnackBar({ message: "Task removed!", type: "error" });
  };

  const setTaskInfoToEdit = ({
    id,
    assignedTo,
    starts,
    end,
    title,
    description,
  }) => {
    setTaskId(id);
    setTaskTitle(title);
    setTaskAssignedTo(assignedTo);
    setTaskDescription(description);
    setTaskStarts(starts);
    setTaskEnds(end);
  };

  const editTaskInfo = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const assignedTo = users
      ? users.find(({ id }) => id === taskAssignedTo)
      : [{ tasks: [] }];
    await fetch(`http://localhost:4200/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tasks: user?.tasks.reduce((acc, cur) => {
          if (cur.id === taskId) {
            acc.push({
              id: cur.id,
              assignedTo: taskAssignedTo,
              createdBy: cur.createdBy,
              starts: taskStarts,
              end: taskEnds,
              title: taskTitle,
              description: taskDescription,
              status: cur.status,
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
          if (cur.id === taskId) {
            acc.push({
              id: cur.id,
              assignedTo: taskAssignedTo,
              createdBy: cur.createdBy,
              starts: taskStarts,
              end: taskEnds,
              title: taskTitle,
              description: taskDescription,
              status: cur.status,
            });
          } else {
            acc.push(cur);
          }
          return acc;
        }, []),
      }),
    });
    setTaskId("");
    setTaskTitle("");
    setTaskAssignedTo("");
    setTaskDescription("");
    setTaskStarts(moment().format("YYYY-MM-DD"));
    setTaskEnds(moment().format("YYYY-MM-DD"));
    snackBar.openSnackBar({
      message: "Task edited successfully!",
      type: "success",
    });
  };

  return (
    <MainLayout>
      <UserWindow>
        <Flex justify="space-between" align="center" padding="0 10px 0 0">
          <UserTitle size="40px" margin="0 60px 0 0">
            Tasks
          </UserTitle>
          <Button
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
          </Button>
        </Flex>
        <Flex width="100%">
          <Button
            width="25%"
            height="40px"
            margin="10px"
            background={tabContent === "byMe" && "#9C9C9C"}
            onClick={() => {
              setTabContent("byMe");
            }}
          >
            <b>Created by me</b>
          </Button>
          <Button
            width="25%"
            height="40px"
            margin="10px"
            background={tabContent === "toMe" && "#9C9C9C"}
            onClick={() => {
              setTabContent("toMe");
            }}
          >
            <b>Assigned to me</b>
          </Button>
          <Button
            width="25%"
            height="40px"
            margin="10px"
            background={tabContent === "completed" && "#9C9C9C"}
            onClick={() => {
              setTabContent("completed");
            }}
          >
            <b>Completed</b>
          </Button>
          <Button
            width="25%"
            height="40px"
            margin="10px"
            background={tabContent === "future" && "#9C9C9C"}
            onClick={() => {
              setTabContent("future");
            }}
          >
            <b>Future</b>
          </Button>
        </Flex>
        <Flex>
          {tabContent === "byMe" && (
            <ByMeTab
              user={user}
              users={users}
              changeTaskStatus={changeTaskStatus}
              removeTask={removeTask}
              setTaskInfoToEdit={setTaskInfoToEdit}
              isEditable={isEditable}
              setIsEditable={setIsEditable}
              editTaskInfo={editTaskInfo}
              taskTitle={taskTitle}
              setTaskTitle={setTaskTitle}
              taskAssignedTo={taskAssignedTo}
              setTaskAssignedTo={setTaskAssignedTo}
              taskDescription={taskDescription}
              setTaskDescription={setTaskDescription}
              taskStarts={taskStarts}
              setTaskStarts={setTaskStarts}
              taskEnds={taskEnds}
              setTaskEnds={setTaskEnds}
            />
          )}
          {tabContent === "toMe" && (
            <ToMeTab
              user={user}
              users={users}
              changeTaskStatus={changeTaskStatus}
            />
          )}
          {tabContent === "completed" && (
            <CompletedTab
              user={user}
              users={users}
              changeTaskStatus={changeTaskStatus}
            />
          )}
          {tabContent === "future" && <FutureTab />}
        </Flex>
        {createTask && (
          <CreateTask
            users={users}
            taskTitle={taskTitle}
            setTaskTitle={setTaskTitle}
            taskAssignedTo={taskAssignedTo}
            setTaskAssignedTo={setTaskAssignedTo}
            taskDescription={taskDescription}
            setTaskDescription={setTaskDescription}
            taskStarts={taskStarts}
            setTaskStarts={setTaskStarts}
            taskEnds={taskEnds}
            setTaskEnds={setTaskEnds}
            setCreateTask={setCreateTask}
            updateEmployeeTasks={updateEmployeeTasks}
          />
        )}
      </UserWindow>
    </MainLayout>
  );
};
export default Tasks;
