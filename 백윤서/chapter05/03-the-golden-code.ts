export interface CodeCracker {
  attempts: number;
  makeGuess: (text: string, attempt: number) => string;
  validateGuess: (guess: string) => boolean;
}

export function createCodeCracker(obj: CodeCracker) {
  const { attempts, makeGuess, validateGuess } = obj;
  return (text: string) => {
    for (let i = 0; i < attempts; i += 1) {
      const guessStr = makeGuess(text, i);
      if (validateGuess(guessStr)) return guessStr;
    }
    return undefined;
  }
}