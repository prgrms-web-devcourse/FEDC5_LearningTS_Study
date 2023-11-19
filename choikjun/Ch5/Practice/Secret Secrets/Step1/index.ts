// Write your createCipher function here! ✨
// You'll need to export it so the tests can run it.
export type Cipher = (c: string) => string;

export function createCipher(cipher: Cipher) {
	return (text: string) => {
		let result = "";

		for (const c of text) {
			result += cipher(c);
		}

		return result;
	};
}
