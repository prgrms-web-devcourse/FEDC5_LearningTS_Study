import Header from "./components/Header.js";
import TodoForm from "./components/TodoForm.js";
import TodoList from "./components/TodoList.js";
import TodoCount from "./components/TodoCount.js";
import { setItem } from "./utils/storage.js";

export default function App({ $target, initialState, initialCount }) {
  new Header({
    $target,
    text: "Todo List",
  });

  new TodoForm({
    $target,
    onSubmit: (text) => {
      const nextState = [...todoList.state, { text, isCompleted: false }];
      todoList.setState(nextState);
    },
  });

  const todoList = new TodoList({
    $target,
    initialState,
    updateCount: (state) => updateCount(state),
  });

  const todoCount = new TodoCount({
    $target,
    initialCount,
  });

  // 카운트 업데이트
  const updateCount = (todoList) => {
    const done = todoList.filter((todo) => todo.isCompleted).length;
    const nextState = { total: todoList.length, done };
    todoCount.setState(nextState);
    setItem("count", JSON.stringify(nextState));
  };
}
