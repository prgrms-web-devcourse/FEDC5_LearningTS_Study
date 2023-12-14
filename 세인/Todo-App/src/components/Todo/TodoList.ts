import { RenderStateProps, TodoItem, TodoListProps } from '../../types/todo.ts'
import { validateConstructorUsage } from '../../utils/validateConstructorUsage.js'

export default function TodoList(
  this: RenderStateProps,
  { $target, state, completeTodo, deleteTodo }: TodoListProps
) {
  validateConstructorUsage(new.target)

  const $todoList = document.createElement('div')
  if ($todoList && $target) $target.appendChild($todoList)

  this.render = (state: TodoItem[]) => {
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
      const { className } = event.target as HTMLElement

      className === 'remove' ? deleteTodo($li.id) : completeTodo($li.id)
    }
  })

  this.render(state)
}
