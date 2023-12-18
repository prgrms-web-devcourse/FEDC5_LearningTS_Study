export type StorageKey = "todo" | "count";

export type TodoList = TodoItem[];

interface TodoItem {
  text: string;
  isCompleted: boolean;
}

export interface TodoCount {
  total: number;
  done: number;
}
