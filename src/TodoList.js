import { setItem } from "./storage.js";

// params.$target - 해당 컴포넌트가 추가될 DOM 앨리먼트
// params.initialState - 해당 컴포넌트의 초기 상태
export default function TodoList({ $target, initialState }) {
  if (!new.target) {
    throw new Error('You must use new with TodoList');
  }

  const $todoList = document.createElement('div');
  $target.appendChild($todoList);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    $todoList.innerHTML = `
      <ul>
        ${this.state
          .map(
            ({ text, isCompleted }) => `
              <li class=${isCompleted ? "completed" : ""}>
                <input type="checkbox" ${isCompleted ? "checked" : ""} />
                <span>${text}</span>
                <button class="deleteBtn">삭제</button>
              </li>
            `
          )
          .join("")}
      </ul>
    `;

    const deleteButtonAll = $todoList.querySelectorAll(".deleteBtn");
    deleteButtonAll.forEach(($deleteBtn, index) => {
      $deleteBtn.addEventListener("click", (e) => {
        // list의 li 혹은 checkbox를 클릭했을 때 이벤트 전파를 막기 위함
        e.stopPropagation();

        const newState = [...this.state];
        newState.splice(index, 1);
        this.setState(newState);
        setItem("todo", JSON.stringify(newState));
      });
    });

    const liList = $todoList.querySelectorAll("li");
    liList.forEach(($li, index) => {
      $li.addEventListener("click", (e) => {
        const checkbox = e.currentTarget.children[0];
        if (e.target.tagName !== "INPUT") {
          // checkbox가 아닌 부분을 클릭했을 때 checked 상태를 변경
          checkbox.checked = !checkbox.checked;
        }

        const isCompleted = checkbox.checked;
        if (isCompleted) {
          e.currentTarget.classList.add("completed");
        } else {
          e.currentTarget.classList.remove("completed");
        }

        const newState = [...this.state];
        newState[index] = {
          ...newState[index],
          isCompleted,
        };
        this.setState(newState);
        setItem("todo", JSON.stringify(newState));
      });
    });
  };

  this.render();
}
