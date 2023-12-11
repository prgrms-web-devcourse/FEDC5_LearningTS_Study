import { TodosType } from "../types/todo";
import { setItem } from "../utils/storage";
import { validateState } from "../utils/validateState";
import Header from "./Header";
import TodoCount from "./TodoCount";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

interface AppProps {
  $target: HTMLElement;
  initialState: TodosType;
}

// 임시 Context : this의 property를 정의하는 부분
interface AppContext {}
const App = function (this: AppContext, { $target, initialState }: AppProps) {
  // ...
  initialState = validateState(initialState);

  const syncState = (state: TodosType) => {
    const validatedState = validateState(state).map((val, idx) => ({
      ...val,
      id: idx,
    }));
    todoList.setState(validatedState);
    todoCount.setState(validatedState);
  };
  new Header({
    $target,
    text: "Renewed Todo List",
  });

  new TodoForm({
    $target,
    onSubmit: (text: string) => {
      const nextState = [
        ...todoList.state,
        { id: todoList.state.length, text, isCompleted: false },
      ];

      syncState(nextState);

      setItem("todos", nextState);
    },
  });

  const todoList = new TodoList({
    $target,
    initialState,
    onToggle: (todoId: number) => {
      const nextState = todoList.state.map((todo) => {
        if (todo.id === todoId) todo.isCompleted = !todo.isCompleted;
        return todo;
      });
      syncState(nextState);
    },
    onDelete: (todoId: number) => {
      const nextState = todoList.state.filter((todo) => {
        if (todo.id === todoId) return false;
        return true;
      });
      syncState(nextState);
    },
  });

  const todoCount = new TodoCount({
    $target,
    initialState,
  });
} as any as { new (props: AppProps): AppContext };

export default App;
