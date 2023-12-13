export interface TodoItem {
export type StorageKey = "todo" | "count";

  text: string;
  isCompleted: boolean;
}

export interface TodoCount {
  total: number;
  done: number;
}