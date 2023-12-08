import "./style.css";
import { Header } from "./components/Header/Header";
import { InputBox } from "./components/InputBox/InputBox";
import type { MainParamsType } from "./components/Utils/TypeDeclare.ts";

const App = ({ $target }: MainParamsType) => {
  const onSubmit = (text: string) => {
    console.log(text);
  };

  Header({ $target, text: "Simple Todo List" });
  InputBox({
    $target,
    onSubmit,
  });
};

export { App };
