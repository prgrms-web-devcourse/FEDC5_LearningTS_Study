import { App } from "./app";

const $app: HTMLElement | null = document.querySelector("#app");

const initialState = [
  {
    text: "avaatar",
    isCompleted: true,
  },
  {
    text: "avaatar",
    isCompleted: true,
  },
];

App({
  $target: $app,
  initialState,
});
