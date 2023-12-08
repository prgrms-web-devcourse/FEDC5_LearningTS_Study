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
                const nextState = this.makeNextState(text);
                this.state = nextState;
                todoList.setState(nextState);
            },
        });
        const todoList = new TodoList({
            $app: this.$app,
            todoInitialState: this.state,
            updateTodoCounter: (nextState) => {
                todoCounter.setState(nextState);
            },
        });
        const todoCounter = new TodoCounter({
            $app: this.$app,
            initialState: this.state,
        });
    }
    makeNextState(text) {
        const nextState = [
            ...this.state,
            {
                isCompleted: false,
                title: text,
                id: new Date().getTime().toString(),
            },
        ];
        return nextState;
    }
}
