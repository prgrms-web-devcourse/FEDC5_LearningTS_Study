async function checkEmotion(knownEmotions, emotion) {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000); // 정답코드엔 return을 붙이던데 왜 ? ? ? ?
  });
  return knownEmotions.has(emotion);
  // Simulate database processing time by waiting a second...
  // setTimeout(() => {
  // 	callback(knownEmotions.has(emotion));
  // }, 1000);
}

async function speak(knownEmotions, newEmotion, phrase) {
  const hasEmotion = await checkEmotion(knownEmotions, newEmotion);
  if (hasEmotion) {
    return `"${phrase}" (${newEmotion})`;
  } else {
    throw new Error(`Does not compute. I do not understand ${newEmotion}.`);
  }
}

module.exports.checkEmotion = checkEmotion;
module.exports.speak = speak;
