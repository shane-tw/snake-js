import { Cell } from './cell.js';
import { direction } from '../constants.js';

class Snake {
    constructor(game, pos={x: 0, y: 0}) {
        const head = new Cell(game, pos.x, pos.y);
        this.game = game;
        this.cells = [head];
        this.desired_length = this.cells.length;
        this.direction = direction.RIGHT;
        head.render();
    }

    get head() {
        return this.cells[this.cells.length - 1];
    }

    move() {
        const ctx = this.game.ctx;
        const new_head = this.head.next(this.direction);
        if (this.game.food && new_head.equals(this.game.food)) {
            this.game.food.eat(this);
        }

        while (this.desired_length <= this.cells.length) {
            const tail = this.cells.shift();
            ctx.clearRect(tail.x - Cell.BORDER_SIZE, tail.y - Cell.BORDER_SIZE, Cell.SIZE_WITH_BORDER, Cell.SIZE_WITH_BORDER);
        }
        this.cells.push(new_head);
        new_head.render()
    }

    will_collide() {
        const ctx = this.game.ctx;
        const next = this.head.next(this.direction);

        if (next.x < 0 || next.x + Cell.SIZE_WITH_BORDER > ctx.canvas.width) {
            return true;
        }

        if (next.y < 0 || next.y + Cell.SIZE_WITH_BORDER > ctx.canvas.height) {
            return true;
        }

        return this.cells.slice(0, this.cells.length - 1).some(
            (cell) => cell.equals(next)
        );
    }
}

export { Snake };
