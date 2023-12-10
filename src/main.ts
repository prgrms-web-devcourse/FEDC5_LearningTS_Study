import App from './App';
import { QuerySelectItem } from './Type';
import { storage } from './storage';
import validation from './validation';

const $app: QuerySelectItem = document.querySelector('.app');

const initialState = storage.getItem('todos', []);

new App({
  $target: $app,
  initialState: validation(initialState),
});
