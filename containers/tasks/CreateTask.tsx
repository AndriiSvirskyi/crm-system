import { Button } from "components/Button";
import { Input } from "components/Input";
import Modal from "components/Modal";
import { Textarea } from "components/Textarea";
import { Flex } from "styled-components/Flex";
import { Form } from "styled-components/Form";
import { Label } from "styled-components/Label";

export const CreateTask = ({
  users,
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
  setCreateTask,
  updateEmployeeTasks,
}) => {
  return (
    <Modal close={() => setCreateTask(false)}>
      <Form
        submit={(e: { preventDefault: () => void }) => {
          updateEmployeeTasks(e);
          setCreateTask(false);
        }}
        content="New task"
      >
        <Input
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
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
          onChange={(e) => setTaskAssignedTo(e.target.value)}
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
              required
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
              required
            />
          </Flex>
          <Button
            height="35px"
            padding="10px"
            color="#FFFFFF"
            background="#ff9f69"
            hoverBack="#ff9f69CC"
          >
            <b>Save</b>
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};
