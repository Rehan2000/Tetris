class piece {
    constructor(shape, ctx) {
        this.shape = shape
        this.color = Math.floor(Math.random() * 7)
        this.ctx = ctx
        this.y = 0
        this.x = Math.floor(COLS / 2 - 1)

    }

    renderPiece() {
        for (let o = 0; o < this.shape.length; o++) {
            for (let a = 0; a < this.shape.length; a++) {
                if (this.shape[o][a] != 0) {
                    this.shape[o][a] = this.color+1
                }
            }
        }
        this.shape.map((row, i) => {
            row.map((cell, j) => {
                if (cell > 0) {
                    this.ctx.fillStyle = COLORS1[cell-1]
                    this.ctx.fillRect(this.x + j, this.y + i, 1, 1)
                }
            })
        })
    }
}