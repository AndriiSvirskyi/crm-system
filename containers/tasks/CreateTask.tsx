import { Button } from "Components/Button";
import { Editor } from "Components/Editor";
import { Input } from "Components/Inputs/Input";
import Modal from "Components/Modal";
import { Flex } from "styled-components/Flex";
import { Form } from "styled-components/Form";
import { Label } from "styled-components/Label";
import DatePicker from "Components/DatePicker";
import "react-datepicker/dist/react-datepicker.css";
import { SnackbarContext } from "providers/useSnackbar";
import { useContext } from "react";
import FileView from "Components/FileView";

export const CreateTask = ({
  users,
  taskTitle,
  setTaskTitle,
  taskAssignedTo,
  setTaskAssignedTo,
  taskDescription,
  setTaskDescription,
  taskStarts,
  taskEnds,
  setDateRange,
  setCreateTask,
  updateEmployeeTasks,
  files,
  setFiles,
}) => {
  const snackBar = useContext(SnackbarContext);

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (taskTitle && taskAssignedTo && taskStarts && taskEnds) {
      updateEmployeeTasks(e);
      setCreateTask(false);
    } else {
      snackBar.openSnackBar({
        message: "Please fill all required fields",
        type: "error",
      });
    }
  };

  return (
    <Modal close={() => setCreateTask(false)}>
      <Form submit={onSubmit} content='New Task'>
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
          id='t1'
          setDescription={setTaskDescription}
          description={taskDescription}
          files={files}
          setFiles={setFiles}
        />
        <Flex direction='column' width='100%' justify='flex-start'>
          {files &&
            files.map((file) => (
              <FileView key={file.name} file={file} files={files} setFiles={setFiles} editable={true} />
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
            <b>Save</b>
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};
