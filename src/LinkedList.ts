interface ListNode {
  value: number;
  next: ListNode | null;
}

class LinkedList {
  private _head: ListNode | null;
  private _tail: ListNode | null;
  private _size: number = 0;

  constructor(value: number) {
    this._head = {
      value,
      next: null
    };
    this._tail = this._head;
    this._size++;
  }

  push(value: number): number {
    if (!this._head && !this._tail) {
      this._head = {
        value,
        next: null
      };
      this._tail = this._head;
      return ++this._size;
    }

    if (this._head && this._head === this._tail) {
      this._head.next = {
        value,
        next: null
      };
      this._tail = this._head.next;
    } else if (this._head) {
      let pointer = this._head;

      while (pointer.next) {
        pointer = pointer.next;
      }

      pointer.next = {
        value,
        next: null
      };
      this._tail = pointer.next;
    }

    return ++this._size;
  }

  pop(): ListNode | null {
    if (this._head && this._head === this._tail) {
      const popped = this._tail;
      this._head = null;
      this._tail = null;
      this._size--;
      return popped;
    } else if (this._head && this._head !== this._tail) {
      let lead = this._head;
      let prior = lead;
      while (lead.next) {
        prior = lead;
        lead = lead.next;
      }
      prior.next = null;
      this._tail = prior;
      this._size--;
      return lead;
    } else {
      return null;
    }
  }

  shift(): ListNode | null {
    if (this._head) {
      const shifted = this._head;
      if (this._head === this._tail) {
        this._head = null;
        this._tail = null;
      } else {
        this._head = this._head.next;
      }
      this._size--;

      shifted.next = null;
      return shifted;
    } else {
      return null;
    }
  }

  unshift(value: number): number {
    const node: ListNode = {
      value,
      next: this._head
    };
    if (!this._tail) {
      this._tail = node;
    }
    this._head = node;
    return ++this._size;
  }

  get(index: number, nodeWanted = true): ListNode | number | null | undefined {
    if (this._head && index >= 0 && index < this._size) {
      let count = 0;
      let pointer = this._head;
      while (count < index) {
        if (pointer.next) {
          pointer = pointer.next;
          count++;
        }
      }
      return nodeWanted ? pointer : pointer.value;
    } else if (!this._head) {
      return null;
    } else {
      return undefined;
    }
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

    const node: ListNode = {
      value,
      next: null
    };

    const prior = this.get(index - 1);
    if (prior && typeof prior === 'object') {
      const next = prior.next;
      prior.next = node;
      node.next = next;
      return ++this._size;
    }
  }

  remove(index: number): ListNode | undefined | null {
    if (index < 0 || index > this._size) return undefined;
    if (index === 0) return this.shift();
    if (index === this._size - 1) return this.pop();

    const prior = this.get(index - 1);
    if (prior && typeof prior === 'object' && prior.next) {
      const removed = prior.next;
      const next = removed.next;
      prior.next = next;
      this._size--;
      removed.next = null;
      return removed;
    }
  }

  reverse(): boolean {
    let current = this._head;
    this._head = this._tail;
    this._tail = current;
    let prev = null;
    let next;
    for (let i = 0; i < this._size; i++) {
      next = current?.next || null;
      if (current) current.next = prev;
      prev = current;
      if (current) current = next;
    }

    return true;
  }
}

// PLAYGROUND
const list = new LinkedList(Math.round(Math.random() * 1000));
// console.log('list:', JSON.stringify(list, null, 2));

let listSize = list.push(Math.round(Math.random() * 1000));
// console.log('list:', JSON.stringify(list, null, 2));

listSize = list.push(Math.round(Math.random() * 1000));
console.log('list:', JSON.stringify(list, null, 2));

console.log(list.reverse());

console.log('list:', JSON.stringify(list, null, 2));
