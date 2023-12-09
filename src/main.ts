import App from "./App.js";
import { getItem } from "./utils/storage.js";

const initialState = getItem("todo", []);
const initialCount = getItem("count", { total: 0, done: 0 });
const $app = document.querySelector("#app");

new App({
  $target: $app,
  initialState,
  initialCount,
});
