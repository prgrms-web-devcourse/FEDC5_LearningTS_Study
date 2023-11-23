// 문제 이상하게 읽고 삽질
// class MyReadonly<T> {
//   constructor(private title:string, private description: string){}
// }
// type MyReadonly<T> = {
//   readonly title: string;
//   readonly description: string;
// }

// 반쪽짜리 풀이
type MyReadonly<T> = {
  readonly [key in keyof T]: T[key];
};

/*
// 예제 코드
interface Todo {
    title: string
    description: string
}

const todo: MyReadonly<Todo> = {
    title: "Hey",
    description: "foobar"
}

todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property
*/

// 읽기 전용으로 모든 타입을 재선언 해주어야 함.
// 그러면 들어온 타입을 다시 readonly로 선언해서 내보내줘야함.
// keyof T를 반복하며 새로운 속성을 생성하고
// T[key]에 새로운 타입을 할당?한다.
// 예제 코드에서 설명해보자 몽총아.

/*
    일단 Todo의 타입이 들어오고
    keyof T가 들어온 타입의 각 키를 순회하는거야

    순회하면서 첫번째로
    readonly title이 들어가겠지? 그러면 : 연산자 뒤에는 T[title]가 되는데 T[title]은 뭐다? string이다.
    그러면 결론적으로 이 코드가 어떻게 되냐? readonly title: string이 된다 이말이야.
    두 번째로
    readonly description이 들어가겠지? 그러면 : 연산자 뒤에는 T[description]이 되는데 T[description]은 뭐다? string이다.
    그러면 이 코드는? readonly description: string이 되는 거다!
    그걸 합쳐서 반환하면 뭐다? 아래와 같은 readonly로 구성된 새로운 타입이 나오는거야!
    {
        readonly title: string
        readonly description: string
    }
*/
