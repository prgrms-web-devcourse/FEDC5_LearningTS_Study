export type QuerySelectItem = HTMLElement | null;

export type StateArray = StateArrayItem[];

export interface StateArrayItem {
  text: string;
  isCompleted: boolean;
}

export interface NewFuncParams {
  $target: QuerySelectItem;
  initialState: StateArray;
}
