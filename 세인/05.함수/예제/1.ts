export type Cipher = (text: string) => string;

export function createCipher(cipher: Cipher) {
  return (text: string) => {
		let result = "";

		for (const c of text) {
			result += cipher(c);
		}

		return result;
	};
}