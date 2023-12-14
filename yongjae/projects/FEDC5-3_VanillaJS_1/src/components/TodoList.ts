import {
  TodoComponentStatefulContext,
  TodoListProps,
} from "../types/components";
import { Todos } from "../types/states";
import { setItem } from "../utils/storage";
import TodoItem from "./TodoItem";

const TodoList = function (
  this: TodoComponentStatefulContext,
  { initialState, $target, onToggle, onDelete }: TodoListProps
) {
  this.state = initialState;

  const $todoList = document.createElement("ul");
  $target.appendChild($todoList);

  this.setState = (nextState: Todos) => {
    this.state = nextState;
    setItem("todos", this.state);
    this.render();
  };

  this.render = () => {
    $todoList.innerHTML = "";
    this.state.map(
      (itemContext) =>
        new TodoItem({
          $target: $todoList,
          initialValue: itemContext,
          onToggle,
          onDelete,
        })
    );
  };
  this.render();
} as any as { new (props: TodoListProps): TodoComponentStatefulContext };

export default TodoList;
