export default function TodoCount({ $target, initialCount }) {
  if (!new.target) {
    throw new Error("You must use new with TodoCount");
  }

  const $container = document.createElement("div");
  $target.appendChild($container);

  this.state = initialCount;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $container.textContent = `완료 ${this.state.done}개 / 총 ${this.state.total}개`;
  };

  this.render();
}
