import moment from "moment";
import styled from "styled-components";
import { Flex } from "styled-components/Flex";
import TimeTrackerRow from "./TimeTrackerRow";
const TimeTrackerDateBlock = styled.div`
  border: 1px solid grey;
  border-radius: 12px;
  margin: 10px 0;
`;
const TrackersDateGroupTitle = styled.div`
  height: 50px;
  background: #ddd;
  border-radius: 12px 12px 0 0;
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 20px;
`;
const Title = styled.span`
  font-size: 16px;
  color: gray;
`;

export default function CreatedTimeTrackersList({ user, getTimeTrakers }) {
  const DateFormatForRead = "ddd, MMM DD";

  return (
    <div>
      {Object.entries(user.timeTracker).map(
        (eachDataGroup: [string, [{ id: string }]]) => (
          <TimeTrackerDateBlock key={eachDataGroup[0]}>
            <TrackersDateGroupTitle>
              <Title>
                {moment(eachDataGroup[0]).format(DateFormatForRead)}
              </Title>
            </TrackersDateGroupTitle>
            <Flex direction="column" gap="10px" margin="10px">
              {eachDataGroup[1].map((currentTimeTracker, i) => (
                <TimeTrackerRow
                  key={currentTimeTracker.id + i}
                  currentTrackerProps={currentTimeTracker}
                  user={user}
                  getTimeTrakers={getTimeTrakers}
                ></TimeTrackerRow>
              ))}
            </Flex>
          </TimeTrackerDateBlock>
        )
      )}
    </div>
  );
}
