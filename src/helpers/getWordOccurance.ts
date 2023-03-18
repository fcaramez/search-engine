export const getWordOccurence = (
  word: string,
  wordsArray: string[] | undefined
): number => {
  if (!wordsArray) {
    return 0;
  }

  const wordsToFind = [...new Set(word.split(" "))];

  const occurences: number[] = [];

  for (const word of wordsToFind) {
    occurences.push(wordsArray.filter((el: string) => word == el).length);
  }

  return occurences.reduce((acc, val) => acc + val);
};
