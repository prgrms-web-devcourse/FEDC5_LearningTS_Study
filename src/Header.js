import validation from "./util/validation.js";

export default function Header({ $target, text }) {
  validation.newTarget(new.target);

  const $header = document.createElement("h1");
  $target.appendChild($header);

  this.render = () => {
    $header.textContent = text;
  };

  this.render();
}
