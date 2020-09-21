function mergeSort(array: number[]): number[] {
  if (array.length <= 1) return array;

  const mid = Math.floor(array.length / 2);
  const leftArr = mergeSort(array.slice(0, mid));
  const rightArr = mergeSort(array.slice(mid));

  let left = 0;
  let right = 0;
  const sorted: number[] = [];
  while (left < leftArr.length && right < rightArr.length) {
    if (leftArr[left] < rightArr[right]) {
      sorted.push(leftArr[left]);
      left++;
    } else if (rightArr[right] < leftArr[left]) {
      sorted.push(rightArr[right]);
      right++;
    } else {
      sorted.push(leftArr[left]);
      left++;
      sorted.push(rightArr[right]);
      right++;
    }
  }

  // only one of these will run
  while (left < leftArr.length) {
    sorted.push(leftArr[left]);
    left++;
  }

  while (right < rightArr.length) {
    sorted.push(rightArr[right]);
    right++;
  }

  return sorted;
}
