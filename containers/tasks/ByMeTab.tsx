import { Button } from "components/Button";
import { Input } from "components/Inputs/Input";
import Modal from "components/Modal";
import { Flex } from "styled-components/Flex";
import { Form } from "styled-components/Form";
import { Label } from "styled-components/Label";
import { UserBlockItem } from "styled-components/UserForm";
import { Task } from "./Task";
import { Textarea } from "components/Textarea";

export const ByMeTab = ({
  user,
  users,
  changeTaskStatus,
  removeTask,
  setTaskInfoToEdit,
  isEditable,
  setIsEditable,
  editTaskInfo,
  taskTitle,
  setTaskTitle,
  taskAssignedTo,
  setTaskAssignedTo,
  taskDescription,
  setTaskDescription,
  taskStarts,
  setTaskStarts,
  taskEnds,
  setTaskEnds,
}) => {
  return (
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
                    user={user}
                    assignedTo={assignedTo}
                    starts={starts}
                    end={end}
                    title={title}
                    description={description}
                    status={status}
                    users={users}
                    isCreatedByMe={true}
                    changeStatus={() => {
                      changeTaskStatus(id, assignedTo);
                    }}
                    removeTask={() => {
                      removeTask(id, assignedTo);
                    }}
                    setTaskInfoToEdit={() => {
                      setTaskInfoToEdit({
                        id,
                        assignedTo,
                        starts,
                        end,
                        title,
                        description,
                      });
                    }}
                    setIsEditable={setIsEditable}
                  />
                  {isEditable && (
                    <Modal
                      close={() => {
                        setIsEditable(false);
                      }}
                    >
                      <Form
                        submit={(e) => {
                          editTaskInfo(e);
                          setIsEditable(false);
                        }}
                        content="Edit task"
                      >
                        <Input
                          value={taskTitle}
                          onChange={(e) => {
                            setTaskTitle(e.target.value);
                          }}
                          width="100%"
                          height="40px"
                          outline="1px solid black"
                          background="none"
                          margin="0 0 10px 0"
                        />
                        <Input
                          list="people"
                          value={taskAssignedTo}
                          onChange={(e) => setTaskAssignedTo(e.target.value)}
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
                          value={taskDescription}
                          onChange={(e) => setTaskDescription(e.target.value)}
                        />
                        <Flex direction="column" width="100%">
                          <Flex margin="0 0 10px 0">
                            <Label width="70px" htmlFor="from">
                              Starts on:
                            </Label>
                            <Input
                              value={taskStarts}
                              onChange={(e) => setTaskStarts(e.target.value)}
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
                            <Input
                              value={taskEnds}
                              onChange={(e) => setTaskEnds(e.target.value)}
                              id="to"
                              type="date"
                              width="100%"
                              height="40px"
                              outline="1px solid black"
                              background="none"
                            />
                          </Flex>
                          <Button
                            height="35px"
                            padding="10px"
                            color="#FFFFFF"
                            background="#ff9f69"
                            hoverBack="#ff9f69CC"
                          >
                            <b>Save changes</b>
                          </Button>
                        </Flex>
                      </Form>
                    </Modal>
                  )}
                </div>
              );
            }
          )}
    </UserBlockItem>
  );
};
