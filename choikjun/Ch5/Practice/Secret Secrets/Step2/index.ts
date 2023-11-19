// Write your createAdvancedCipher function here! ✨
// You'll need to export it so the tests can run it.
export type Cipher = (c: string) => string;

export function createAdvancedCipher(
	onVowel: Cipher,
	onConsonant: Cipher,
	onPunctuation: Cipher
) {
	return (text: string) => {
		let result = "";

		for (const c of text) {
			const cipher = /[aeiou]/i.test(c)
				? onVowel
				: /[bcdfghjklmnpqrstvwxyz]/i.test(c)
				? onConsonant
				: onPunctuation;

			result += cipher(c);
		}

		return result;
	};
}
