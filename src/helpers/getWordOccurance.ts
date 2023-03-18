export const getWordOccurence = (
  word: string,
  wordsArray: string[] | undefined
) => {
  if (!wordsArray) {
    return null;
  }
  return wordsArray.filter((el: string) => word == el).length;
};
