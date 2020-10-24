export interface IPriorityQueueNode {
  value: any;
  priority: number;
  insertionTime: number;
}

export class PriorityQueue {
  private _values: IPriorityQueueNode[];
  constructor() {
    this._values = [];
  }

  _createNewNode(value: any, priority: number): IPriorityQueueNode {
    return {
      value,
      priority,
      insertionTime: Date.now()
    };
  }

  _canBubble(childIndex: number, parentIndex: number): boolean {
    if (!this._values[childIndex] || !this._values[parentIndex]) return false;

    if (
      this._values[childIndex].priority < this._values[parentIndex].priority
    ) {
      return true;
    } else if (
      this._values[childIndex].priority === this._values[parentIndex].priority
    ) {
      if (
        this._values[childIndex].insertionTime <
        this._values[parentIndex].insertionTime
      ) {
        return true;
      }
    }
    return false;
  }

  _findLowestPriorityChildIndex(leftIndex: number, rightIndex: number): number {
    if (this._values[leftIndex] && !this._values[rightIndex]) return leftIndex;
    if (this._values[rightIndex] && !this._values[leftIndex]) return rightIndex;
    if (!this._values[leftIndex] && !this._values[rightIndex]) return -1;

    if (this._values[leftIndex].priority < this._values[rightIndex].priority) {
      return leftIndex;
    } else if (
      this._values[leftIndex].priority === this._values[rightIndex].priority
    ) {
      if (
        this._values[leftIndex].insertionTime <
        this._values[rightIndex].insertionTime
      ) {
        return leftIndex;
      }
    }
    return rightIndex;
  }

  enqueue(value: any, priority: number): number {
    const newNode = this._createNewNode(value, priority);
    // indices
    let childIndex = this._values.push(newNode) - 1;
    let parentIndex = Math.floor((childIndex - 1) / 2);
    // bubble
    while (this._canBubble(childIndex, parentIndex)) {
      const tempChild = this._values[parentIndex];
      this._values[parentIndex] = newNode;
      this._values[childIndex] = tempChild;
      childIndex = parentIndex;
      parentIndex = Math.floor((childIndex - 1) / 2);
    }

    return this._values.length;
  }

  dequeue(): IPriorityQueueNode | undefined {
    if (this._values.length <= 1) return this._values.pop();

    const priority = this._values[0];
    this._values[0] = this._values.pop() as IPriorityQueueNode;

    let parentIndex = 0;

    while (true) {
      const leftIndex = 2 * parentIndex + 1;
      const rightIndex = leftIndex + 1;

      const lowestPriorityChildIndex = this._findLowestPriorityChildIndex(
        leftIndex,
        rightIndex
      );

      if (this._canBubble(lowestPriorityChildIndex, parentIndex)) {
        const temp = this._values[parentIndex];
        this._values[parentIndex] = this._values[lowestPriorityChildIndex];
        this._values[lowestPriorityChildIndex] = temp;

        parentIndex = lowestPriorityChildIndex;
      } else {
        break;
      }
    }

    return priority;
  }
}
