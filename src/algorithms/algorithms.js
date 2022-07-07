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

class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = [];
    this.start = ([-1,-1]);
    this.end = ([-1,-1]);

    for (let i = 0; i < width; ++i) {
      let temp = [];
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
    if (node.x === 0) {
      //left
      if (node.y === 0) {
        //top left corner
        neighbours.push([node.x + 1, node.y]);
        neighbours.push([node.x, node.y + 1]);
      } else if (node.y === this.height - 1) {
        //bottom left
        neighbours.push([node.x + 1, node.y]);
        neighbours.push([node.x, node.y - 1]);
      } else {
        neighbours.push([node.x, node.y - 1]);
        neighbours.push([node.x + 1, node.y]);
        neighbours.push([node.x, node.y + 1]);
      }
    } else if (node.x === this.width - 1) {
      //right
      if (node.y === 0) {
        //top right
        neighbours.push([node.x - 1, node.y]);
        neighbours.push([node.x, node.y + 1]);
      } else if (node.y === this.height - 1) {
        //bottom right
        neighbours.push([node.x - 1, node.y]);
        neighbours.push([node.x, node.y - 1]);
      } else {
        neighbours.push([node.x, node.y - 1]);
        neighbours.push([node.x - 1, node.y]);
        neighbours.push([node.x, node.y + 1]);
      }
    } else if (node.y === 0) {
      //top
      neighbours.push([node.x - 1, node.y]);
      neighbours.push([node.x, node.y + 1]);
      neighbours.push([node.x + 1, node.y]);
    } else if (node.y === this.height - 1) {
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
  let grid_copy = JSON.parse(JSON.stringify(grid));

  let q = [];

  for (let i = 0; i < grid_copy.length; ++i) {
    for (let j = 0; j < grid_copy[i].length; ++j) {
      q.push(grid_copy[i][j]);
    }
  }

  grid_copy[start[0]][start[1]].distance = 0;

  while (q.length !== 0) {
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
      let tempNode = grid_copy[u.neighbours[i][0]][u.neighbours[i][1]];

      if (q.includes(tempNode)) {
        let alt = u.distance + 1;
        if (alt < grid_copy[u.neighbours[i][0]][u.neighbours[i][1]].distance) {
          grid_copy[u.neighbours[i][0]][u.neighbours[i][1]].distance = alt;
          grid_copy[u.neighbours[i][0]][u.neighbours[i][1]].prev = u;
        }
      }
    }
  }

  return grid_copy;
}

function dijkstra_endgoal(grid, start, end) {
  let grid_copy = JSON.parse(JSON.stringify(grid));
  let result = [];

  let q = [];
  let exploredInOrder = [];

  for (let i = 0; i < grid_copy.length; ++i) {
    for (let j = 0; j < grid_copy[i].length; ++j) {
      grid_copy[i][j].distance = Infinity;
      q.push(grid_copy[i][j]);
    }
  }

  grid_copy[start[0]][start[1]].distance = 0;

  while (q.length !== 0) {
    //while q is not empty
    //find q with minimum length

    let u = undefined;
    let min_val = Infinity;
    let remove_index = 0;

    for (let i = 0; i < q.length; ++i) {
      if (q[i].distance < min_val && !q[i].wall) {
        u = q[i];
        min_val = q[i].distance;
        remove_index = i
      }
    }

    //find node u with min distance

    q.splice(remove_index, 1);
    u.explored = true;

    exploredInOrder.push(u);

    for (let i = 0; i < u.neighbours.length; ++i) {
      let tempNode = grid_copy[u.neighbours[i][0]][u.neighbours[i][1]];

      if (q.includes(tempNode)) {
        let alt = u.distance + 1;
        if (alt < grid_copy[u.neighbours[i][0]][u.neighbours[i][1]].distance) {
          grid_copy[u.neighbours[i][0]][u.neighbours[i][1]].distance = alt;
          grid_copy[u.neighbours[i][0]][u.neighbours[i][1]].prev = u;
        }
      }
    }

    if (u.x === end[0] && u.y === end[1]){
      let path = [];
      path.push(u);

      while (u.prev !== undefined){
        path.push(u.prev);
        u = u.prev;
      }
      path = path.reverse();
      result.push(path);

      break;
    }

  }

  result.push(exploredInOrder);

  //result[0] is that path to the end goal
  //result[1] are the explorered nodes in order, so that it can be easily animated by react. 

  return result;
}


function bfs(grid,start,end){
    //result[0] is that path to the end goal
  //result[1] are the explored nodes in order, so that it can be easily animated by react. 
  //start and end are both arrays with length of 1, x and y coords.
    let result = [];
    let exploredInOrder = [];
    let q = []; //create queue 
    grid[start[0]][start[1]].explored = true;
    q.push(grid[start[0]][start[1]]) //enqueue the starting node
    console.log(start);
    exploredInOrder.push(q[0]);


    while(q.length !== 0){ //while queue is not empty
      let v = q[0]; // dequeue
      q.splice(0,1); //remove the dequeued element
      if (v.x === end[0] && v.y === end[1]){
        let path = [];
        path.push(v);

        while (v.prev !== undefined){
          path.push(v.prev);
          v = v.prev;
        }
        path = path.reverse();
        result.push(path);
        
        break; //found the result
      }

      console.log(v);

      for (let i = 0; i < v.neighbours.length; ++i){ //for all neighbours of v
        if(!grid[v.neighbours[i][0]][v.neighbours[i][1]].explored && !grid[v.neighbours[i][0]][v.neighbours[i][1]].wall){
          let curr = grid[v.neighbours[i][0]][v.neighbours[i][1]];
          curr.explored = true;
          curr.prev = v;
          exploredInOrder.push(curr);
          q.push(curr);
        }
      }
    }

    result.push(exploredInOrder);
    return result;
}


function dfs(grid,start,end){
  //result[0] is that path to the end goal
//result[1] are the explored nodes in order, so that it can be easily animated by react. 
//start and end are both arrays with length of 1, x and y coords.
  let result = [];
  let exploredInOrder = [];
  let q = []; //create stack 
  grid[start[0]][start[1]].explored = true;
  q.push(grid[start[0]][start[1]]) //enqueue the starting node
  console.log(start);
  exploredInOrder.push(q[0]);


  while(q.length !== 0){ //while queue is not empty
    let v = q[0]; // dequeue
    q.splice(0,1); //remove the dequeued element
    if (v.x === end[0] && v.y === end[1]){
      let path = [];
      path.push(v);

      while (v.prev !== undefined){
        path.push(v.prev);
        v = v.prev;
      }
      path = path.reverse();
      result.push(path);
      
      break; //found the result
    }

    console.log(v);

    for (let i = 0; i < v.neighbours.length; ++i){ //for all neighbours of v
      if(!grid[v.neighbours[i][0]][v.neighbours[i][1]].explored && !grid[v.neighbours[i][0]][v.neighbours[i][1]].wall){
        let curr = grid[v.neighbours[i][0]][v.neighbours[i][1]];
        curr.explored = true;
        curr.prev = v;
        exploredInOrder.push(curr);
        q.unshift(curr);
      }
    }
  }

  result.push(exploredInOrder);
  return result;
}



export { Node, Grid, dijkstra, dijkstra_endgoal, bfs, dfs }