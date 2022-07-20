import { Input } from "components/Inputs/Input";
import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { Button } from "components/Button";
import { SnackbarContext } from "providers/useSnackbar";
import AddProjectInputSelect from "./AddProjectInputSelect";


export const TaskContainer = styled.div`
  background-color: #ddd;
  border-radius: 4px;
  display: grid;
  grid-template-columns: 35% 8% 20% 16% 12% 4%;
  grid-gap: 1%;
  grid-auto-rows: 60px;
  align-items: center;
  justify-items: center;
  padding: 0 5px;
`;
const StartEndTimeContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 5px;
`;


export default function AddTimeTrackerRow({ user, users, getTimeTrakers }) {
  const shortTimeFormat = "HH:mm";
  const longTimeFormat = "HH:mm:ss";
  const dateSaveFormat = "YYYY-MM-DD";
  const [workTitle, setWorkTitle] = useState("");
  const [project, setCurrentProject] = useState("");
  const [startTime, setStartTime] = useState(moment().format(shortTimeFormat));
  const [endTime, setEndTime] = useState(startTime);
  const [date, setDate] = useState(moment().format(dateSaveFormat));
  const [durationOfTime, setDurationOfTime] = useState("00:00:00");
  const snackBar = useContext(SnackbarContext);

  const clearValue = () => {
    setWorkTitle("");
    setCurrentProject("");
    setStartTime(moment().format(shortTimeFormat));
    setEndTime(startTime);
    setDate(moment().format(dateSaveFormat));
    setDurationOfTime("00:00:00");
  };
  async function setNewTask() {
    const isCurrentDateGroup = user.timeTracker[date];
    const isDateGroups = Object.keys(user.timeTracker).length === 0;
    await fetch(`http://localhost:4200/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timeTracker: {
          ...user.timeTracker,
          [date]: isDateGroups
            ? [
                {
                  id: `${workTitle} + ${startTime}`,
                  workTitle: workTitle || "",
                  project: project || "Other",
                  startTime: startTime || "",
                  endTime: endTime || "",
                  date: date || "",
                  durationOfTime: durationOfTime || "",
                },
              ]
            : isCurrentDateGroup
            ? [
                ...isCurrentDateGroup,
                {
                  id: `${workTitle} + ${startTime} + ${project} + ${endTime}`,
                  workTitle: workTitle || "",
                  project: project || "Other",
                  startTime: startTime || "",
                  endTime: endTime || "",
                  date: date || "",
                  durationOfTime: durationOfTime || "",
                },
              ]
            : [
                {
                  id: `${workTitle} + ${startTime}`,
                  workTitle: workTitle || "",
                  project: project || "Other",
                  startTime: startTime || "",
                  endTime: endTime || "",
                  date: date || "",
                  durationOfTime: durationOfTime || "",
                },
              ],
        },
      }),
    }),
      getTimeTrakers();
    clearValue();
    snackBar.openSnackBar({
      message: "Time-traker was created!",
      type: "success",
    });
  }

  function getDuringTime(startTime, endTime) {
    const start = moment(startTime, longTimeFormat);
    const end = moment(endTime, longTimeFormat);
    const duration = moment.duration(end.diff(start), "milliseconds");
    setDurationOfTime(
      moment(duration.asMilliseconds() - 10800000).format(longTimeFormat)
    );
  }

  const InputWorkTitle = useMemo(() => {
    return (
      <Input
        placeholder="What have you worked on?"
        value={workTitle}
        width="100%"
        height="35px"
        onChange={(e) => {
          setWorkTitle(e.target.value);
        }}
      />
    );
  }, [workTitle]);
  const InputStartTime = useMemo(() => {
    getDuringTime(startTime, endTime);
    return (
      <Input
        value={startTime}
        type="time"
        height="35px"
        onChange={(e) => {
          setStartTime(e.target.value);
        }}
      />
    );
  }, [startTime]);
  const InputEndTime = useMemo(() => {
    getDuringTime(startTime, endTime);

    return (
      <Input
        value={endTime}
        type="time"
        height="35px"
        onChange={(e) => {
          setEndTime(e.target.value);
        }}
      />
    );
  }, [endTime]);
  const InputDurationOfTime = useMemo(() => {
    return (
      <Input
        value={durationOfTime}
        type="time"
        step="1"
        height="35px"
        onChange={(e) => {
          setDurationOfTime(e.target.value);
        }}
      />
    );
  }, [durationOfTime]);
  const InputDate = useMemo(() => {
    return (
      <Input
        type="date"
        height="35px"
        value={moment(date).format(dateSaveFormat)}
        onChange={(e) => {
          setDate(moment(e.target.value).format(dateSaveFormat));
        }}
      />
    );
  }, [date]);

  return (
    <TaskContainer>
      {InputWorkTitle}
      <AddProjectInputSelect setProjectCallback={setCurrentProject} project={project} />
      <StartEndTimeContainer>
        {InputStartTime}-{InputEndTime}
      </StartEndTimeContainer>
      {InputDate}
      {InputDurationOfTime}
      <Button width="100%" height="40px" onClick={setNewTask}>
        ADD
      </Button>
    </TaskContainer>
  );
}
