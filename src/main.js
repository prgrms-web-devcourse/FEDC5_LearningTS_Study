import App from './App.js';
import { getItem } from './util/storage.js';
const STORAGE_KEY = 'todo';
const $app = document.querySelector('#app');
const initialState = getItem(STORAGE_KEY, []);
new App({
    $app,
    initialState,
});
