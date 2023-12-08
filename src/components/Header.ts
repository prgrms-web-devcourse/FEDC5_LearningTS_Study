import { HeaderProps } from '../util/types.js';

export default class Header {
  $app: HTMLDivElement;
  title: string;
  $header: HTMLHeadElement;

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
