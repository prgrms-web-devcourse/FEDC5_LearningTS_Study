import "./style.css";
import { Header } from "./components/Header/Header";
import { InputBox } from "./components/InputBox/InputBox";
import { TodoList } from "./components/TodoList/TodoList.ts";
import { TodoCount } from "./components/TodoCount/TodoCount.ts";
import { setItem } from "./components/Utils/Storage.ts";
import { validation } from "./components/Utils/Validation.ts";
import type { MainParamsType } from "./components/Utils/TypeDeclare.ts";

const App = ({ $target, initialState }: MainParamsType) => {
  // App에서 사용되는 함수 선언부
  const onSubmit = (text: string) => {
    const nextState = [
      ...todoList.state,
      {
        text,
        isCompleted: false,
      },
    ];
    validation(nextState);
    todoList.setState(nextState);
    todoList.state = nextState;
    setItem("todos", JSON.stringify(nextState));
    todoCount.setState(nextState);
  };

  const toggleCheck = (id: number) => {
    const nextState = todoList.state.map((val, index) => {
      return index === id ? { ...val, isCompleted: !val.isCompleted } : val;
    });
    todoList.setState(nextState);
    todoList.state = nextState;
    setItem("todos", JSON.stringify(nextState));
    todoCount.setState(nextState);
  };

  const removeFunction = (id: number) => {
    const nextState = todoList.state
      .filter((val, index) => {
        return index !== id ? val : 0;
      })
      .filter((element) => element != undefined);
    todoList.setState(nextState);
    todoList.state = nextState;
    setItem("todos", JSON.stringify(nextState));
    todoCount.setState(nextState);
  };

  // Import 파일 선언부
  Header({ $target, text: "Simple Todo List" });
  InputBox({
    $target,
    onSubmit,
  });
  const todoList = TodoList({
    $target,
    initialState,
    toggleCheck,
    removeFunction,
  });
  const todoCount = TodoCount({
    $target,
    initialState,
  });
};

export { App };
