export function getBubbleSortAnimations(array) {
  const animations = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i; j++) {
      animations.push([j, j + 1]);
      animations.push([j, j + 1]);
      if (array[j] > array[j + 1]) {
        animations.push([j, array[j + 1]]);
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      } else {
        animations.push([j, array[j]]);
      }
    }
  }
  return animations;
}
