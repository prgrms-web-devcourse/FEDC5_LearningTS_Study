/* eslint-disable @typescript-eslint/no-explicit-any */
import { Todo, TodoCountProps } from '../../types/todo.ts'
import { validateConstructorUsage } from '../../utils/validateConstructorUsage.js'

export default function TodoCount(
  this: any,
  { $target, state }: TodoCountProps
) {
  validateConstructorUsage(new.target)

  const $todoCount = document.createElement('div') as HTMLDivElement
  $todoCount.className = 'todo-count'
  if ($target) $target.appendChild($todoCount)

  this.render = (state: Todo) => {
    const completedTodos = state.filter((todo) => todo.isCompleted).length
    const totalCount = state.length
    $todoCount.innerHTML = `
      <p>Completed: ${completedTodos}</p>
      <p>Total Tasks: ${totalCount}</p>
    `
  }
  this.render(state)
}
