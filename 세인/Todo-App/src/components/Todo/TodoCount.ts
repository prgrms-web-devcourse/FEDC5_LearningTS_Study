import { RenderStateProps, TodoCountProps } from '../../types/todo.ts'
import { validateConstructorUsage } from '../../utils/validateConstructorUsage.js'
import { TodoItem } from '../../types/todo.ts'

export default function TodoCount(
  this: RenderStateProps,
  { $target, state }: TodoCountProps
) {
  validateConstructorUsage(new.target)

  const $todoCount = document.createElement('div')
  if ($todoCount) $todoCount.className = 'todo-count'

  if ($target) $target.appendChild($todoCount)

  this.render = (state: TodoItem[]) => {
    const completedTodos = state.filter((todo) => todo.isCompleted).length
    const totalCount = state.length

    $todoCount.innerHTML = `
      <p>Completed: ${completedTodos}</p>
      <p>Total Tasks: ${totalCount}</p>
    `
  }
  this.render(state)
}
