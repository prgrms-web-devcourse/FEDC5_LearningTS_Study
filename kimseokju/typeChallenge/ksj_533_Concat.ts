// 533・Concat
// type Concat<T, U> = T & U
// type Concat<T, U> = T | U
// 너무 날로먹을라고 했네;

// 일단 둘 다 배열으로 들어온다 -> 뭐해야하나? [] 배열검사
type Concat<T extends readonly any[], U extends readonly any[]> = [...T, ...U]; //<< 엥 이거 왜 됨? 근데 하나 오류난다. readonly가 또 말썽이네
// 타입도 전개 연산자로 연산이 가능하다는 것을 잊고 있었다.
// 우연하게 다시 발견했는데 이제 못 잊을 것 같다.
