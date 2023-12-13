import { HeaderProps } from '../util/types.js';

export default class Header {
  private readonly $app: HTMLDivElement;
  private readonly title: string;
  private readonly $header: HTMLHeadElement;

  constructor({ $app, title }: HeaderProps) {
    this.$header = document.createElement('h1');
    this.$app = $app;
    this.title = title;
    this.render();
  }

  render(): void {
    this.$header.textContent = this.title;
    this.$app.appendChild(this.$header);
  }
}
