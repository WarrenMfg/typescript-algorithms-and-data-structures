import { PriorityQueue, IPriorityQueueNode } from './PriorityQueue';

interface IAdjacencyNodeList {
  [key: string]: INode[];
}

interface INode {
  node: string;
  weight: number;
}

interface IDistances {
  [key: string]: number;
}

interface IPrevious {
  [key: string]: number | null;
}

class WeightedGraph {
  private _adjacencyList: IAdjacencyNodeList = {};
  constructor() {}

  _newNodes(v1: string, v2: string, weight: number): INode[] {
    const v1Node = {
      node: v1,
      weight
    };
    const v2Node = {
      node: v2,
      weight
    };
    return [v1Node, v2Node];
  }

  _upsertProperty(v1: string, v2?: string): void {
    if (!this._adjacencyList.hasOwnProperty(v1)) this._adjacencyList[v1] = [];

    // check for v2 is needed for search methods
    if (v2 && !this._adjacencyList.hasOwnProperty(v2))
      this._adjacencyList[v2] = [];
  }

  addVertex(vertex: string): boolean {
    if (this._adjacencyList.hasOwnProperty(vertex)) return false;
    this._adjacencyList[vertex] = [];
    return true;
  }

  addEdge(v1: string, v2: string, weight: number): boolean {
    // if not a vertex, add it
    this._upsertProperty(v1, v2);

    const [v1Node, v2Node] = this._newNodes(v1, v2, weight);

    // if one doesn't include the other, add it
    if (!this._adjacencyList[v1].some(v => v.node === v2)) {
      this._adjacencyList[v1].push(v2Node);
    }
    if (!this._adjacencyList[v2].some(v => v.node === v1)) {
      this._adjacencyList[v2].push(v1Node);
    }

    return true;
  }

  dijkstra(start: string, end: string): string[] | boolean {
    if (
      !this._adjacencyList.hasOwnProperty(start) ||
      !this._adjacencyList.hasOwnProperty(end)
    ) {
      return false;
    }

    // initialize
    const shortestPath: string[] = [];
    const distances: IDistances = {};
    const pq = new PriorityQueue();
    const previous: IPrevious = {};
    const vertices = Object.keys(this._adjacencyList);
    for (let i = 0; i < vertices.length; i++) {
      if (vertices[i] === start) {
        distances[start] = 0;
        pq.enqueue(vertices[i], 0);
      } else {
        distances[vertices[i]] = Infinity;
        pq.enqueue(vertices[i], Infinity);
      }
      previous[vertices[i]] = null;
    }

    // find shortest distance
    let next: IPriorityQueueNode | undefined;
    let neighbors: INode[];
    let nextNeighbor: INode;
    let candidate: number;
    while ((next = pq.dequeue())) {
      // base case to build shortestPath (result)
      if (next.value === end) {
        let smallest = next.value;
        while (previous[smallest]) {
          shortestPath.push(smallest);
          smallest = previous[smallest];
        }
        return shortestPath.concat(smallest).reverse();
      }

      if (distances[next.value] < Infinity) {
        neighbors = this._adjacencyList[next.value];
        for (let neighbor in neighbors) {
          nextNeighbor = neighbors[neighbor];
          candidate = distances[next.value] + nextNeighbor.weight;
          if (candidate < distances[nextNeighbor.node]) {
            distances[nextNeighbor.node] = candidate;
            previous[nextNeighbor.node] = next.value;
            pq.enqueue(nextNeighbor.node, candidate);
          }
        }
      }
    }
    return false;
  }
}
