function recursive_backtracking(grid) {
  let grid_copy = JSON.parse(JSON.stringify(grid));
  fill_walls(grid_copy);
  carve_passages_from(1, 1, grid_copy, 0);
  //now clean up the discovered bits
  for (let i = 0; i < grid.length; ++i){
    for (let j = 0; j < grid[i].length; ++j){
        grid_copy[i][j].explored = false;
    }
  }

  return grid_copy;
}

function fill_walls(grid) {
  for (let i = 0; i < grid.length; ++i) {
    for (let j = 0; j < grid[i].length; ++j) {
      if (i % 2 === 0 || j % 2 === 0) {
        grid[i][j].wall = true;
      }
    }
  }
}

function carve_passages_from(currX, currY, grid, counter) {
  let directions = ["N", "E", "S", "W"];
  shuffleArray(directions); //this works ig
  grid[currX][currY].explored = true;

  for (let i = 0; i < directions.length; ++i) {
    //for each direction in direction
    let nX = newX(directions[i], currX);
    let nY = newY(directions[i], currY);
    //check if these are valid coords
    if (
      nX >= 0 &&
      nX <= grid.length-1 &&
      nY >= 0 &&
      nY <= grid[0].length-1 &&
       !grid[nX][nY].wall &&
       !grid[nX][nY].explored
    ) {
      //carve passage then
      let rX = (nX + currX) / 2;
      let rY = (nY + currY) / 2;
      grid[rX][rY].wall = false;
      grid[rX][rY].explored = true;
      console.log("cX: " + currX + "  cY: " + currY);
      console.log("new X: " + nX + "  new Y: " + nY);
      if (counter < 3){
        carve_passages_from(nX, nY, grid, counter);
      }

      
    }
  }
}

function newX(direction, currX) {
  let result = 0;
  if (direction === "N" || direction === "S") {
    result = currX;
  } else if (direction === "E") {
    result = currX + 2;
  } else {
    result = currX - 2;
  }
  return result;
}

function newY(direction, currY) {
  let result = 0;
  if (direction === "W" || direction === "E") {
    result = currY;
  } else if (direction === "N") {
    result = currY + 2;
  } else {
    result = currY - 2;
  }
  return result;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export { recursive_backtracking };
