import React, { useEffect } from "react";
import MainLayout from "Layouts/MainLayout";
import { UserWindow } from "components/User/UserForm";
import { ProjectContainer } from "components/projects/ProjectContainer";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { usersState } from "state/atoms";

export default function Project() {
  const setUsersToRecoil = useSetRecoilState(usersState);
  const users = useRecoilValue(usersState);
  const id = document.location.pathname.replace("/projects/", "");

  useEffect(() => {
    if (!users) {
      const response = fetch(`http://localhost:4200/users`);
      response
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setUsersToRecoil(res);
        });
    }
  }, []);

  const getProject = users
    ? users.reduce((acc, cur) => {
        for (let i = 0; i < cur.projects.length; i++) {
          if (cur.projects[i].id === id) {
            if (cur.projects[i].role === "Team Lead") {
              acc.lead = cur;
            } else {
              if (acc.team) {
                acc.team.push(cur);
              } else {
                acc.team = [cur];
              }
              if (!acc.name) {
                acc.name = cur.projects[i].name;
                acc.id = id;
              }
            }
          }
        }
        return acc;
      }, {})
    : [];

  return (
    <MainLayout>
      <UserWindow>
        <ProjectContainer project={getProject} />
      </UserWindow>
    </MainLayout>
  );
}
