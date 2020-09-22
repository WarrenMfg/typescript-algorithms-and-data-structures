class MinBinaryHeap {
  private _values: number[];
  constructor() {
    this._values = [];
  }

  insert(value: number): number {
    // indices
    let child = this._values.push(value) - 1;
    let parent = Math.floor((child - 1) / 2);

    // bubble
    while (value < this._values[parent]) {
      const tempChild = this._values[parent];
      this._values[parent] = value;
      this._values[child] = tempChild;
      child = parent;
      parent = Math.floor((child - 1) / 2);
    }

    return this._values.length;
  }

  extractMin(): number | undefined {
    if (this._values.length <= 1) return this._values.pop();

    const min = this._values[0];
    this._values[0] = this._values.pop() as number;

    let parent = 0;

    while (true) {
      const left = 2 * parent + 1;
      const right = left + 1;

      const smallestChild =
        this._values[right] < this._values[left] ? right : left;

      if (this._values[smallestChild] < this._values[parent]) {
        const temp = this._values[parent];
        this._values[parent] = this._values[smallestChild];
        this._values[smallestChild] = temp;

        parent = smallestChild;
      } else {
        break;
      }
    }

    return min;
  }
}
