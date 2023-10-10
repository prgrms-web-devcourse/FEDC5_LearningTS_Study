import Header from "./Header.js";
import TodoForm from "./TodoForm.js";
import TodoList from "./TodoList.js";
import { setItem } from "./storage.js";

export default function App({ $target, initialState }) {
  new Header({
    $target,
    text: 'Todo List'
  });

  new TodoForm({
    $target,
    onSubmit: text => {
      const nextState = [
        ...todoList.state,
        { text, isCompleted: false }
      ];
      todoList.setState(nextState);
      setItem('todo', JSON.stringify(nextState));
    }
  });

  const todoList = new TodoList({
    $target,
    initialState
  });
}