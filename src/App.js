import Header from './components/Header.js';
import createTodo from './components/createTodoInput.js';
import TodoList from './components/TodoList.js';
import TodoCounter from './components/TodoCounter.js';
const HEADER_TITLE = 'TODO LIST';
export default class App {
    constructor({ $app, initialState }) {
        this.$app = $app;
        this.state = initialState;
        new Header({
            $app: this.$app,
            title: HEADER_TITLE,
        });
        new createTodo({
            $app: this.$app,
            onSubmit: (text) => {
                const nextState = makeNextState(text);
                this.state = nextState;
                todoList.setState(nextState);
                todoCounter.setState(nextState);
            },
        });
        const todoList = new TodoList({
            $app: this.$app,
            initialState: this.state,
            updateTodoCounter: (nextState) => {
                todoCounter.setState(nextState);
            },
            onRemoveTodo: (id) => {
                const nextState = this.state.filter((todo) => todo.id !== id);
                this.state = nextState;
                todoList.setState(nextState);
                todoCounter.setState(nextState);
            },
            onToggleTodo: (id) => {
                const nextState = this.state.map((todo) => {
                    if (todo.id === id) {
                        return {
                            ...todo,
                            isCompleted: !todo.isCompleted,
                        };
                    }
                    return todo;
                });
                this.state = nextState;
                todoList.setState(nextState);
                todoCounter.setState(nextState);
            },
        });
        const todoCounter = new TodoCounter({
            $app: this.$app,
            initialState: this.state,
        });
        const makeNextState = (text) => {
            console.log(this.state);
            const nextState = [
                ...this.state,
                {
                    isCompleted: false,
                    title: text,
                    id: new Date().getTime().toString(),
                },
            ];
            this.state = nextState;
            return nextState;
        };
    }
}
