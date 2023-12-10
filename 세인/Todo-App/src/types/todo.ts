// storage가 비어있을 수 있기 때문에 유니언 타입 사용
// 이부분이 필요할까?
export type Todo = TodoItem[] | []

export interface TodoItem {
  text: string
  isCompleted: boolean
}

export interface CommonProps {
  $target: HTMLDivElement
}

export interface TodoFormProps extends CommonProps {
  createTodo: (text: string) => void
}

export interface TodoCountProps extends CommonProps {
  state: TodoItem[]
}

export interface TodoListProps extends CommonProps {
  state: Todo
  completeTodo: (id: number) => void
  deleteTodo: (id: number) => void
}
