import moment from "moment";
import React from "react";
import { useRecoilValue } from "recoil";
import { projectState } from "state/atoms";
import styled from "styled-components";
import { calculateDateDiff } from "utils/dateDifference";

const barWidth = 580;
const mlSecInDay = 3600000 * 24;

export default function DeadLine() {
  const project = useRecoilValue(projectState);
  const start = project?.description?.deadline?.start;
  const deadline = project?.description?.deadline?.deadline;
  const status = project?.description?.status === "in progress" ? true : false;
  const end = project?.description?.deadline?.end;
  const date = status ? +new Date() : +new Date(end);
  const oneDayWidth =
    date < +new Date(deadline)
      ? barWidth / ((+new Date(deadline) - +new Date(start)) / mlSecInDay)
      : barWidth / ((date - +new Date(start)) / mlSecInDay);
  const dayPast = (date - +new Date(start)) / mlSecInDay;
  const daysLate = calculateDateDiff(deadline, date) && (date - +new Date(deadline)) / mlSecInDay;

  return (
    <div>
      <StyledDuration>
        <div>Predicted Duration: {calculateDateDiff(start, deadline)}</div>
        <div>Actual Duration: {calculateDateDiff(start, date)}</div>
      </StyledDuration>
      <StyledProgressBar
        width={barWidth}
        filledWidth={oneDayWidth * dayPast}
        daysLate={daysLate * oneDayWidth}
        fillColor={120 - ((dayPast * oneDayWidth) / barWidth / 10) * 1200}
      >
        <div></div>
        <div></div>
        <StyledDays>
          {date - mlSecInDay < +new Date(deadline)
            ? calculateDateDiff(date - mlSecInDay, deadline)
              ? calculateDateDiff(date - mlSecInDay, deadline) + " left"
              : status
              ? "deadline is today"
              : "finished on time"
            : calculateDateDiff(deadline, date) + " late"}
        </StyledDays>
      </StyledProgressBar>
      <StyledPeriod>
        <div>
          {status ? "start:" : "started:"} {moment(start).format("LL")}
        </div>
        <div>
          {status
            ? "deadline: " + moment(new Date(deadline)).format("LL")
            : "ended: " + moment(new Date(end)).format("LL")}
        </div>
      </StyledPeriod>
    </div>
  );
}

const StyledDuration = styled.div`
  font-family: "Kanit";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  color: #66667d;
  margin: 20px 0 30px;
`;
const StyledDays = styled.div`
  position: absolute;
  right: 20px;
  top: -30px;
  font-family: "Kanit";
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  color: #66667d;
`;
const StyledPeriod = styled.div`
  display: flex;
  justify-content: space-between;
  width: 580px;
  margin: -48px 0 80px;
  font-family: "Kanit";
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  color: #66667d;
`;
const StyledProgressBar = styled.div<{ width: number; filledWidth: number; daysLate: number; fillColor: number }>`
  width: ${({ width }) => width + "px"};
  height: 10px;
  background: #ffffff;
  border: 1px solid #b0b0b0;
  box-shadow: inset 0px 3px 5px rgba(69, 69, 69, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 4px;
  position: relative;
  margin: 50px 0;
  div:nth-child(1) {
    box-shadow: inset 0px 3px 5px rgba(69, 69, 69, 0.25);
    border-radius: 4px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: ${({ fillColor }) => `hsl(${fillColor}, 100%, 50%)`};
    width: ${({ filledWidth }) => filledWidth + "px"};
  }
  div:nth-child(2) {
    box-shadow: inset 0px 3px 5px rgba(69, 69, 69, 0.25);
    border-radius: 4px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 0 4px 4px 0;
    background: black;
    width: ${({ daysLate }) => daysLate + "px"};
  }
`;
