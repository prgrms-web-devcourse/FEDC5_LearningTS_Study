import { TodoComponentStatefulContext, TodosType } from "../types/todo";
import { setItem } from "../utils/storage";
import TodoItem from "./TodoItem";

interface TodoListProps {
  $target: HTMLElement;
  initialState: TodosType;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}
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
