/* eslint-disable @typescript-eslint/no-explicit-any */
import { Todo, TodoItem, TodoListProps } from '../../types/todo.ts'
import { validateConstructorUsage } from '../../utils/validateConstructorUsage.js'

export default function TodoList(
  this: any,
  { $target, state, completeTodo, deleteTodo }: TodoListProps
) {
  validateConstructorUsage(new.target)

  const $todoList = document.createElement('div') as HTMLDivElement
  if ($target) $target.appendChild($todoList)

  this.render = (state: Todo) => {
    $todoList.innerHTML = `
    <ul>
    ${state
      .map(
        ({ text, isCompleted }: TodoItem, index: number) =>
          `
          <li class="todo-item" id="${index}">
            ${isCompleted ? `<s>${text}</s>` : `${text}`}
          <button class="remove">Delete</button>
          </li>
        `
      )
      .join('')}
    </ul>
    `
  }

  $todoList.addEventListener('click', (event: Event) => {
    const $li = (event.target as HTMLLIElement).closest('.todo-item')

    if ($li) {
      const id = Number($li.id)
      // 'EventTarget | null' 형식에 'className' 속성이 없습니다
      // -> HTMLElement로 지정
      const { className } = event.target as HTMLElement

      className === 'remove' ? deleteTodo(id) : completeTodo(id)
    }
  })

  this.render(state)
}
