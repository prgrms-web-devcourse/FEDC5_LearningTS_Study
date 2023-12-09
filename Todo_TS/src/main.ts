import { App } from "./app";
import { getItem } from "./components/Utils/Storage";

const $app: HTMLElement | null = document.querySelector("#app");

// const initialState = [
//   {
//     text: "avaatar",
//     isCompleted: true,
//   },
//   {
//     text: "avaatar",
//     isCompleted: true,
//   },
// ];

const initialState = getItem("todos", []);

App({
  $target: $app,
  initialState,
});
