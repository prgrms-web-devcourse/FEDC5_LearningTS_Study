import {
  TodoComponentStatelessContext,
  TodoItemProps,
} from "../types/components";

const TodoItem = function (
  this: TodoComponentStatelessContext,
  { $target, initialValue, onToggle, onDelete }: TodoItemProps
) {
  const { id, text, isCompleted } = initialValue;

  const $todoItem = document.createElement("li");
  $todoItem.textContent = text;
  $todoItem.style.textDecoration = isCompleted ? "line-through" : "none";
  const $todoButton = document.createElement("button");
  $todoButton.textContent = "삭제";

  $todoItem.appendChild($todoButton);
  $target.appendChild($todoItem);

  this.render = () => {
    $todoButton.addEventListener("click", () => {
      onDelete(id);
    });
    $todoItem.addEventListener("click", () => {
      onToggle(id);
    });
  };
  this.render();
} as any as { new (props: TodoItemProps): TodoComponentStatelessContext };

export default TodoItem;
