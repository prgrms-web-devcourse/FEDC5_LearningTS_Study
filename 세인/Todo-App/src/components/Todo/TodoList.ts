/* eslint-disable @typescript-eslint/no-explicit-any */
import { Todo, TodoItem, TodoListProps } from '../../types/todo.ts'
import { validateConstructorUsage } from '../../utils/validateConstructorUsage.js'

export default function TodoList(
  this: any,
  { $target, state, completeTodo, deleteTodo }: TodoListProps
) {
  validateConstructorUsage(new.target)

  const $todoList = document.createElement('div')
  if ($todoList && $target) $target.appendChild($todoList)

  this.render = (state: Todo) => {
    $todoList.innerHTML = `
    <ul>
    ${state
      .map(
        ({ id, text, isCompleted }: TodoItem) =>
          `
          <li class="todo-item" id="${id}">
            ${isCompleted ? `<s>${text}</s>` : `${text}`}
          <button class="remove">Delete</button>
          </li>
        `
      )
      .join('')}
    </ul>
    `
  }

  $todoList.addEventListener('click', (event: MouseEvent) => {
    const $li = (event.target as HTMLLIElement).closest('.todo-item')

    if ($li) {
      // 'EventTarget | null' 형식에 'className' 속성이 없습니다
      // -> HTMLElement로 지정
      const { className } = event.target as HTMLElement

      className === 'remove' ? deleteTodo($li.id) : completeTodo($li.id)
    }
  })

  this.render(state)
}
