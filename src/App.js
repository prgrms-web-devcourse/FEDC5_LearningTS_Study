import Header from "./Header.js";
import TodoForm from "./TodoForm.js";
import TodoList from "./TodoList.js";
import TodoCount from "./TodoCount.js";
import { setItem } from "./storage.js";

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
      setItem("todo", JSON.stringify(nextState));

      const done = nextState.filter((todo) => todo.isCompleted).length;
      const count = { total: nextState.length, done };
      todoCount.setState(count);
      setItem("count", JSON.stringify(count));
    },
  });

  const todoList = new TodoList({
    $target,
    initialState,
    updateCount: () => {
      const done = todoList.state.filter((todo) => todo.isCompleted).length;
      const nextState = { total: todoList.state.length, done };
      todoCount.setState(nextState);
      setItem("count", JSON.stringify(nextState));
    },
  });

  const todoCount = new TodoCount({
    $target,
    initialCount,
  });
}
