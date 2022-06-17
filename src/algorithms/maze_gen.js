function fill_walls(grid){

    for (let i = 0; i < grid.length; ++i){
        for (let j = 0; j < grid[i].length; ++j){
            grid[i][j].wall = true;
        }
    }
    return grid;
}

function recursive_backtracking(grid){
    grid = fill_walls(grid);
    let initial = grid[0][0];
    
}

export { fill_walls }