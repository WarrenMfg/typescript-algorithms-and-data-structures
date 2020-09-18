const binarySearch = (array: number[], target: number): number | null => {
  let left = 0;
  let right = array.length - 1;
  let mid = Math.floor((right + left) / 2);

  while (array[mid] !== target && left <= right) {
    if (target < array[mid]) right = mid - 1;
    else left = mid + 1;

    mid = Math.floor((right + left) / 2);
  }

  return array[mid] === target ? mid : null;
};
