import { CommonProps } from '../../types/todo.ts'
import { validateConstructorUsage } from '../../utils/validateConstructorUsage.js'

export default function Header({ $target }: CommonProps) {
  validateConstructorUsage(new.target)

  const $header = document.createElement('div') as HTMLDivElement
  $header.className = 'header'

  if ($target) $target.appendChild($header)

  $header.innerHTML = `
    <h1>Todo List</h1>
  `
}
