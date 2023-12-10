import App from './components/App';
import { QuerySelectType } from './globalTypes';
import { storage } from './utils/storage';
import validation from './utils/validation';

export const $app: QuerySelectType<HTMLElement> =
  document.querySelector('.app');

const initialState = storage.getItem('todos', []);

new (App as any)({
  $target: $app,
  initialState: validation(initialState),
});
