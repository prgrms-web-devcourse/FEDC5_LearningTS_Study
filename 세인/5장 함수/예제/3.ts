export type CodeCracker = {
  attempts: number;
  makeGuess: (text: string, attempt: number) => string;
  validateGuess: (guess: string) => boolean;
}

export function createCodeCracker({
  attempts,
  makeGuess,
  validateGuess
}: CodeCracker) {
  return (text: string) => {
    for (let i = 0; i < attempts; i += 1) {
      const guess = makeGuess(text, i);
      if(validateGuess(guess)) return guess;
    }

    return undefined;
  }
}