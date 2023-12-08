export interface Todo {
  isCompleted: boolean;
  id: string;
  title: string;
}

export interface AppProps {
  $app: HTMLDivElement;
  initialState: Todo[];
}

export interface HeaderProps {
  $app: HTMLDivElement;
  title: string;
}

export interface createTodoProps {
  $app: HTMLDivElement;
  onSubmit: (text: string) => void;
}

export interface TodoListProps {
  $app: HTMLElement;
  todoInitialState: Todo[];
  updateTodoCounter: (nextState: Todo[]) => void;
}

export interface TodoCounterProps {
  $app: HTMLDivElement;
  initialState: Todo[];
}
