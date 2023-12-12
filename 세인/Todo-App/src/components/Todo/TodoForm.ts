/* eslint-disable @typescript-eslint/no-explicit-any */
import { TodoFormProps } from '../../types/todo.ts'
import { validateConstructorUsage } from '../../utils/validateConstructorUsage.js'

export default function TodoForm(
  this: any,
  { $target, createTodo }: TodoFormProps
) {
  validateConstructorUsage(new.target)

  const $form = document.createElement('form')
  if ($form) $form.className = 'todo-form'

  $target.appendChild($form)

  this.render = () => {
    $form.innerHTML = `
      <input type='text' name='todo' placeholder="할 일을 입력하세요!" />
      <button>Add</button>
    `
  }

  $form.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault()

    const $input = $form.querySelector<HTMLInputElement>('input[name=todo]')

    const text: string = $input ? $input.value : ''

    if (!text || text.trim() === '') {
      alert('내용을 입력하세요!')
      return
    }

    if ($input) {
      $input.value = ''
    }
    createTodo(text)
  })

  this.render()
}
