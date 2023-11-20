export type ParamsType = (text: string) => string;

export function createAdvancedCipher(onVowel: ParamsType, onConsonant: ParamsType, onPunctuation: ParamsType) {
  return (text: string) => {
    let result = "";
    for (const alp of text) {
      const reg1 = /[aeiou]/i;
      const reg2 = /[bcdfghjklmnpqrstvwxyz]/i;
      if (reg1.test(alp)) result += onVowel(alp);
      else if (reg2.test(alp)) result += onConsonant(alp);
      else result += onPunctuation(alp);
    }
    return result;
  }
}