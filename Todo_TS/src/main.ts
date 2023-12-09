import { App } from "./app.ts";
import { getItem } from "./components/Utils/Storage.ts";

const $app: HTMLElement | null = document.querySelector("#app");

const initialState = getItem("todos", []);

App({
  $target: $app,
  initialState,
});
