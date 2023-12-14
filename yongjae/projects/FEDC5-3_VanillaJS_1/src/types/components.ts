import { Todo, Todos } from "./states";
// 컴포넌트 구조 typing
// 컴포넌트 Context

export type TodoComponentContext = {
  state?: Todos;
  setState?: (nextState: Todos) => void;
  render: () => void;
};
export type TodoComponentStatefulContext = {
  [K in keyof TodoComponentContext]-?: TodoComponentContext[K];
};

export type TodoComponentStatelessContext = Omit<
  TodoComponentContext,
  "state" | "setState"
>;

// 컴포넌트 Props
export interface CoreComponentProps {
  $target: HTMLElement;
}

interface TodoStatefulComponentProps extends CoreComponentProps {
  initialState: Todos;
}
export interface TodoItemProps extends CoreComponentProps {
  initialValue: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}
export interface TodoListProps extends TodoStatefulComponentProps {
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface TodoCountProps extends TodoStatefulComponentProps {}

export interface TodoFormProps extends CoreComponentProps {
  onSubmit: (text: string) => void;
}

export interface AppProps extends TodoStatefulComponentProps {}
export interface HeaderProps extends CoreComponentProps {
  text: string;
}
