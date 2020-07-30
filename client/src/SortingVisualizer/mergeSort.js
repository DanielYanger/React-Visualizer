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

export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxArray, animations) {
  if (startIdx === endIdx) {
    return;
  }
  const middleIndex = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxArray, startIdx, middleIndex, mainArray, animations);
  mergeSortHelper(auxArray, middleIndex + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIndex, endIdx, auxArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxArray, animations) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    //swap to red
    animations.push([i, j]);
    //swap to normal
    animations.push([i, j]);
    //determine swap
    if (auxArray[i] < auxArray[j]) {
      animations.push([k, auxArray[i]]);
      mainArray[k++] = auxArray[i++];
    } else {
      animations.push([k, auxArray[j]]);
      mainArray[k++] = auxArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxArray[i]]);
    mainArray[k++] = auxArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxArray[j]]);
    mainArray[k++] = auxArray[j++];
  }
}
