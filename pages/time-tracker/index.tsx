import MainLayout from "layouts/MainLayout";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { UserWindow } from "styled-components/UserForm";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { usersState } from "state/atoms";
import AddTimeTrackerRow, {
} from "containers/time-traker/AddTimeTrackerRow";
import CreatedTimeTrackers from "containers/time-traker/TimeTrackersList";

const PageWrapper = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: auto;
  padding: 10px;
`;

export default function TimeTracker() {
  const users = useRecoilValue(usersState);
  const setUsersToRecoil = useSetRecoilState(usersState);

  const [user, setUser] = useState({ id: "", timeTracker: [] });

  const getTimeTrakers = () => {
    if (localStorage.user) {
      const response = fetch("http://localhost:4200/users");
      response
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setUsersToRecoil(res);
          setUser(
            res.find(({ id }) => id === JSON.parse(localStorage.user).id)
          );
        });
    }
  };
  useEffect(() => {
    getTimeTrakers();
  }, []);

  return (
    <MainLayout>
      <UserWindow>
        <PageWrapper>
          <AddTimeTrackerRow
            user={user}
            users={users}
            getTimeTrakers={getTimeTrakers}
          />
          <CreatedTimeTrackers user={user} getTimeTrakers={getTimeTrakers} />
        </PageWrapper>
      </UserWindow>
    </MainLayout>
  );
}
