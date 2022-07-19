import { Button } from "components/Button";
import { SnackbarContext } from "providers/useSnackbar";
import React, { useContext, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import styled from "styled-components";

const RemoveContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const RemoveOption = styled.div`
  border-radius: 8px;
  position: absolute;
  bottom: -50px;
  background-color: #ddd;
`;
const DeleteButton = styled(Button)`
  background: #f44d4dd0;
  padding: 5px;
  margin: 10px;
  color: black;
`;

export default function RemoveTimeTrackerOption({
  getTimeTrakers,
  user,
  taskId,
  date,
}) {
  const [showOptions, setShowOptions] = useState(false);
  const snackBar = useContext(SnackbarContext);
  const ifOneDeleteTask = user.timeTracker[date].length === 1;
  const keys = Object.entries(user.timeTracker);

  async function DeleteTimeTrackerTask(taskId) {
    await fetch(`http://localhost:4200/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timeTracker: ifOneDeleteTask
          ? {
              ...keys.reduce((acc, cur) => {
                if (cur[0] !== date) {
                  acc[cur[0]] = cur[1];
                }
                return acc;
              }, {}),
            }
          : {
              ...user.timeTracker,
              [date]: [
                ...user.timeTracker[date].reduce((acc, cur) => {
                  if (cur.id !== taskId) {
                    acc.push({ ...cur });
                  }
                  return acc;
                }, []),
              ],
            },
      }),
    });
    getTimeTrakers();
    snackBar.openSnackBar({
      message: "Time-traker was deleted!",
      type: "success",
    });
  }

  return (
    <RemoveContainer>
      <Button
        flex="flex"
        height="35px"
        width="30px"
        radius="4px"
        shadow="0px 0.3px 1.5px 0px grey"
        background="none"
        hoverBack="#f5f5f5"
        padding="0px 4px 0 4px"
        onClick={() => {
          setShowOptions(!showOptions);
        }}
      >
        <HiDotsVertical size="25" fill="grey" />
      </Button>
      {showOptions && (
        <RemoveOption onMouseLeave={() => setShowOptions(false)}>
          <DeleteButton onClick={() => DeleteTimeTrackerTask(taskId)}>
            Delete
          </DeleteButton>
        </RemoveOption>
      )}
    </RemoveContainer>
  );
}
