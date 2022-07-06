import { UserBlockItem } from "styled-components/UserForm";
import { Task } from "./Task";

export const ToMeTab = ({ user, users, changeTaskStatus, setTaskFiles }) => {
  return (
    <UserBlockItem>
      {user &&
        user.tasks
          .filter(({ assignedTo }) => assignedTo === user.id)
          .map(({ id, title, end, description, starts, status, assignedTo, files }) => {
            return (
              <Task
                user={user}
                key={id}
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
