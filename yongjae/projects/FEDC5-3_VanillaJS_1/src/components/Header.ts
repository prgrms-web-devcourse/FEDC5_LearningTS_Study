interface HeaderProps {
  $target: HTMLElement;
  text: string;
}
interface HeaderContext {
  render: () => void;
}

const Header = function (this: HeaderContext, { $target, text }: HeaderProps) {
  const $header = document.createElement("h1");

  $target.appendChild($header);

  this.render = () => {
    $header.textContent = text;
  };

  this.render();
} as any as { new (props: HeaderProps): HeaderContext };

export default Header;
