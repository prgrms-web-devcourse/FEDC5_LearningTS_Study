export interface TodoType {
  text: string;
  id: string;
  isCompleted: boolean;
}
export type TodosType = TodoType[];

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
export type TodoComponentContext = CoreComponentContext<TodosType>;
export type TodoComponentStatefulContext = StatefulComponentContext<TodosType>;
export type TodoComponentStatelessContext =
  StatelessComponentContext<TodosType>;

export interface CoreComponentProps {
  $target: HTMLElement;
}

export interface StatefulComponentProps<T> extends CoreComponentProps {
  initialState: T;
}

export type TodoComponentStatefulProps<T = {}> =
  StatefulComponentProps<TodosType> & {
    [K in keyof T]: T[K];
  };
export type TodoComponentStatelessProps<T> = CoreComponentProps & {
  [K in keyof T]: T[K];
};
