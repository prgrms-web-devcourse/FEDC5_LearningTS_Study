// 15분 고민 후 정답 체크
// 일단 문제 자체에 대한 이해 부족이 큰 원인
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

/*
//예제 코드
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyPick<Todo, 'title' | 'completed'>

  const todo: TodoPreview = {
      title: 'Clean room',
      completed: false,
  }
*/

// 나름의 문제, 정답 해석
/*
T << 선택해야 하는 프로퍼티들을 담은 원본 타입
K << T의 `키`로 이루어진 혹은 T의 타입을 상속받은 유니언 타입

위 코드에서 예시를 들면 아래와 같은 코드가 생성된다.
{title: string, completed: boolean}

'title', 'completed' 와 일치하는 키값의 타입을 가져와서 새로운 타입을 생성한다.

*/
