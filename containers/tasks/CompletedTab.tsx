import { UserBlockItem } from "styled-components/UserForm";
import { Task } from "./Task";

export const CompletedTab = ({ user, users, changeTaskStatus }) => {
  return (
    <UserBlockItem>
      {user.tasks
        .filter(({ status }) => status === "completed")
        .map(({ id, title, end, description, starts, status, assignedTo }) => {
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
              changeStatus={() => changeTaskStatus(id, assignedTo)}
            />
          );
        })}
    </UserBlockItem>
  );
};
