import {
  TodoComponentStatefulContext,
  TodoComponentStatefulProps,
  TodosType,
} from "../types";
import { setItem } from "../utils/storage";
import TodoItem from "./TodoItem";

type TodoListProps = TodoComponentStatefulProps<{
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}>;
const TodoList = function (
  this: TodoComponentStatefulContext,
  { initialState, $target, onToggle, onDelete }: TodoListProps
) {
  this.state = initialState;

  const $todoList = document.createElement("ul");
  $target.appendChild($todoList);

  this.setState = (nextState: TodosType) => {
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
