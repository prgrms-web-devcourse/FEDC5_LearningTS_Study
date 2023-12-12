import { CommonProps as Target } from '../../types/todo.ts'
import { validateConstructorUsage } from '../../utils/validateConstructorUsage.js'

export default function Header({ $target }: Target) {
  validateConstructorUsage(new.target)

  const $header = document.createElement('div')
  if ($header) $header.className = 'header'

  if ($target) $target.appendChild($header)

  $header.innerHTML = `
    <h1>Todo List</h1>
  `
}
