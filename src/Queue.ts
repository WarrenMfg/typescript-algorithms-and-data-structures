interface Person {
  firstName: string;
  lastName: string;
  age: number;
}

interface IQueue {
  [propName: string]: Person;
}

class Queue {
  private _head = 0;
  private _tail = 0;
  private _queue: IQueue = {};

  constructor() {}

  enqueue(person: Person): boolean {
    this._queue[this._tail] = person;
    this._tail++;
    return true;
  }

  dequeue(): Person | null {
    if (this._tail > this._head) {
      const person = this._queue[this._head];
      delete this._queue[this._head];
      this._head++;
      return person;
    } else {
      return null;
    }
  }

  get list(): IQueue {
    return this._queue;
  }

  get size(): number {
    return this._tail - this._head;
  }
}

// PLAYGROUND
const queue = new Queue();
console.log('New Queue:', queue);
console.log('Size:', queue.size);

queue.enqueue({
  firstName: 'Jane',
  lastName: 'Doe',
  age: 38
});
console.log('Enqueued...');
console.log('List:', queue.list);
console.log('Size:', queue.size);

queue.enqueue({
  firstName: 'John',
  lastName: 'Doe',
  age: 36
});
console.log('Enqueued...');
console.log('List:', queue.list);
console.log('Size:', queue.size);

console.log('Dequeue:', queue.dequeue());
console.log('List:', queue.list);
console.log('Size:', queue.size);

console.log('Dequeue', queue.dequeue());
console.log('List:', queue.list);
console.log('Size:', queue.size);

console.log('Dequeue', queue.dequeue());
console.log('List:', queue.list);
console.log('Size:', queue.size);
