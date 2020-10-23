import { direction } from '../constants.js';

class Cell {
    constructor(game, x=0, y=0) {
        this.game = game;
        this.x = x;
        this.y = y;
    }

    render() {
        const ctx = this.game.ctx;
        ctx.strokeStyle = '#FF0000';
        ctx.lineWidth = Cell.BORDER_SIZE;
        ctx.strokeRect(this.x, this.y, Cell.SIZE_NO_BORDER, Cell.SIZE_NO_BORDER);    
    }

    next(dirt) {
        let {x, y} = this;

        switch (dirt) {
        case direction.UP:
            y -= Cell.SIZE_WITH_BORDER;
            break;
        case direction.DOWN:
            y += Cell.SIZE_WITH_BORDER;
            break;
        case direction.LEFT:
            x -= Cell.SIZE_WITH_BORDER;
            break;
        case direction.RIGHT:
            x += Cell.SIZE_WITH_BORDER;
            break;
        }

        return new Cell(this.game, x, y);
    }

    equals(cell) {
        return this.x === cell.x && this.y === cell.y;
    }
}

Cell.SIZE_NO_BORDER = 10;
Cell.BORDER_SIZE = 1;
Cell.SIZE_WITH_BORDER = Cell.SIZE_NO_BORDER + Cell.BORDER_SIZE * 2;

export { Cell };
