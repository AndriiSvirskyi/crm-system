import { Button } from "Components/Button";
import { Input } from "Components/Inputs/Input";
import Modal from "Components/Modal";
import { Flex } from "styled-components/Flex";
import { Form } from "styled-components/Form";
import { Label } from "styled-components/Label";
import { UserBlockItem } from "styled-components/UserForm";
import { Task } from "./Task";
import DatePicker from "Components/DatePicker";
import Editor from "Components/Editor";
import "react-quill/dist/quill.snow.css";
import FileView from "Components/FileView";

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
  taskEnds,
  setDateRange,
  taskFiles,
  setTaskFiles,
}) => {
  const onSubmit = (e) => {
    editTaskInfo(e);
    setIsEditable(false);
  };
  return (
    <UserBlockItem width='100%'>
      {user &&
        user.tasks
          .filter(({ createdBy }) => createdBy === user.id)
          .map(({ id, title, end, description, starts, status, assignedTo, files }) => {
            return (
              <div key={id}>
                <Task
                  user={user}
                  assignedTo={assignedTo}
                  starts={starts}
                  end={end}
                  title={title}
                  description={description}
                  files={files}
                  setFiles={setTaskFiles}
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
                      files,
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
                    <Form submit={onSubmit} content='Edit Task'>
                      <Flex margin='0 0 10px 0' direction='column' width='100%'>
                        <Label htmlFor='title' required={true}>
                          Title
                        </Label>
                        <Input
                          id='title'
                          value={taskTitle}
                          onChange={(e) => setTaskTitle(e.target.value)}
                          width='100%'
                          height='40px'
                          outline='1px solid #d0d0d0'
                          background='none'
                          required
                        />
                      </Flex>
                      <Flex margin='0 0 10px 0' direction='column' width='100%'>
                        <Label htmlFor='assign' required={true}>
                          Assigned to
                        </Label>
                        <Input
                          id='assign'
                          list='people'
                          value={taskAssignedTo}
                          onChange={(e) => setTaskAssignedTo(e.target.value)}
                          width='100%'
                          height='40px'
                          outline='1px solid #d0d0d0'
                          background='none'
                          margin='0 0 10px 0'
                          required
                        />
                        <datalist id='people'>
                          {users.map(({ name, surname, id }) => {
                            return (
                              <option key={id}>
                                {name} {surname}
                              </option>
                            );
                          })}
                        </datalist>
                      </Flex>
                      <Editor
                        id={id}
                        setDescription={setTaskDescription}
                        description={taskDescription}
                        files={taskFiles}
                        setFiles={setTaskFiles}
                      />
                      <Flex direction='column' width='100%' justify='flex-start'>
                        {taskFiles &&
                          taskFiles.map((file) => (
                            <FileView
                              key={file.name}
                              file={file}
                              files={files}
                              setFiles={setTaskFiles}
                              editable={true}
                            />
                          ))}
                      </Flex>
                      <Flex direction='column' width='100%'>
                        <Label required={true}>Starts/Ends on:</Label>
                        <DatePicker startDate={taskStarts} endDate={taskEnds} setDateRange={setDateRange} />
                        <Button
                          width='fit-content'
                          height='35px'
                          padding='10px'
                          color='#FFFFFF'
                          background='#ff9f69'
                          hoverBack='#ff9f69CC'
                          margin='20px 0 0 '
                        >
                          <b>Save changes</b>
                        </Button>
                      </Flex>
                    </Form>
                  </Modal>
                )}
              </div>
            );
          })}
    </UserBlockItem>
  );
};
