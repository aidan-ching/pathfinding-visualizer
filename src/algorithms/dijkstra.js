class Node {
  constructor(x, y, neighbours = []) {
    this.x = x;
    this.y = y;
    this.neighbours = neighbours;
    this.explored = false;
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
    this.start = ([-1,-1]);
    this.end = ([-1,-1]);

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
        neighbours.push([node.x, node.y + 1]);
      } else if (node.y == this.height - 1) {
        //bottom left
        neighbours.push([node.x + 1, node.y]);
        neighbours.push([node.x, node.y - 1]);
      } else {
        neighbours.push([node.x, node.y - 1]);
        neighbours.push([node.x + 1, node.y]);
        neighbours.push([node.x, node.y + 1]);
      }
    } else if (node.x == this.width - 1) {
      //right
      if (node.y == 0) {
        //top right
        neighbours.push([node.x - 1, node.y]);
        neighbours.push([node.x, node.y + 1]);
      } else if (node.y == this.height - 1) {
        //bottom right
        neighbours.push([node.x - 1, node.y]);
        neighbours.push([node.x, node.y - 1]);
      } else {
        neighbours.push([node.x, node.y - 1]);
        neighbours.push([node.x - 1, node.y]);
        neighbours.push([node.x, node.y + 1]);
      }
    } else if (node.y == 0) {
      //top
      neighbours.push([node.x - 1, node.y]);
      neighbours.push([node.x, node.y + 1]);
      neighbours.push([node.x + 1, node.y]);
    } else if (node.y == this.height - 1) {
      neighbours.push([node.x - 1, node.y]);
      neighbours.push([node.x, node.y - 1]);
      neighbours.push([node.x + 1, node.y]);
    } else {
      neighbours.push([node.x - 1, node.y]);
      neighbours.push([node.x, node.y - 1]);
      neighbours.push([node.x + 1, node.y]);
      neighbours.push([node.x, node.y + 1]);
    }

    return neighbours;
  }

  setStart(start){
    this.start = start;
  }

  setEnd(end){
    this.end = end;
  }
}

function dijkstra(grid, start) {
  let q = [];

  for (let i = 0; i < grid.length; ++i) {
    for (let j = 0; j < grid[i].length; ++j) {
      q.push(grid[i][j]);
    }
  }

  grid[start[0]][start[1]].distance = 0;

  while (q.length != 0) {
    //while q is not empty
    //find q with minimum length

    let u = undefined;
    let min_val = Infinity;
    let remove_index = 0;

    for (let i = 0; i < q.length; ++i) {
      if (q[i].distance < min_val) {
        u = q[i];
        min_val = q[i].distance;
        remove_index = i
      }
    }

    //find node u with min distance

    q.splice(remove_index, 1);


    for (let i = 0; i < u.neighbours.length; ++i) {
      let tempNode = grid[u.neighbours[i][0]][u.neighbours[i][1]];

      if (q.includes(tempNode)) {
        let alt = u.distance + 1;
        if (alt < grid[u.neighbours[i][0]][u.neighbours[i][1]].distance) {
          grid[u.neighbours[i][0]][u.neighbours[i][1]].distance = alt;
          grid[u.neighbours[i][0]][u.neighbours[i][1]].prev = u;
        }
      }
    }
  }
}

function dijkstra_endgoal(grid, start, end) {
  let q = [];

  for (let i = 0; i < grid.length; ++i) {
    for (let j = 0; j < grid[i].length; ++j) {
      q.push(grid[i][j]);
    }
  }

  grid[start[0]][start[1]].distance = 0;

  while (q.length != 0) {
    //while q is not empty
    //find q with minimum length

    let u = undefined;
    let min_val = Infinity;
    let remove_index = 0;

    for (let i = 0; i < q.length; ++i) {
      if (q[i].distance < min_val) {
        u = q[i];
        min_val = q[i].distance;
        remove_index = i
      }
    }

    //find node u with min distance

    q.splice(remove_index, 1);
    u.explored = true;


    for (let i = 0; i < u.neighbours.length; ++i) {
      let tempNode = grid[u.neighbours[i][0]][u.neighbours[i][1]];

      if (q.includes(tempNode)) {
        let alt = u.distance + 1;
        if (alt < grid[u.neighbours[i][0]][u.neighbours[i][1]].distance) {
          grid[u.neighbours[i][0]][u.neighbours[i][1]].distance = alt;
          grid[u.neighbours[i][0]][u.neighbours[i][1]].prev = u;
        }
      }
    }

    if (u.x == end[0] && u.y == end[1]){
      let path = [];
      path.push(u);

      console.log(u.distance);

      while (u.prev != undefined){
        path.push(u.prev);
        u = u.prev;
      }
      path = path.reverse();

      break;
    }

  }
}

/*
let myGrid = new Grid(80,20);

dijkstra_endgoal(myGrid.grid, [5,10], [70,10]);

*/

export { Node, Grid, dijkstra, dijkstra_endgoal }