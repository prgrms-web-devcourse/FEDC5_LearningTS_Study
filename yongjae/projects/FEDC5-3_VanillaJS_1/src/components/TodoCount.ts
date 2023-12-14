import {
  TodoComponentStatefulContext,
  TodoComponentStatefulProps,
} from "../types/components";
import { Todos } from "../types/states";

const TodoCount = function (
  this: TodoComponentStatefulContext,
  { $target, initialState }: TodoComponentStatefulProps
) {
  this.state = initialState;

  const $todoCount = document.createElement("h3");
  $target.appendChild($todoCount);

  this.setState = (nextState: Todos) => {
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
} as any as {
  new (props: TodoComponentStatefulProps): TodoComponentStatefulContext;
};

export default TodoCount;
