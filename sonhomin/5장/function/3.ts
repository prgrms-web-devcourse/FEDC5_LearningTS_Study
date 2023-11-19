// Write your createCodeCracker function here! ✨
// You'll need to export it so the tests can run it.

type CodeCracker = {
  attempts: number;
  makeGuess: (text: string, attempts: number) => string;
  validateGuess: (guess: string) => boolean;
};

function createCodeCracker({
  attempts,
  makeGuess,
  validateGuess,
}: CodeCracker) {
  return (text: string) => {
    for (let i = 0; i <= attempts; i++) {
      //반복적으로 추측하고
      const guess = makeGuess(text, i);
      if (validateGuess(guess)) {
        // 타당성을 검증해서 맞으면 반환한다.
        return guess;
      }
    }
  };
}
