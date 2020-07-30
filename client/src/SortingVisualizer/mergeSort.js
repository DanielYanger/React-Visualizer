export const mergeSort = (array) => {
  if (array.length <= 1) {
    return array;
  }
  const middleIndex = Math.floor(array.length / 2);
  const firstHalf = mergeSort(array.slice(0, middleIndex));
  const backHalf = mergeSort(array.slice(middleIndex));
  const sortedArray = [];
  let i = 0,
    j = 0;
  while (i < firstHalf.length && j < backHalf.length) {
    if (firstHalf[i] < backHalf[j]) {
      sortedArray.push(firstHalf[i++]);
    } else {
      sortedArray.push(backHalf[j++]);
    }
  }
  while (i < firstHalf.length) {
    sortedArray.push(firstHalf[i++]);
  }
  while (j < backHalf.length) {
    sortedArray.push(backHalf[j++]);
  }
  return sortedArray;
};
