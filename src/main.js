import App from './App.js';
import { getItem } from './util/storage.js';
const STORAGE_KEY = 'todo';
const $app = document.querySelector('#app');
const todoInitialState = getItem(STORAGE_KEY, []);
// 여기서 as Todo[]를 안해도 에러가 발생하지 않지만 getItem의 반환값이 Todo[]라는 것을
// 명시적으로 알려주기 위해  as Todo[]를 사용했습니다.
new App({
    $app,
    initialState: todoInitialState,
});
