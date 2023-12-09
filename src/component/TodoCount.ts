import validation from "../util/validation.js";

export default function TodoCount({ $target, initialCount }) {
  validation.newTarget(new.target);

  const $container = document.createElement("div");
  $target.appendChild($container);

  if (initialCount.total) {
    this.state = initialCount;
  } else this.state = { total: 0, done: 0 };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $container.textContent = `완료 ${this.state.done}개 / 총 ${this.state.total}개`;
  };

  this.render();
}
