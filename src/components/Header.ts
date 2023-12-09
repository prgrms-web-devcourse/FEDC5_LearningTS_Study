export default class Header {
  private readonly $header = document.createElement("h1");

  constructor(
    private readonly $target: HTMLElement,
    private readonly text: string
  ) {
    this.$target.appendChild(this.$header);
    this.render();
  };

  private render() {
    this.$header.textContent = this.text;
  }
};
