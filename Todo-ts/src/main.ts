import App from './components/App';
import { QuerySelectItem } from './globalTypes';
import { storage } from './utils/storage';
import validation from './utils/validation';

const $app: QuerySelectItem = document.querySelector('.app');

const initialState = storage.getItem('todos', []);

new App({
  $target: $app,
  initialState: validation(initialState),
});
