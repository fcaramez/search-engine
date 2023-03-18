export const calculatePageScore = (
  wordOccurance: number,
  totalWords: number
) => {
  return (wordOccurance * 100) / totalWords;
};
