import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoCount from './TodoCount';
import TodoHeader from './TodoHeader';
import { storageSetItem, storageGetItem } from '../utils/storage';
import { IApp, ITodo } from '../types/todoTypes';

const storageTodos = storageGetItem('todos', []);
let IDX: number =
  storageTodos && storageTodos.length > 0
    ? storageGetItem('todos', [])[storageTodos.length - 1].idx + 1
    : 0;

export default function App({ $target, initialState }: IApp) {
  const assignNewState = (nextTodos: ITodo[]) => {
    storageSetItem('todos', JSON.stringify(nextTodos));
    todoList.setState(nextTodos);
    todoList.state = nextTodos; //// todoList.setState에 state=nextState 할당 있는데 왜 또해야할까
    todoCount.render(nextTodos);
  };

  /// TodoHeader, TodoForm 은 여러번 호출되지 않고 그렇기 때문에 매번 새로운 인스턴스를 생성하지 않아도 되기 때문에, new 생성자를 사용하지 않고 호출하였다.
  TodoHeader({ $target, text: 'Todo List w/TS' });
  TodoForm({
    $target,
    onSubmit: (text: string) => {
      const nextState = [
        ...todoList.state,
        {
          text: text,
          isCompleted: false,
          idx: IDX,
        },
      ];
      IDX += 1;
      assignNewState(nextState);
    },
  });

  const todoList = TodoList({
    $target,
    initialState,
    handleComplete: (idx: number) => {
      const todos = storageGetItem('todos', []);
      todos.forEach((todo: ITodo) => {
        if (todo.idx === idx) {
          todo.isCompleted = !todo.isCompleted;
        }
      });
      assignNewState(todos);
    },
    handleDelete: (idx: number) => {
      const lastTodos = storageGetItem('todos', []).filter(
        (todo: ITodo) => todo.idx !== idx,
      );
      assignNewState(lastTodos);
    },
  });

  const todoCount = TodoCount({ $target, initialState });
}
