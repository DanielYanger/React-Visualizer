export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) {
    return animations;
  }
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(array, start, end, animations) {
  if (start >= end) {
    return;
  }
  let pivot = start,
    left = start + 1,
    right = end;

  while (right >= left) {
    if (array[right] < array[pivot] && array[left] > array[pivot]) {
      animations.push([left, right]);
      animations.push([left, right]);
      animations.push([left, array[right]]);
      animations.push([right, array[left]]);

      let temp = array[right];
      array[right] = array[left];
      array[left] = temp;
    }
    if (array[right] >= array[pivot]) {
      right--;
    }
    if (array[left] <= array[pivot]) {
      left++;
    }
  }
  if (pivot !== right) {
    animations.push([pivot, right]);
    animations.push([pivot, right]);
    animations.push([pivot, array[right]]);
    animations.push([right, array[pivot]]);

    let temp = array[right];
    array[right] = array[pivot];
    array[pivot] = temp;
  }
  quickSortHelper(array, start, right - 1, animations);
  quickSortHelper(array, right + 1, end, animations);
}
