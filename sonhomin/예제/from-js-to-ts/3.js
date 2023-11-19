async function checkEmotion(knownEmotions, emotion, callback) {
  // Simulate database processing time by waiting a second...
  setTimeout(() => {
    callback(knownEmotions.has(emotion));
  }, 1000);

  await new Promise((resolve) => setTimeout(resolve, 1000));
  return knownEmotions.has(emotion);
}

async function speak(knownEmotions, newEmotion, phrase, callback) {
  checkEmotion(knownEmotions, newEmotion, (hasEmotion) => {
    if (hasEmotion) {
      callback(`"${phrase}" (${newEmotion})`);
    } else {
      callback(
        undefined,
        new Error(`Does not compute. I do not understand ${newEmotion}.`)
      );
    }
  });
}

module.exports.checkEmotion = checkEmotion;
module.exports.speak = speak;

// callback에 대한 정의가 잘 안된다.
