export type UncertainElement = HTMLElement | null;

export type MainParamsType = {
  $target: UncertainElement;
  initialState: StateType;
};

export type HeaderParamsType = {
  $target: UncertainElement;
  text: string;
};

export type InputParamsType = {
  $target: UncertainElement;
  onSubmit: (text: string) => void;
};

export type StateType = EachStateType[];

export type EachStateType = {
  text: string;
  isCompleted: boolean;
};

export type TodoListParamsType = {
  $target: UncertainElement;
  initialState: StateType;
  toggleCheck: (id: number) => void;
  removeFunction: (id: number) => void;
};

export type TodoCount = MainParamsType;
