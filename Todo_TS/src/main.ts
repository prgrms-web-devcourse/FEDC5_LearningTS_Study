import App from './App.js';
import { storageGetItem } from '../utils/storage.js';

const initialState = storageGetItem('todos', '');

const $app: HTMLElement | null = document.querySelector('.app');

App({
  $target: $app,
  initialState,
});
