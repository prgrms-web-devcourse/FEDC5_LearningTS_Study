import { TodoComponentStatelessContext } from "../types/todo";

interface HeaderProps {
  $target: HTMLElement;
  text: string;
}

const Header = function (
  this: TodoComponentStatelessContext,
  { $target, text }: HeaderProps
) {
  const $header = document.createElement("h1");

  $target.appendChild($header);

  this.render = () => {
    $header.textContent = text;
  };

  this.render();
} as any as { new (props: HeaderProps): TodoComponentStatelessContext };

export default Header;
