async function checkEmotion(knownEmotions, emotion) {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
    /// setTimeout은 고유 timeoutID를 반환한다. 하지만 여기서 해당값을 쓰지 않으니까 return을 둘 필욘 없을 듯!
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
