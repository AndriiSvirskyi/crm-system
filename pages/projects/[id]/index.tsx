import React, { useEffect, useState } from "react";
import MainLayout from "layouts/MainLayout";
import { UserWindow } from "styled-components/UserForm";
import { ProjectContainer } from "containers/projects/ProjectContainer";
import { useSetRecoilState } from "recoil";
import { projectState } from "state/atoms";
import useFetchAndSetUsers from "hooks/useFetchAndSetUsers";
import useFetchAndSetProjects from "hooks/useFetchAndSetProjects";

export default function Project() {
  const users = useFetchAndSetUsers();
  const setProjectToRecoil = useSetRecoilState(projectState);
  const projects = useFetchAndSetProjects();
  const [id, setId] = useState("");

  useEffect(() => {
    setId(document.location.pathname.replace("/projects/", ""));
  }, []);
  useEffect(() => {
    setProjectToRecoil(
      users && projects && id
        ? {
            id: id,
            name: projects.find((item) => item.id === id)?.name,
            lead: users.find((user) => user.projects.find((item) => item.role === "Team Lead")?.id === id),
            team: users.filter((user) => user.projects.find((item) => item.id === id && item.role !== "Team Lead")),
            description: projects.find((item) => item.id === id).description,
            rating: projects.find((item) => item.id === id).rating,
            feedbacks: projects.find((item) => item.id === id).feedbacks,
          }
        : {},
    );
  }, [users, projects, id]);

  return (
    <MainLayout>
      <UserWindow>
        <ProjectContainer />
      </UserWindow>
    </MainLayout>
  );
}
