import { TodoComponentStatefulContext, TodosType } from "../types/todo";

interface TodoCountProps {
  $target: HTMLElement;
  initialState: TodosType;
}

const TodoCount = function (
  this: TodoComponentStatefulContext,
  { $target, initialState }: TodoCountProps
) {
  this.state = initialState;

  const $todoCount = document.createElement("h3");
  $target.appendChild($todoCount);

  this.setState = (nextState: TodosType) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const completedNum = this.state.filter(
      ({ isCompleted }) => isCompleted
    ).length;

    const totalNum = this.state.length;
    $todoCount.innerHTML = `<span>${completedNum} / ${totalNum}</span>`;
  };

  this.render();
} as any as { new (props: TodoCountProps): TodoComponentStatefulContext };

export default TodoCount;
