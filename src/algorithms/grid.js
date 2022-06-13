//import Grid from "../PathfindingVisualizer/Grid";

class Node {
  constructor(x, y, neighbours = []) {
    this.x = x;
    this.y = y;
    this.neighbours = neighbours;
    this.distance = Infinity;
    this.prev = undefined;
  }

  addNeighbours(n) {
    this.neighbours = n;
  }
}

class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = new Array();

    for (let i = 0; i < width; ++i) {
      let temp = new Array();
      for (let j = 0; j < height; ++j) {
        let myNode = new Node(i, j);
        myNode.addNeighbours(this.generateNeighbours(myNode));
        temp.push(myNode);
      }
      this.grid.push(temp);
    }
  }

  generateNeighbours(node) {
    let neighbours = [];
    //there are 8 cases. 4 corner cases and 4 edge cases.
    //first find out if its valid at all
    if (node.x == 0) {
      //left
      if (node.y == 0) {
        //top left corner
        neighbours.push([node.x + 1, node.y]);
        neighbours.push([node.x + 1, node.y + 1]);
        neighbours.push([node.x, node.y + 1]);
      } else if (node.y == this.height - 1) {
        //bottom left
        neighbours.push([node.x + 1, node.y]);
        neighbours.push([node.x + 1, node.y - 1]);
        neighbours.push([node.x, node.y - 1]);
      } else {
        neighbours.push([node.x, node.y - 1]);
        neighbours.push([node.x + 1, node.y - 1]);
        neighbours.push([node.x + 1, node.y]);
        neighbours.push([node.x + 1, node.y + 1]);
        neighbours.push([node.x, node.y + 1]);
      }
    } else if (node.x == this.width - 1) {
      //right
      if (node.y == 0) {
        //top right
        neighbours.push([node.x - 1, node.y]);
        neighbours.push([node.x - 1, node.y + 1]);
        neighbours.push([node.x, node.y + 1]);
      } else if (node.y == this.height - 1) {
        //bottom right
        neighbours.push([node.x - 1, node.y]);
        neighbours.push([node.x - 1, node.y - 1]);
        neighbours.push([node.x, node.y - 1]);
      } else {
        neighbours.push([node.x, node.y - 1]);
        neighbours.push([node.x - 1, node.y - 1]);
        neighbours.push([node.x - 1, node.y]);
        neighbours.push([node.x - 1, node.y + 1]);
        neighbours.push([node.x, node.y + 1]);
      }
    } else if (node.y == 0) {
      //top
      neighbours.push([node.x - 1, node.y]);
      neighbours.push([node.x - 1, node.y + 1]);
      neighbours.push([node.x, node.y + 1]);
      neighbours.push([node.x + 1, node.y + 1]);
      neighbours.push([node.x + 1, node.y]);
    } else if (node.y == this.height - 1) {
      neighbours.push([node.x - 1, node.y]);
      neighbours.push([node.x - 1, node.y - 1]);
      neighbours.push([node.x, node.y - 1]);
      neighbours.push([node.x + 1, node.y - 1]);
      neighbours.push([node.x + 1, node.y]);
    } else {
      neighbours.push([node.x - 1, node.y]);
      neighbours.push([node.x - 1, node.y - 1]);
      neighbours.push([node.x, node.y - 1]);
      neighbours.push([node.x + 1, node.y - 1]);
      neighbours.push([node.x + 1, node.y]);
      neighbours.push([node.x + 1, node.y + 1]);
      neighbours.push([node.x, node.y + 1]);
      neighbours.push([node.x - 1, node.y + 1]);
    }

    return neighbours;
  }
}


