import { Header } from "./components/Header/Header";
import type { MainParamsType } from "./components/Utils/TypeDeclare.ts";
import "./style.css";

const App = ({ $target }: MainParamsType) => {
  Header({ $target, text: "Simple Todo List" });
  console.log($target);
};

export { App };
