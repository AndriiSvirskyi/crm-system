import { atom } from "recoil";

export const hamburgerState = atom({
  key: "hamburger",
  default: false,
});

export const usersState = atom({
  key: "users",
  default: null,
});

export const projectsState = atom({
  key: "projects",
  default: null,
});

export const projectState = atom({
  key: "project",
  default: null,
});
