import "./style.css";
import { Header } from "./components/Header/Header";
import { InputBox } from "./components/InputBox/InputBox";
import { TodoList } from "./components/TodoList/TodoList.ts";
import { TodoCount } from "./components/TodoCount/TodoCount.ts";
import type { MainParamsType } from "./components/Utils/TypeDeclare.ts";

const App = ({ $target, initialState }: MainParamsType) => {
  // 임시 initialState 선언

  // App에서 사용되는 함수 선언부
  const onSubmit = (text: string) => {
    console.log(text);

    const nextState = [
      ...todoList.state,
      {
        text,
        isCompleted: false,
      },
    ];
    console.log(nextState);
    // validation(nextState);
    todoList.setState(nextState);
    todoList.state = nextState;
    console.log(todoList.state);
    // setItem("todos", JSON.stringify(nextState));
    todoCount.setState(nextState);
  };
  const toggleCheck = (id: number) => {
    console.log(id);
    const nextState = todoList.state.map((val, index) => {
      return index === id ? { ...val, isCompleted: !val.isCompleted } : val;
    });
    console.log(nextState);
    todoList.setState(nextState);
    todoList.state = nextState;
    console.log(todoList.state);
    // setItem("todos", JSON.stringify(nextState));
    todoCount.setState(nextState);
  };

  // delete버튼을 누른 id의 li를 제거하는 함수
  const removeFunction = (id: number) => {
    console.log(id);
    const nextState = todoList.state
      .filter((val, index) => {
        return index !== id ? val : 0;
      })
      .filter((element) => element != undefined);
    todoList.setState(nextState);
    todoList.state = nextState;
    // setItem("todos", JSON.stringify(nextState));
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
