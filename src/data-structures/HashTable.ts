type Tuple = [string, any];
type Bucket = Tuple[];

class HashTable {
  private _keyMap: Bucket[];
  private _count: number = 0;

  constructor(private _length: number = 5) {
    this._keyMap = new Array(_length);
  }

  _hash(key: string): number {
    let total = 0;
    let PRIME = 31;
    let min = Math.min(key.length, 100);
    for (let i = 0; i < min; i++) {
      let value = key[i].charCodeAt(0) - 96;
      total = (total * PRIME + value) % this._length;
    }
    return total;
  }

  _double(): void {
    const oldKeyMap = this._keyMap.flat(1);
    this._length = this._length * 2;
    this._keyMap = new Array(this._length);
    this._count = 0;
    for (let i = 0; i < oldKeyMap.length; i++) {
      const key = oldKeyMap[i][0];
      const value = oldKeyMap[i][1];
      this.set(key, value);
    }
  }

  _halve(): void {
    const oldKeyMap = this._keyMap.flat(1);
    this._length = Math.round(this._length / 2);
    this._keyMap = new Array(this._length);
    this._count = 0;
    for (let i = 0; i < oldKeyMap.length; i++) {
      const key = oldKeyMap[i][0];
      const value = oldKeyMap[i][1];
      this.set(key, value);
    }
  }

  set(key: string, value: any): boolean {
    const index = this._hash(key);
    const bucket = this._keyMap[index];
    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        let tuple = bucket[i];
        if (tuple[0] === key) {
          tuple[1] = value;
          return true;
        }
      }
      bucket.push([key, value]);
    } else {
      this._keyMap[index] = [[key, value]];
    }

    this._count++;
    if (this._count / this._length >= 0.75) this._double();
    return true;
  }

  get(key: string): any | undefined {
    const index = this._hash(key);
    const bucket = this._keyMap[index];
    if (bucket?.length) {
      for (let i = 0; i < bucket.length; i++) {
        const tuple = bucket[i];
        if (tuple[0] === key) return tuple[1];
      }
    }
    return undefined;
  }

  delete(key: string): boolean {
    const index = this._hash(key);
    const bucket = this._keyMap[index];
    if (bucket?.length) {
      for (let i = 0; i < bucket.length; i++) {
        const tuple = bucket[i];
        if (tuple[0] === key) {
          const before = this._keyMap[index].slice(0, i);
          const after = this._keyMap[index].slice(i + 1);
          this._keyMap[index] = [...before, ...after];
          this._count--;
          if (this._count / this._length <= 0.25) this._halve();
          return true;
        }
      }
    }
    return false;
  }

  keys(): string[] {
    const k = [];
    const flat = this._keyMap.flat(1);
    for (let i = 0; i < flat.length; i++) {
      k.push(flat[i][0]);
    }
    return k;
  }

  values(): any[] {
    const v = [];
    const flat = this._keyMap.flat(1);
    for (let i = 0; i < flat.length; i++) {
      v.push(flat[i][1]);
    }
    return v;
  }
}

/*
other hashing functions:

function otherHashingFunction1(str: string, max: number): number {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};

function otherHashingFunction2(key: string, maxArrayLength: number): number {
  let total = 0;
  for (let char of key) {
    const value = char.charCodeAt(0) - 96;
    total = (total + value) % maxArrayLength;
  }
  return total;
}
*/
