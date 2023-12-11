import { TodosType } from "../types/todo";
import { setItem } from "../utils/storage";
import TodoItem from "./TodoItem";

interface TodoListContext {
  state: TodosType;
  setState: (nextState: any) => void;
  render: () => void;
}
interface TodoListProps {
  $target: HTMLElement;
  initialState: any;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}
const TodoList = function (
  this: TodoListContext,
  { initialState, $target, onToggle, onDelete }: TodoListProps
) {
  this.state = initialState;

  const $todoList = document.createElement("ul");
  $target.appendChild($todoList);

  this.setState = (nextState: any) => {
    this.state = nextState;
    setItem("todos", this.state);
    this.render();
  };

  this.render = () => {
    $todoList.innerHTML = "";
    this.state.map(
      (itemContext: any) =>
        new TodoItem({
          $target: $todoList,
          initialValue: itemContext,
          onToggle,
          onDelete,
        })
    );
  };
  this.render();
} as any as { new (props: TodoListProps): TodoListContext };

export default TodoList;
