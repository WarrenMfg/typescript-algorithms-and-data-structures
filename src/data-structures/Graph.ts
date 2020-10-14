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
}
