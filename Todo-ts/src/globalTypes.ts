export type QuerySelectType<T> = T | null;

export type StateArray = StateArrayItem[];

export interface StateArrayItem {
  text: string;
  isCompleted: boolean;
}

export interface NewFuncParams {
  $target: HTMLElement;
  initialState: StateArray;
}
