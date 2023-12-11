type ValueContext = {
  id: number;
  text: string;
  isCompleted: boolean;
};
type TodoItemProps = {
  $target: HTMLElement;
  initialValue: ValueContext;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};
type TodoItemContext = {
  render: () => void;
};
const TodoItem = function (
  this: TodoItemContext,
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
} as any as { new (props: TodoItemProps): TodoItemContext };

export default TodoItem;
