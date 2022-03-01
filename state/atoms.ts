import { atom } from "recoil";

export const hamburgerState = atom({
  key: "hamburger",
  default: false,
});

export const usersState = atom({
  key: "users",
  default: null,
});
