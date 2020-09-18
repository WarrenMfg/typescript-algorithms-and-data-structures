interface Tree {
  value: number;
  left: null | Tree;
  right: null | Tree;
}

interface BSTInterface extends Tree {
  insert(value: number): boolean;
  contains(value: number): boolean;
  updateEachDFS(func: (val: number) => number, order?: string): boolean;
  updateEachBFS(func: (val: number) => number): boolean;
  filterDFS(
    filter: (val: number) => boolean,
    order?: string
  ): number[] | boolean;
  filterBFS(func: (val: number) => boolean): number[] | boolean;
}

interface TreeNodeConstructor {
  new (root: number): Tree;
}

interface BSTConstructor {
  new (root: number): BSTInterface;
}

const TreeNode: TreeNodeConstructor = class TreeNode {
  public value: number;
  public left: null | Tree;
  public right: null | Tree;
  constructor(node: number) {
    this.value = node;
    this.left = null;
    this.right = null;
  }
};

const BinarySearchTree: BSTConstructor = class BinarySearchTree
  implements BSTInterface {
  public value: number;
  public left: null | Tree;
  public right: null | Tree;
  constructor(node: number) {
    if (!Number.isFinite(node)) node = 0;
    this.value = node;
    this.left = null;
    this.right = null;
  }

  insert(value: number): boolean {
    if (!Number.isFinite(value)) return false;

    const recurse = (node: Tree): boolean => {
      if (value === node.value) return false;
      if (value < node.value) {
        if (node.left) return recurse(node.left);
        else {
          node.left = new TreeNode(value);
          return true;
        }
      } else {
        if (node.right) return recurse(node.right);
        else {
          node.right = new TreeNode(value);
          return true;
        }
      }
    };

    return recurse(this);
  }

  contains(value: number): boolean {
    if (!Number.isFinite(value)) return false;

    const recurse = (node: Tree): boolean => {
      if (node.value === value) return true;
      if (node.left) return recurse(node.left);
      if (node.right) return recurse(node.right);
      return false;
    };

    return recurse(this);
  }

  updateEachDFS(
    func: (val: number) => number,
    order: string = 'inorder'
  ): boolean {
    if (typeof func !== 'function') return false;
    // preorder DFS
    const preorder = (node: Tree): void => {
      node.value = func(node.value);
      if (node.left) preorder(node.left);
      if (node.right) preorder(node.right);
    };
    // postorder DFS
    const postorder = (node: Tree): void => {
      if (node.left) postorder(node.left);
      if (node.right) postorder(node.right);
      node.value = func(node.value);
    };
    // inorder DFS
    const inorder = (node: Tree): void => {
      if (node.left) inorder(node.left);
      node.value = func(node.value);
      if (node.right) inorder(node.right);
    };

    if (order === 'preorder') {
      preorder(this);
      return true;
    } else if (order === 'postorder') {
      postorder(this);
      return true;
    } else if (order === 'inorder') {
      inorder(this);
      return true;
    } else {
      return false;
    }
  }

  updateEachBFS(func: (val: number) => number): boolean {
    const trail: any[] = [this];
    let i = 0;
    while (i < trail.length) {
      trail[i].value = func(trail[i].value);
      if (trail[i].left) trail.push(trail[i].left);
      if (trail[i].right) trail.push(trail[i].right);
      i++;
    }

    return true;
  }

  filterDFS(
    filter: (val: number) => boolean,
    order: string = 'inorder'
  ): number[] | boolean {
    if (typeof filter !== 'function') return false;
    const result: number[] = [];
    // preorder DFS
    const preorder = (node: Tree): void => {
      if (filter(node.value)) result.push(node.value);
      if (node.left) preorder(node.left);
      if (node.right) preorder(node.right);
    };
    // postorder DFS
    const postorder = (node: Tree): void => {
      if (node.left) postorder(node.left);
      if (node.right) postorder(node.right);
      if (filter(node.value)) result.push(node.value);
    };
    // inorder DFS
    const inorder = (node: Tree): void => {
      if (node.left) inorder(node.left);
      if (filter(node.value)) result.push(node.value);
      if (node.right) inorder(node.right);
    };

    if (order === 'preorder') {
      preorder(this);
      return result;
    } else if (order === 'postorder') {
      postorder(this);
      return result;
    } else if (order === 'inorder') {
      inorder(this);
      return result;
    } else {
      return false;
    }
  }

  filterBFS(filter: (val: number) => boolean): number[] | boolean {
    if (typeof filter !== 'function') return false;

    const result: number[] = [];
    const trail: any[] = [this];
    let i = 0;
    while (i < trail.length) {
      if (filter(trail[i].value)) result.push(trail[i].value);
      if (trail[i].left) trail.push(trail[i].left);
      if (trail[i].right) trail.push(trail[i].right);
      i++;
    }

    return result;
  }
};

// ⚪️ PLAYGROUND

// const bst: BSTInterface = new BinarySearchTree(50);
// bst.contains(50);
// bst.insert(25);
// bst.insert(75);
// bst.insert(33);
// bst.insert(15);
// bst.insert(66);
// bst.insert(100);

// bst.updateEachDFS(val => val * 2);
// bst.updateEachBFS(val => val / 2);
// bst.filterDFS(val => val % 2 === 0);
// bst.filterBFS(val => val % 2 !== 0);
