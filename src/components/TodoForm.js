import validation from "../utils/validation.js";

export default function TodoForm({ $target, onSubmit }) {
  validation.newTarget(new.target);

  const $form = document.createElement("form");
  $target.appendChild($form);

  let isInit = false;

  this.render = () => {
    $form.innerHTML = `
      <input type="text" placeholder="할 일을 입력하세요" name="todo" />
      <button>추가</button>
    `;

    if (!isInit) {
      $form.addEventListener("submit", (e) => {
        e.preventDefault(); // 태그가 갖고 있는 고유 기능 막기(form 태그의 새로고침 막기)

        const $todo = $form.querySelector("input[name=todo]");
        const text = $todo.value;
        if (text.length > 1) {
          $todo.value = "";
          onSubmit(text);
        } else alert("두 글자 이상 입력해주세요");
      });
    }
  };

  this.render();
}
