import type { HeaderParamsType } from "../Utils/TypeDeclare.ts";
const Header = ({ $target, text }: HeaderParamsType) => {
  const $header = document.createElement("h1");

  if ($target) $target.appendChild($header);

  const render = () => {
    $header.textContent = text;
  };

  render();
};

export { Header };
