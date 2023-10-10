export default function Header({ $target, text }) {
  if (!new.target) {
    throw new Error("You must use new with Header");
  }

  const $header = document.createElement("h1");
  $target.appendChild($header);

  this.render = () => {
    $header.textContent = text;
  };

  this.render();
}
