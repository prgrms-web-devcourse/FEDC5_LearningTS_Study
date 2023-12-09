import type { TodoCount, StateType } from "../Utils/TypeDeclare.ts";

const TodoCount = ({ $target, initialState }: TodoCount) => {
  let state = initialState;

  const setState = (nextState: StateType) => {
    state = nextState;
    render();
  };

  const $div = document.createElement("div");

  if ($target) $target.appendChild($div);
  const render = () => {
    let completeCount = 0;
    state.map((count) => {
      count.isCompleted ? completeCount++ : 0;
    });
    $div.className = "countDiv";
    $div.innerText = `완료된 갯수 ${completeCount} / 전체 갯수 ${state.length}`;
  };
  render();

  return {
    setState,
  };
};

export { TodoCount };
