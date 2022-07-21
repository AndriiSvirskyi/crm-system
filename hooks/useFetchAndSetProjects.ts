import { projectsState } from "./../state/atoms";
import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { fetchAndSetData } from "utils/fetchAndSetData";

export default function useFetchAndSetProjects() {
  const setProjectsToRecoil = useSetRecoilState(projectsState);
  const projects = useRecoilValue(projectsState);
  useEffect(() => {
    if (!projects) {
      fetchAndSetData(`http://localhost:4200/projects`, setProjectsToRecoil);
    }
  }, []);
  return projects;
}
