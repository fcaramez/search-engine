export const getWordOccurence = (
  word: string,
  wordsArray: string[] | undefined
) => {
  if (!wordsArray) {
    return null;
  }

  const wordsToFind = word.split(" ");

  const occurences: number[] = [];

  for (const word of wordsToFind) {
    console.log(word);

    occurences.push(wordsArray.filter((el: string) => word == el).length);
  }

  return occurences.reduce((acc, val) => acc + val);
};
