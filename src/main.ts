import App from './App.js';
import { getItem } from './util/storage.js';
import { Todo } from './util/types.js';

const STORAGE_KEY = 'todo';

const $app = document.querySelector<HTMLDivElement>('#app')!;

const initialState = getItem<Todo>(STORAGE_KEY, []);

new App({
  $app,
  initialState,
});
