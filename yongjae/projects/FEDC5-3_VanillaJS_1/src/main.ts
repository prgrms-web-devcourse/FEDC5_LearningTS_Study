import { getItem } from "./utils/storage";
import App from "./components/App.ts";

const initialState = getItem("todos", []);

const $app = document.querySelector<HTMLDivElement>("#app")!;

new App({
  $target: $app,
  initialState,
});
