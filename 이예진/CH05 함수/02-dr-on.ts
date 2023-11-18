// Write your createAdvancedCipher function here! ✨
// You'll need to export it so the tests can run it.

/*
develop a createAdvancedCipher function. 
It is similar to the previous createCipher function, 
but instead of taking in one function parameter, it takes in three. 
One for vowels, one for consonants, and one for punctuation. 모음, 자음, 구두점

return function!
*/

type FuncReturnStr = (params: string) => string;
export function createAdvancedCipher(
  onVowels: FuncReturnStr,
  onConsonants: FuncReturnStr,
  onPunctations: FuncReturnStr
) {
  return (text: string) => {
    let result = "";
    for (const ch of text) {
      if (/[aeiou]/i.exec(ch)) {
        result += onVowels(ch);
      } else if (/[bcdfghjklmnpqrstvwxyz]/i.exec(ch)) {
        result += onConsonants(ch);
      } else {
        result += onPunctations(ch);
      }
    }
    return result;
  };
}

//npm run test -- 2 --watch
//passed
