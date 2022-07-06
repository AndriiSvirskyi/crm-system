import { UserBlockItem } from "styled-components/UserForm";
import { Task } from "./Task";

export const CompletedTab = ({ user, users, changeTaskStatus, setTaskFiles }) => {
  return (
    <UserBlockItem>
      {user.tasks
        .filter(({ status }) => status === "completed")
        .map(({ id, title, end, description, starts, status, assignedTo, files }) => {
          return (
            <Task
              key={id}
              user={user}
              title={title}
              end={end}
              starts={starts}
              status={status}
              description={description}
              assignedTo={assignedTo}
              users={users}
              files={files}
              setFiles={setTaskFiles}
              changeStatus={() => changeTaskStatus(id, assignedTo)}
            />
          );
        })}
    </UserBlockItem>
  );
};
