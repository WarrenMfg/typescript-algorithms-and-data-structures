interface DLLNode {
  value: number;
  next: DLLNode | null;
  prev: DLLNode | null;
}

class DoublyLinkedList {
  private _head: DLLNode | null;
  private _tail: DLLNode | null;
  private _size: number = 0;

  constructor(value: number) {
    this._head = {
      value,
      next: null,
      prev: null
    };
    this._tail = this._head;
    this._size++;
  }

  push(value: number): number {
    const node: DLLNode = {
      value,
      next: null,
      prev: null
    };

    if (!this._head && !this._tail) {
      this._head = node;
      this._tail = this._head;
    } else if (this._head && this._tail) {
      this._tail.next = node;
      node.prev = this._tail;
      this._tail = node;
    }

    return ++this._size;
  }

  pop(): DLLNode | null {
    if (!this._tail) return null;

    const popped = this._tail;
    if (this._head === this._tail) {
      this._head = null;
      this._tail = null;
      this._size--;
      return popped;
    } else {
      this._tail = popped.prev;
      if (this._tail) this._tail.next = null;
      popped.prev = null;
      this._size--;
      return popped;
    }
  }

  shift(): DLLNode | null {
    if (!this._head) return null;

    const shifted = this._head;

    if (this._head === this._tail) {
      this._head = null;
      this._tail = null;
    } else {
      this._head = shifted.next;
      if (this._head) this._head.prev = null;
    }

    this._size--;
    shifted.next = null;
    return shifted;
  }

  unshift(value: number): number {
    const node: DLLNode = {
      value,
      next: this._head,
      prev: null
    };
    if (!this._tail) {
      this._tail = node;
    }
    if (this._head) this._head.prev = node;
    this._head = node;
    return ++this._size;
  }

  get(index: number, nodeWanted = true): DLLNode | number | null | undefined {
    if (!this._head) return null;
    if (index < 0 || index >= this._size) return undefined;

    let counter;
    let pointer;

    // start from head
    if (index <= this._size / 2) {
      counter = 0;
      pointer = this._head;
      while (counter !== index) {
        pointer = pointer!.next;
        counter++;
      }

      // start from tail
    } else {
      counter = this._size - 1;
      pointer = this._tail;
      while (counter !== index) {
        pointer = pointer!.prev;
        counter--;
      }
    }

    return nodeWanted ? pointer : pointer!.value;
  }

  set(index: number, value: number): boolean {
    const node = this.get(index);
    if (node && typeof node === 'object') {
      node.value = value;
      return true;
    } else {
      return false;
    }
  }

  insert(index: number, value: number): number | undefined | boolean {
    if (index < 0 || index > this._size) return undefined;
    if (index === 0) return this.unshift(value);
    if (index === this._size) return this.push(value);

    const node: DLLNode = {
      value,
      next: null,
      prev: null
    };

    const prior = this.get(index - 1);
    if (prior && typeof prior === 'object' && prior.next) {
      const next = prior.next;
      prior.next = node;
      node.prev = prior;
      node.next = next;
      next.prev = node;
      return ++this._size;
    }
  }

  remove(index: number): DLLNode | undefined | null {
    if (index < 0 || index >= this._size) return undefined;
    if (index === 0) return this.shift();
    if (index === this._size - 1) return this.pop();

    const removed = this.get(index);
    if (
      removed &&
      typeof removed === 'object' &&
      removed.next &&
      removed.prev
    ) {
      const prior = removed.prev;
      const next = removed.next;
      prior.next = next;
      next.prev = prior;
      this._size--;
      removed.next = null;
      removed.prev = null;
      return removed;
    }
  }

  reverse(): boolean {
    const newHead = this._tail;
    this._tail = this._head;
    this._head = newHead;

    let pointer = this._head;
    while (pointer) {
      const temp = pointer.next;
      pointer.next = pointer.prev;
      pointer.prev = temp;
      pointer = pointer.next;
    }

    return true;
  }
}

// ⚪️ PLAYGROUND
const dll = new DoublyLinkedList(Math.round(Math.random() * 1000));
// console.log('list:', JSON.stringify(list, null, 2));

console.log('dll:', JSON.stringify(dll, null, 2));
