const initialState = storage.getItem("todo", []);
const $app = document.querySelector("#app");

new App({
  $target: $app,
  initialState
});