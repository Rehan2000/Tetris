

/*console.log(model.grid)
console.log(model.fallingPiece)
model.move(true);
model.move(false);
model.rotate();
console.log("model.grid")*/
/*rules 
cannot put on 0
if I then must be 
situation 1
1 0
1 0
1 0
1 0
situation 2
or else 1 1 1 1


cretes hole
clears line
line height before after
*/
shape = []
grid = []
y = null
x = null
score = 0;
scorearray = []
xarray = []
yarray = []
rarray = []
r = 0;
//where = {quickmove:false, left:0, right:0},yright=0,xright=0;
originalarray = []


function newfallingpiece() {

    for (var i = 0; i < model.fallingPiece.shape.length; i++) {
        shape[i] = model.fallingPiece.shape[i].slice();
    }
    x = model.fallingPiece.x;
    y = model.fallingPiece.y
    for (var i = 0; i < model.grid.length; i++) {
        grid[i] = model.grid[i].slice();
    }
    for (var i = 0; i < model.grid.length; i++) {
        originalarray[i] = model.grid[i].slice();
    }
    scorearray = []
    xarray = []
    yarray = []
    rarray = []
    y = model.fallingPiece.y
    x = model.fallingPiece.x;
    // console.log(!collision(x, y, shape));
   
}
function goai() {
    /*  for (var h = 0; h < 4; h++) {
          r = h*/
    for (var i = 0; i < COLS; i++) {
        x = model.fallingPiece.x;
        y = model.fallingPiece.y
        for (var k = 0; k < originalarray.length; k++) {
            grid[k] = originalarray[k].slice();
        }
        x = i
        calculatescore(grid, shape)
        if (collision(x, y, shape) && y == 0) {
            break;
        } else {
            

        }

    }




    y = model.fallingPiece.y
    x = model.fallingPiece.x;
    //console.log(scorearray)
    chooseandputposition();





}



function chooseandputposition() {
    //console.log(scorearray)
    let i = scorearray.indexOf(Math.max(...scorearray));
    xtarget = xarray[i]
    // console.log(xtarget, "  form  ", x, "  index  ", i)



    if (xtarget == x) {
    } else if (xtarget < x) {

        while (xtarget != x) {
            model.move(false);
            y = model.fallingPiece.y
            x = model.fallingPiece.x;
            if (collision(x, y + 1, shape)) {
                xtarget = x
            }
        }

    } else if (xtarget > x) {
        while (xtarget != x) {
            model.move(true);
            y = model.fallingPiece.y
            x = model.fallingPiece.x;
            if (collision(x, y + 1, shape)) {
                xtarget = x
            }
        }
    }

}


function calculatescore(gridtest, shape) {



    score = 0;
    //console.log(x)
    vx = [];//get highest width
    vy = [];//get highest height
    gridtest = makeitgodown(shape, gridtest);

    for (let i = 0; i < shape.length; i++) {
        if (vy[i] == undefined) {
            vy[i] = 0
        }
        if (vx[i] == undefined) {
            vx[i] = 0
        }
        for (let j = 0; j < shape.length; j++) {
            if (shape[j][i] > 0) {//reverse j and i for columns
                vy[i] = vy[i] + 1

            }
            if (shape[i][j] > 0) {//reverse j and i for columns
                vx[i] = vx[i] + 1
            }
        }
    }
    zx = Math.max(...vx)
    z = y + Math.max(...vy)
    //console.log(x, z, y, Math.max(...vy))
    if (z < 20) {
        for (let w = 1; w < zx + 1; w++) {
            if (gridtest[z][(x + w)] != 0) {
                score = score + noholesbeneath * z
            } else {
                score = score + holesbeneath / z
                aretheymoreholesbenath(gridtest, z + 1, x + w)
            }
        }
    } else if (z >= 19) {
        for (let w = 1; w < zx + 1; w++) {
            if (gridtest[19][(x + w)] != 0) {
                score = score + noholesbeneath * z
            } else {
                score = score + holesbeneath / z
            }
        }
    }
    //checks for full lines
    const allFilled = (row) => {
        for (let p of row) {
            if (p === 0) {
                return false
            }
        }
        return true
    }
    for (let i = 0; i < gridtest.length; i++) {
        if (allFilled(gridtest[i])) {
            gridtest.splice(i, 1)
            gridtest.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
            score += scorenewline

            //console.log("wecannexline")
        }
    }
    yarray.push(y)
    scorearray.push(score)
    xarray.push(x)

    rarray.push(r)
    //quickmove



}

function aretheymoreholesbenath(gridtest, z, w) {
    if (gridtest[z] != null) {
        if (gridtest[z][(w)] == 0) {
            score = score + holesbeneath
            aretheymoreholesbenath(gridtest, z + 1, w)
        }
    }

}


function makeitgodown(shape, gridtest) {
    if (collision(x, y + 1, shape)) {
        if (y === 0) {
            score = score + endposition;
            // console.log("gone by death")
            return gridtest
        } else {

            // move right
            for (let v = 1; v < COLS; v++) {/* 
                if (!collision(x + v, y, shape)) {
                    where.quickmove = true
                    where.right = v
                    where.yright = y
                }  // move left
                if (!collision(x - v, y, shape)) {
                    where.quickmove = true
                    where.left = v
                    where.yleft = y
                }*/
            }


            //collision true change cordinates
            shape.map((row, i) => {
                row.map((cell, j) => {
                    let p = x + j
                    let q = y + i
                    if (p >= 0 && p < COLS && q < ROWS && cell > 0) {
                        gridtest[q][p] = shape[i][j]
                    }
                })
            })
            // check game over very bad score

            //collisiontrue 
            return gridtest;
        }
    } else {
        y += 1
        gridtest = makeitgodown(shape, gridtest, x, y)

    }
    return gridtest;
}




function collision(x, y, shape) {
    const n = shape.length
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (shape[i][j] > 0) {
                let p = x + j
                let q = y + i
              //  console.log(i, j)
                if (p >= 0 && -1 < p && p < COLS && -1 < q && q < ROWS) {
                    // in bounds

                    if (grid[q][p] > 0) {
                        return true
                    }
                } else {
                    return true
                }
            }
        }
    }
    return false
}
