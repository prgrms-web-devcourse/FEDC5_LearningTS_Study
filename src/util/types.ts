export interface Todo {
  isCompleted: boolean;
  id: string;
  title: string;
}

export interface TodoBasicProps {
  $app: HTMLDivElement;
}

export interface InitialStateProps {
  initialState: Todo[];
}

export interface AppProps extends TodoBasicProps, InitialStateProps {}

export interface TodoCounterProps extends TodoBasicProps, InitialStateProps {}

export interface HeaderProps extends TodoBasicProps {
  title: string;
}

export interface createTodoProps extends TodoBasicProps {
  onSubmit: (text: string) => void;
}

export interface TodoListProps extends TodoBasicProps, InitialStateProps {
  updateTodoCounter: (nextState: Todo[]) => void;
  onRemoveTodo: (id: string) => void;
  onToggleTodo: (id: string) => void;
}

export type GetItem = <T>(key: 'todo', defaultValue: T[]) => T[];
export type SetItem = (key: 'todo', value: string) => void;
