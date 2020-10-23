import { Cell } from './cell.js';
import nearest_point from '../utils/nearest_point.js';

class Food {
    constructor(game) {
        this.game = game;
        this.randomise_location();
        this.render();
    }

    eat(snake) {
        const ctx = this.game.ctx;
        ctx.clearRect(this.x - Cell.BORDER_SIZE, this.y - Cell.BORDER_SIZE, Cell.SIZE_WITH_BORDER, Cell.SIZE_WITH_BORDER);
        snake.desired_length += 1;
        this.game.speed += 1;
        this.game.food = null;
    }

    randomise_location() {
        const ctx = this.game.ctx;
        let invalid_food = true;
        while (invalid_food) {
            this.x = nearest_point(Math.random() * ctx.canvas.width);
            this.y = nearest_point(Math.random() * ctx.canvas.height);
            invalid_food = this.game.snake.cells.some((cell) => cell.equals(this));
        }
    }

    render() {
        const ctx = this.game.ctx;
        ctx.strokeStyle = '#00FF00';
        ctx.lineWidth = Cell.BORDER_SIZE;
        ctx.strokeRect(this.x, this.y, Cell.SIZE_NO_BORDER, Cell.SIZE_NO_BORDER);
    }
}

export { Food };
