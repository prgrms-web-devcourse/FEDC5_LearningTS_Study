/* eslint-disable @typescript-eslint/no-explicit-any */
import TodoForm from './components/Todo/TodoForm.ts'
import TodoList from './components/Todo/TodoList.ts'
import TodoCount from './components/Todo/TodoCount.ts'
import Header from './components/common/Header.ts'
import { validateConstructorUsage } from './utils/validateConstructorUsage.js'
import { getItem, setItem } from './utils/storage.ts'
import { CommonProps, Todo, TodoItem } from './types/todo.ts'
import { v4 as uuidv4 } from 'uuid'

export default function App(this: any, { $target }: CommonProps) {
  validateConstructorUsage(new.target)
  const storageKey = 'todo'

  // state에 타입을 지정해야할까?
  // getItem으로 얻어지는 데이터를 통해 타입 추론이 되기때문에 필요 없는건가?
  this.state = getItem(storageKey, [])

  this.setState = (nextState: Todo) => {
    this.state = nextState
    setItem(storageKey, JSON.stringify(nextState))
    todoList.render(this.state)
    todoCount.render(this.state)
  }

  const createTodo = (text: string) => {
    // Todo 타입을 설정하지않으면 nextState 타입은 any이다.
    // 그래서 Todo 타입을 설정했는데 맞나..?
    const nextState: Todo = [
      ...this.state,
      {
        id: uuidv4(),
        text,
        isCompleted: false
      }
    ]
    this.setState(nextState)
  }

  const deleteTodo = (id: string) => {
    const nextState: Todo = this.state.filter(
      (todo: TodoItem) => todo.id !== id
    )
    this.setState(nextState)
  }

  const completeTodo = (id: string) => {
    const nextState: Todo = this.state.map((todo) => {
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
