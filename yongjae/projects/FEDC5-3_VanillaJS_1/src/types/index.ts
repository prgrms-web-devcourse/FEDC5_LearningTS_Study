export interface Todo {
  text: string;
  id: string;
  isCompleted: boolean;
}
export type Todos = Todo[];

// 컴포넌트 구조 typing
interface CoreComponentContext<T> {
  state?: T;
  setState?: (nextState: T) => void;
  render: () => void;
}
type StatefulComponentContext<T> = {
  [K in keyof CoreComponentContext<T>]-?: CoreComponentContext<T>[K];
};
type StatelessComponentContext<T> = Omit<
  CoreComponentContext<T>,
  "state" | "setState"
>;
export type TodoComponentContext = CoreComponentContext<Todos>;
export type TodoComponentStatefulContext = StatefulComponentContext<Todos>;
export type TodoComponentStatelessContext = StatelessComponentContext<Todos>;

export interface CoreComponentProps {
  $target: HTMLElement;
}

export interface StatefulComponentProps<T> extends CoreComponentProps {
  initialState: T;
}

export type TodoComponentStatefulProps<T = {}> =
  StatefulComponentProps<Todos> & {
    [K in keyof T]: T[K];
  };
export type TodoComponentStatelessProps<T> = CoreComponentProps & {
  [K in keyof T]: T[K];
};
