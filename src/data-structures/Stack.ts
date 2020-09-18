interface Todo {
  id: number;
  todo: string;
  due: number;
  complete: boolean;
}

interface IStack {
  [propName: string]: Todo;
}

class Stack {
  private _size: number = 0;
  private _stack: IStack = {};

  push(todo: Todo): number {
    this._size++;
    this._stack[this._size] = todo;
    return this._size;
  }

  pop(): Todo | null {
    if (this._size > 0) {
      const person = this._stack[this._size];
      delete this._stack[this._size];
      this._size--;
      return person;
    } else {
      return null;
    }
  }

  get list(): IStack {
    return this._stack;
  }

  get size(): number {
    return this._size;
  }
}

// PLAYGROUND
const stack = new Stack();
console.log('New Stack:', stack);

let stackSize = stack.push({
  id: Date.now(),
  todo: 'Learn to fly',
  due: 20200928,
  complete: false
});
console.log('size:', stackSize);
console.log(stack.list);

stackSize = stack.push({
  id: Date.now(),
  todo: 'Learn to teleport',
  due: 20200928,
  complete: false
});
console.log('size:', stackSize);
console.log(stack.list);

let stackPopped = stack.pop();
console.log('popped', stackPopped);
console.log(stack.list);

stackPopped = stack.pop();
console.log('popped', stackPopped);
console.log(stack.list);

stackPopped = stack.pop();
console.log('popped', stackPopped);
console.log(stack.list);
