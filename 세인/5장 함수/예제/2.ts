export type Cipher = (text: string) => string;

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
