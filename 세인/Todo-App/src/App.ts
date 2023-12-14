import TodoForm from './components/Todo/TodoForm.ts'
import TodoList from './components/Todo/TodoList.ts'
import TodoCount from './components/Todo/TodoCount.ts'
import Header from './components/common/Header.ts'
import { validateConstructorUsage } from './utils/validateConstructorUsage.js'
import { getItem, setItem } from './utils/storage.ts'
import { CommonProps, TodoItem, AppProps } from './types/todo.ts'
import { v4 as uuidv4 } from 'uuid'

export default function App(this: AppProps, { $target }: CommonProps) {
  validateConstructorUsage(new.target)
  const storageKey = 'todo'

  this.state = getItem(storageKey, [])

  this.setState = (nextState: TodoItem[]) => {
    this.state = nextState
    setItem(storageKey, JSON.stringify(nextState))
    todoList.render(this.state)
    todoCount.render(this.state)
  }

  const createTodo = (text: string) => {
    const nextState = [
      ...this.state,
      {
        id: uuidv4() as string,
        text,
        isCompleted: false
      }
    ]
    this.setState(nextState)
  }

  const deleteTodo = (id: string) => {
    const nextState = this.state.filter((todo: TodoItem) => todo.id !== id)
    this.setState(nextState)
  }

  const completeTodo = (id: string) => {
    const nextState = this.state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted
        }
      }
      return todo
    })
    this.setState(nextState)
  }

  new Header({ $target })

  new TodoForm({
    $target,
    createTodo
  })

  const todoList = new TodoList({
    $target,
    state: this.state,
    deleteTodo,
    completeTodo
  })

  const todoCount = new TodoCount({
    $target,
    state: this.state
  })
}
