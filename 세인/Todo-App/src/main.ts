import App from './App.ts'

const $target: HTMLDivElement | null = document.querySelector('#app')

if ($target) {
  new App({
    $target
  })
}
