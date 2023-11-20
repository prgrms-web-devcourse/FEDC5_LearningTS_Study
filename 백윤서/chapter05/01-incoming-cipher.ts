export type Cipher = (text: string) => string;

export function createCipher(cipher: Cipher) {
  return (text: string) => {
    let result = "";
    for (const alp of text) {
      result += cipher(alp);
    }
    return result;
  }
}