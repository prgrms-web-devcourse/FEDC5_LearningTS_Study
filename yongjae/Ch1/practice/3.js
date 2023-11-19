// Put your checkEmotion and speak functions here! ✨
// See ./original.js for their older JavaScript code.
// 03 Callbacks to Async Await
// 최용재
async function checkEmotion(knownEmotions, emotion) {
	await new Promise((resolve) => {
		setTimeout(resolve, 1000);
	});
	return knownEmotions.has(emotion);
}

async function speak(knownEmotions, newEmotion, phrase) {
	if (await checkEmotion(knownEmotions, newEmotion)) {
		return `"${phrase}" (${newEmotion})`;
	} else {
		throw new Error(`Does not compute. I do not understand ${newEmotion}.`);
	}
}
module.exports.checkEmotion = checkEmotion;
module.exports.speak = speak;
