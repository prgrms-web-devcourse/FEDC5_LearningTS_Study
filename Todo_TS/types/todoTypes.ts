export interface IApp {
  $target: HTMLElement | null;
  initialState: ITodo[];
}
export interface ITodoHeader {
  $target: HTMLElement | null;
  text: string;
}
export interface ITodoForm {
  $target: HTMLElement | null;
  onSubmit: (text: string) => void;
}
export interface ITodoCount {
  $target: HTMLElement | null;
  initialState: ITodo[];
}

export interface ITodoList {
  $target: HTMLElement | null;
  initialState: ITodo[];
  handleComplete: (idx: number) => void;
  handleDelete: (idx: number) => void;
}

export interface ITodo {
  text: string;
  isCompleted: boolean;
  idx: number;
}

export interface ICreateTodo {
  $target: HTMLElement | null;
  element: 'li' | 'button';
  idx: number;
  text: string;
}
