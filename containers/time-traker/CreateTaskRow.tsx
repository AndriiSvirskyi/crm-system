import { Input } from "components/Inputs/Input";
import React, { useContext, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { Flex } from "styled-components/Flex";
import { usersState } from "state/atoms";
import { BsPlusCircle } from "react-icons/bs";
import InputSelect from "components/Inputs/InputSelect";
import moment, { utc } from "moment";
import { Button } from "components/Button";
import { SnackbarContext } from "providers/useSnackbar";

export const TaskContainer = styled.div`
  background-color: #ddd;
  border-radius: 4px;
  display: grid;
  grid-template-columns: 38% 8% 20% 11% 13% 5%;
  grid-gap: 1%;
  grid-auto-rows: 60px;
  align-items: center;
  justify-items: center;
  margin: 10px;
  padding: 0 5px;
`;
const Label = styled.label`
  cursor: pointer;
  display: flex;
  position: relative;
  span {
    margin: 0 0 0 5px;
    font-size: 16px;
  }
`;
const ProjectContainer = styled.div`
  position: relative;
`;
const StartEndTimeContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 5px;
`;
const AddProjectContainer = styled.div`
  position: absolute;
  left: 0;
  top: 28px;
  background: #eeeeee;
  padding: 10px;
  width: calc(100% + 150px);
  height: fit-content;
  z-index: 1;
  .bUBunu {
    position: relative;
  }
`;

export default function CreateTaskRow({
  user,
  users,
  getTimeTrakers
}) {
  const [workTitle, setWorkTitle] = useState();
  const [project, setCurrentProject] = useState("");
  const [isAddProjectActive, setProjectActive] = useState(false);
  const [startTime, setStartTime] = useState(moment().format("HH:mm"));
  const [endTime, setEndTime] = useState(moment().format("HH:mm"));
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [durationOfTime, setDurationOfTime] = useState("00:00:00");
  const snackBar = useContext(SnackbarContext);

  const setProject = (project) => {
    setCurrentProject(project);
    setProjectActive(false);
  };

  async function setNewTask() {
    await fetch(`http://localhost:4200/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
       
        timeTracker: [
          ...user.timeTracker,
          {
            id: `${workTitle} + ${startTime}`,
            workTitle: workTitle || "",
            project: project || "",
            startTime: startTime || "",
            endTime: endTime || "",
            date: date || "",
            durationOfTime: durationOfTime || "",
          },
        ],
      }),
    });
    getTimeTrakers()
    snackBar.openSnackBar({ message: "Time-traker was created!", type: "success" });
  }

  function getDuringTime(startTime, endTime) {
    const start = moment(startTime, "HH:mm:ss");
    const end = moment(endTime, "HH:mm:ss");
    const duration = moment.duration(end.diff(start), "milliseconds");
    setDurationOfTime(
      moment(duration.asMilliseconds() - 10800000).format("HH:mm:ss")
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
          console.log(e.target.value);
          setWorkTitle(e.target.value);
        }}
      />
    );
  }, [workTitle]);

  const AddProjectInputSelect = useMemo(() => {
    const uniqueProjectsName = users?.reduce((acc, cur) => {
      for (let i = 0; i < cur.projects.length; i++) {
        {
          acc[cur.projects[i].name] = true;
        }
      }
      return acc;
    }, {});

    const projectsList =
      uniqueProjectsName &&
      Object.keys(uniqueProjectsName).map((projectName) => ({
        label: projectName,
        value: projectName,
        parts: projectName.toLowerCase().split(" "),
      }));
    return (
      <InputSelect
        callback={setProject}
        list={projectsList}
        placeholder="Find Project"
      />
    );
  }, [users]);
  const InputStartTime = useMemo(() => {
    getDuringTime(startTime, endTime);
    return (
      <Input
        value={startTime}
        type="time"
        width="100%"
        height="35px"
        onChange={(e) => {
          console.log(e.target.value);
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
        width="100%"
        height="35px"
        onChange={(e) => {
          console.log(e.target.value);
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
        width="100%"
        height="35px"
        onChange={(e) => {
          console.log(e.target.value);
          setDurationOfTime(e.target.value);
        }}
      />
    );
  }, [durationOfTime]);
  const InputDate = useMemo(() => {
    const formatForSave = "ddd, MMM DD";
    const formatForRead = "YYYY-MM-DD";
    return (
      <Input
        type="date"
        value={moment(date).format(formatForRead)}
        onChange={(e) => {
          setDate(moment(e.target.value, "YYYY-MM-DD").format(formatForSave));
        }}
        width="100%"
      />
    );
  }, [date]);

  return (
    <TaskContainer>
      {InputWorkTitle}
      <ProjectContainer>
        <Label
          onClick={() => {
            setProjectActive(!isAddProjectActive);
          }}
        >
          {!project ? (
            <>
              <BsPlusCircle size={18}></BsPlusCircle>
              <span>Project</span>
            </>
          ) : (
            <div>{project}</div>
          )}
        </Label>
        {isAddProjectActive && (
          <AddProjectContainer>{AddProjectInputSelect}</AddProjectContainer>
        )}
      </ProjectContainer>
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
