export type Todo = TodoItem[]

export interface TodoItem {
  id: string
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
  state: Todo
}

export interface TodoListProps extends CommonProps {
  state: Todo
  completeTodo: (id: string) => void
  deleteTodo: (id: string) => void
}
