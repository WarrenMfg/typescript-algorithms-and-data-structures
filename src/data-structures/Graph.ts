interface IAdjacencyList {
  [key: string]: string[];
}

class Graph {
  private _adjacencyList: IAdjacencyList = {};
  constructor() {}

  _upsertProperty(v1: string, v2?: string): void {
    if (!this._adjacencyList.hasOwnProperty(v1)) this._adjacencyList[v1] = [];
    if (v2 && !this._adjacencyList.hasOwnProperty(v2))
      this._adjacencyList[v2] = [];
  }

  addVertex(vertex: string): boolean {
    if (this._adjacencyList.hasOwnProperty(vertex)) return false;
    this._adjacencyList[vertex] = [];
    return true;
  }

  addEdge(v1: string, v2: string): boolean {
    // if not a vertex, add it
    this._upsertProperty(v1, v2);

    // if one doesn't include the other, add it
    if (!this._adjacencyList[v1].includes(v2)) this._adjacencyList[v1].push(v2);
    if (!this._adjacencyList[v2].includes(v1)) this._adjacencyList[v2].push(v1);

    return true;
  }

  removeEdge(v1: string, v2: string): boolean {
    this._upsertProperty(v1, v2);

    [v1, v2].forEach((v, i, vArr) => {
      const curArr = this._adjacencyList[v];
      const otherV = vArr[vArr.length - i - 1];
      const found = curArr.indexOf(otherV);
      if (found > -1) {
        this._adjacencyList[v] = [
          ...curArr.slice(0, found),
          ...curArr.slice(found + 1)
        ];
      }
    });

    return true;
  }

  removeVertex(vertex: string): boolean {
    this._upsertProperty(vertex);

    while (this._adjacencyList[vertex].length) {
      const adjacentVertex = this._adjacencyList[vertex].pop() as string;
      this.removeEdge(vertex, adjacentVertex);
    }

    delete this._adjacencyList[vertex];
    return true;
  }

  dfs(start: string): string[] {
    if (!this._adjacencyList.hasOwnProperty(start)) return [];

    const result: string[] = [];
    const visited: { [key: string]: boolean } = {};

    const recurse = (v: string) => {
      if (visited[v]) return;
      result.push(v);
      visited[v] = true;

      const adjacentVertices = this._adjacencyList[v];
      for (let i = 0; i < adjacentVertices.length; i++) {
        recurse(adjacentVertices[i]);
      }
    };

    recurse(start);
    return result;
  }

  dfsIterative(start: string): string[] {
    if (!this._adjacencyList.hasOwnProperty(start)) return [];

    const result: string[] = [];
    const visited: { [key: string]: boolean } = {};
    let stack = [start];
    let vertex: string;

    while (stack.length) {
      vertex = stack.pop() as string;
      if (visited[vertex]) continue;

      result.push(vertex);
      visited[vertex] = true;

      stack = [...stack, ...this._adjacencyList[vertex]];
    }

    return result;
  }

  dfsFilter(start: string, filter: (v: string) => boolean): string[] {
    if (!this._adjacencyList.hasOwnProperty(start)) return [];

    const result: string[] = [];
    const visited: { [key: string]: boolean } = {};

    const recurse = (v: string) => {
      if (visited[v]) return;
      if (filter(v)) result.push(v);
      visited[v] = true;

      const adjacentVertices = this._adjacencyList[v];
      for (let i = 0; i < adjacentVertices.length; i++) {
        recurse(adjacentVertices[i]);
      }
    };

    recurse(start);
    return result;
  }

  bfs(start: string): string[] {
    if (!this._adjacencyList.hasOwnProperty(start)) return [];

    const result: string[] = [start];
    // can use a queue here
    let queue: string[] = [...this._adjacencyList[start]];
    let i = 0;
    const visited: { [key: string]: boolean } = {
      [start]: true
    };
    let child: string;

    while (i < queue.length) {
      child = queue[i];
      if (visited[child]) {
        i++;
        continue;
      } else {
        visited[child] = true;
        result.push(child);
        queue = [...queue, ...this._adjacencyList[child]];
        i++;
      }
    }

    return result;
  }
}
