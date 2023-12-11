interface TodoCountProps {
  $target: HTMLElement;
  initialState: StateContext[];
}
type StateContext = {
  isCompleted: boolean;
};
// 임시 Context : this의 property를 정의하는 부분
interface TodoCountContext {
  state: StateContext[];
  setState: (nextState: StateContext[]) => void;
  render: () => void;
}
const TodoCount = function (
  this: TodoCountContext,
  { $target, initialState }: TodoCountProps
) {
  this.state = initialState;

  const $todoCount = document.createElement("h3");
  $target.appendChild($todoCount);

  this.setState = (nextState: StateContext[]) => {
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
} as any as { new (props: TodoCountProps): TodoCountContext };

export default TodoCount;
