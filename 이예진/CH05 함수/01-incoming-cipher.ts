// Write your createCipher function here! ✨
// You'll need to export it so the tests can run it.

/*
develop a createCipher function. Its sole parameter should be a "cipher" function that takes in a string and returns a string
// cipher 함수를 호출해서 string을 리턴받고, 모든 글자에 대해 리턴받은 값을 최종 리턴하는 createCipher함수
*/
type Cipher = (ch: string) => string;
/// 지금 코드로는 Cipher를 export 할 필요 없을 것 같다 !
export function createCipher(cipher: Cipher) {
  // tsc 컴파일 사용시 test에서 import 하는 코드가 있어서 export 해야함
  return (text: string) => {
    let result = "";

    for (let ch of text) {
      result += cipher(ch);
    }
    return result;
  };
}
