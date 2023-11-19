// Write your createAdvancedCipher function here! ✨
// You'll need to export it so the tests can run it.

// 파라미터 3개
type Cipher = (type: string) => string;

export function createAdvancedCipher(
	onVowel: Cipher,
	onConsonant: Cipher,
	onPunctuation: Cipher
) {
	return (text: string) => {
		let result: string = "";
		for (const char of text) {
			// 아니 정규표현식을..
			const cipher = /[aeiou]/i.test(char)
				? onVowel
				: /[bcdfghjklmnpqrstvwxyz]/i.test(char)
				? onConsonant
				: onPunctuation;

			result += cipher(char);
		}

		return result;
	};
}
