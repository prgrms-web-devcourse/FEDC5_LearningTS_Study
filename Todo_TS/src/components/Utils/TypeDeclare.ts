export type MainParamsType = {
  $target: HTMLElement | null;
  initialState: any[];
};

export type HeaderParamsType = {
  $target: HTMLElement | null;
  text: string;
};

export type InputParamsType = {
  $target: HTMLElement | null;
  onSubmit: (text: string) => void;
};

export type StateType = EachStateType[];

export type EachStateType = {
  text: string;
  isCompleted: boolean;
};

export type TodoListParamsType = {
  $target: HTMLElement | null;
  initialState: StateType | any[];
  toggleCheck: (id: number) => void;
  removeFunction: (id: number) => void;
};
