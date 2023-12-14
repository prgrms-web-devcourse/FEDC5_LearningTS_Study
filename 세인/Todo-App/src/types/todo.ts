export interface TodoItem {
  id: string
  text: string
  isCompleted: boolean
}
export interface CommonProps {
  $target: HTMLElement
}
export interface TodoFormProps extends CommonProps {
  createTodo: (text: string) => void
}

export interface TodoCountProps extends CommonProps {
  state: TodoItem[]
}

export interface TodoListProps extends CommonProps {
  state: TodoItem[]
  completeTodo: (id: string) => void
  deleteTodo: (id: string) => void
}

export interface RenderStateProps {
  render: ((state: TodoItem[]) => void) | (() => void)
}

export interface AppProps {
  state: TodoItem[]
  setState: (state: TodoItem[]) => void
}
