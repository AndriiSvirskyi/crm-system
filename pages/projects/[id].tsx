import React from "react";
import MainLayout from "Layouts/MainLayout";
import { UserWindow } from "components/User/UserForm";
import { ProjectContainer } from "components/projects/ProjectContainer";

export default function Project({users}) {
  const id = document.location.pathname.replace("/projects/", "");
  const getProject = users.reduce((acc, cur) => {
    if (cur.project.id === id) {
      if (cur.project.role === "Team Lead") {
        acc.lead = cur;
      } else {
        if (acc.team) {
          acc.team.push(cur);
        } else {
          acc.team = [cur];
        }
        if (!acc.name) {
          acc.name = cur.project.name;
          acc.id = id;
        }
      }
    }
    return acc;
  }, {});

  return (
    <MainLayout>
      <UserWindow>
        <ProjectContainer project={getProject} />
      </UserWindow>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  const response = await fetch(`http://localhost:4200/users/`);
  const users = await response.json();
  return {
    props: { users },
  };
}
