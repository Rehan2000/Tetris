
let canvas = document.getElementById("game-canvas")
let scoreboard = document.getElementById("scoreboard")
let ctx = canvas.getContext("2d")
ctx.scale(BLOCK_SIDE_LENGTH, BLOCK_SIDE_LENGTH)
let model = new gamemodel(ctx)

let scoree = 0


let newGameState = () => {
    fullSend()
    if (model.fallingPiece === null) {
        const rand = Math.floor(Math.random() * 7)
        const newPiece = new piece(SHAPES[rand], ctx)
        model.fallingPiece = newPiece
        newfallingpiece();
        model.moveDown()
        scoree += SCORE_onepiece
        scoreboard.innerHTML = "Score: " + String(scoree)
    } else {
        model.moveDown()
    }
}

const fullSend = () => {
    const allFilled = (row) => {
        for (let x of row) {
            if (x === 0) {
                return false
            }
        }
        return true
    }

    for (let i = 0; i < model.grid.length; i++) {
        if (allFilled(model.grid[i])) {
            scoree += SCORE_WORTH
            model.grid.splice(i, 1)
            model.grid.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        }
    }

    scoreboard.innerHTML = "Score: " + String(scoree)

}

document.addEventListener("keydown", (e) => {
    e.preventDefault()
    switch (e.key) {
        case "z":
            model.rotate()
            break
        case "d":
            model.move(true)
            break
        case "s":
            model.moveDown()
            break
        case "q":
            model.move(false)
            break
    }
})
function start() {
    setInterval(() => {
        newGameState()
    }, GAME_CLOCK);

}