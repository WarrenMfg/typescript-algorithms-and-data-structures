interface IAdjacencyList {
  [key: string]: string[];
}

class Graph {
  private _adjacencyList: IAdjacencyList = {};
  constructor() {}

  addVertex(vertex: string): boolean {
    if (this._adjacencyList.hasOwnProperty(vertex)) return false;
    this._adjacencyList[vertex] = [];
    return true;
  }

  addEdge(v1: string, v2: string): boolean {
    // if not a vertex, addVertex
    if (!this._adjacencyList.hasOwnProperty(v1)) this.addVertex(v1);
    if (!this._adjacencyList.hasOwnProperty(v2)) this.addVertex(v2);

    // if one doesn't include the other, add it
    if (!this._adjacencyList[v1].includes(v2)) this._adjacencyList[v1].push(v2);
    if (!this._adjacencyList[v2].includes(v1)) this._adjacencyList[v2].push(v1);

    return true;
  }
}

// ⚪️ Playground
const g = new Graph();
g.addEdge('A', 'B');
g.addVertex('C');
g.addEdge('A', 'C');
