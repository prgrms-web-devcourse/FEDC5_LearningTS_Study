export default class Header {
  $header = document.createElement("h1");

  constructor(
    private readonly $target: HTMLElement,
    private readonly text: string
  ) {
    this.$target.appendChild(this.$header);
    this.render();
  };

  render() {
    this.$header.textContent = this.text;
  }
};
