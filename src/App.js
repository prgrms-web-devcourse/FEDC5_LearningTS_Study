function App({ $target, initialState }) {
  new Header({
    $target,
    text: 'Todo List'
  });

  new TodoForm({
    $target,
    onSubmit: text => {
      const nextState = [
        ...todoList.state,
        { text }
      ];
      todoList.setState(nextState);
      storage.setItem('todo', JSON.stringify(nextState));
    }
  });

  const todoList = new TodoList({
    $target,
    initialState
  });
}