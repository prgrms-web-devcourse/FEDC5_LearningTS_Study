// Write your createCipher function here! ✨
// You'll need to export it so the tests can run it.

// 텍스트 인코더 만드는 함수구현
// createCipher 함수구현해라

// 매개변수 사용

// cipher : 문자열을 받아 다른 문자열 반환

// 함수 반환
{
  type Cipher = (input: string) => string;

  function createCipher(callback: Cipher) {
    return (text: string) => {
      let result = "";
      for (const char of text) {
        result += callback(char);
      }
      return result;
    };
  }
}

// text라는 문자열을 받아서 문자열을 반환하는 함수를 반환하는 함수

// 근데 코드에서 질문인데 text는 어디서 받아오는거지??
