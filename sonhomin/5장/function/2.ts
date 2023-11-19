// Write your createCodeCracker function here! ✨
// You'll need to export it so the tests can run it.

type Cipher = (input: string) => string;

function createAdvancedCipher(
  onVowel: Cipher,
  onConsonant: Cipher,
  onPunctuation: Cipher
) {
  return (text: string) => {
    let result = "";
    for (const char of text) {
      if (/[aeiou]/i.test(char)) {
        result += onVowel(char);
      } else if (/[bcdfghjklmnpqrstvwxyz]/i.test(char)) {
        result += onConsonant(char);
      } else {
        result += onPunctuation(char);
      }
    }
    return result;
  };
}
