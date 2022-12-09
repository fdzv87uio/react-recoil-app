import { atom } from "recoil";

const initialState = {
  entities: [],
  time: 0,
  status: "initial",
};

export const dataState = atom({
  key: "data",
  default: initialState,
});
