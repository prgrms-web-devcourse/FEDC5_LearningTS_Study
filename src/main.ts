import App from "./App.js";
import { getItem } from "./utils/storage.js";

const initialState = getItem("todo", []);
const initialCount = getItem("count", { total: 0, done: 0 });
const $app = document.querySelector("#app") as HTMLElement;

new App($app, initialState, initialCount);
