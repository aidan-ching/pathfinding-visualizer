class Node {
    constructor(x, y, neighbours = []) {
      this.x = x;
      this.y = y;
      this.neighbours = neighbours;
      this.explored = false;
      this.path = false;
      this.distance = Infinity;
      this.prev = undefined;
      this.wall = false;
    }
  
    addNeighbours(n) {
      this.neighbours = n;
    }
  }

export { Node }