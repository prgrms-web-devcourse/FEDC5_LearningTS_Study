/* eslint-disable @typescript-eslint/no-explicit-any */
import TodoForm from './components/Todo/TodoForm.ts'
import TodoList from './components/Todo/TodoList.ts'
import TodoCount from './components/Todo/TodoCount.ts'
import Header from './components/common/Header.ts'
import { validateConstructorUsage } from './utils/validateConstructorUsage.js'
import { getItem, setItem } from './storage.ts'
import { CommonProps, Todo } from './types/todo.ts'

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
        text,
        isCompleted: false
      }
    ]
    this.setState(nextState)
  }

  const deleteTodo = (id: number) => {
    // '_' 매개 변수는 암시적으로 'any' 형식이지만, 사용량에서 더 나은 형식을 유추할 수 있습니다.ts(7044)
    // -> unknown 설정??
    const nextState: Todo = this.state.filter(
      (_: unknown, index: number) => index !== id
    )
    this.setState(nextState)
  }

  const completeTodo = (id: number) => {
    const updateState: Todo = [...this.state]
    updateState[id].isCompleted = !updateState[id].isCompleted
    this.setState(updateState)
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
