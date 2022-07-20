import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Flex } from "styled-components/Flex";
import { TaskContainer } from "./AddTimeTrackerRow";
import StartTimerIcon from "assets/icons/arrow-start.svg";
import PauseIcon from "assets/icons/pause.svg";
import RemoveTimeTrackerOption from "./RemoveTimeTrackerOption";
import moment from "moment";
import { Input } from "components/Inputs/Input";
import AddProjectInputSelect from "./AddProjectInputSelect";

const CreatedTaskContainer = styled(TaskContainer)`
  border: 1px solid #dddd;
  background: #e5e1e1a3;
  grid-template-columns: 29% 6% 20% 13% 18% 10%;
  input:disabled {
    background: none;
  }
`;
type ButtonStartTimerProps = {
  image: string;
  isActive: boolean;
};

const ButtonStartTimer = styled.div<ButtonStartTimerProps>`
  background-image: url(${({ image }) => image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: ${({ isActive }) =>
    !isActive ? "#08be17c5" : "#d82109a2"};
  border-radius: 50px;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

export default function TimeTrackerRow({
  currentTrackerProps,
  user,
  getTimeTrakers,
}) {
  const { workTitle, project, startTime, endTime, date, durationOfTime, id } =
    currentTrackerProps;
  const [newProject, setNewProject] = useState(project);
  const [timerIsActive, setTimesActive] = useState(false);
  const [newDurationTime, setNewDurationTime] = useState(durationOfTime);
  const [newStartTime, setNewStartTime] = useState(startTime);
  const [newEndTime, setNewEndTime] = useState(endTime);
  const [isDisabledPlaceholder, setDisabledPlaceholder] = useState(true);
  useEffect(() => {
    let timer;
    if (timerIsActive) {
      timer = setInterval(() => {
        setNewDurationTime(
          moment(newDurationTime, "HH:mm:ss")
            .add(1, "seconds")
            .format("HH:mm:ss")
        );
      }, 1000);
      return () => clearInterval(timer);
    }
  });

  function activateTimer() {
    setTimesActive(!timerIsActive);
    if (newDurationTime !== durationOfTime && timerIsActive) {
      const start = moment(newStartTime, "HH:mm:ss");
      const duration = moment(newDurationTime, "HH:mm:ss");
      const durationss = moment.duration(start.diff(duration), "milliseconds");
      console.log(
        moment(durationss.asMilliseconds() - 10800000).format("HH:mm:ss")
      );
      SaveNewTime(id);
      console.log("i saved a new time");
    }
  }

  async function SaveNewTime(taskId) {
    await fetch(`http://localhost:4200/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timeTracker: {
          ...user.timeTracker,
          [date]: [
            ...user.timeTracker[date].reduce((acc, cur) => {
              if (cur.id !== taskId) {
                acc.push({ ...cur });
              } else {
                acc.push({
                  ...cur,
                  startTime: newStartTime,
                  endTime: newEndTime,
                  durationOfTime: newDurationTime,
                });
              }
              return acc;
            }, []),
          ],
        },
      }),
    });
    getTimeTrakers();
  }

  return (
    <CreatedTaskContainer
      key={id}
      onMouseOver={() => setDisabledPlaceholder(false)}
      onMouseLeave={() => setDisabledPlaceholder(true)}
    >
      <Input
        value={workTitle}
        disabled={isDisabledPlaceholder}
        width="100%"
        height="35px"
      />
      <AddProjectInputSelect
        project={newProject}
        setProjectCallback={setNewProject}
      />
      <Flex align="center">
        <Input
          type="time"
          value={newStartTime}
          onChange={(e) => setNewStartTime(e.target.value)}
          disabled={isDisabledPlaceholder}
          height="35px"
        />
        -
        <Input
          type="time"
          value={newEndTime}
          onChange={(e) => setNewEndTime(e.target.value)}
          disabled={isDisabledPlaceholder}
          height="35px"
        />
      </Flex>
      <Input
        type="date"
        value={date}
        disabled={isDisabledPlaceholder}
        height="35px"
      />
      <Input
        type="time"
        step="1"
        value={newDurationTime}
        disabled={isDisabledPlaceholder}
        height="35px"
      />
      <Flex align="center" justify="center" gap="20px">
        <ButtonStartTimer
          image={!timerIsActive ? StartTimerIcon.src : PauseIcon.src}
          isActive={timerIsActive}
          onClick={activateTimer}
        />
        <RemoveTimeTrackerOption
          user={user}
          getTimeTrakers={getTimeTrakers}
          taskId={id}
          date={date}
        />
      </Flex>
    </CreatedTaskContainer>
  );
}
