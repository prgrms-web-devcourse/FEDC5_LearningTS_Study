// Write your createCipher function here! ✨
// You'll need to export it so the tests can run it.
// 파라미터 타입 cipher => string
type Cipher = (type: string) => string;

export function createCipher(cipher: Cipher) {
	return (text: string) => {
		let result: string = "";
		for (const char of text) {
			result += cipher(char);
		}

		return result;
	};
}
