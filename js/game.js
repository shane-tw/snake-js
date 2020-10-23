import { Snake } from './models/snake.js';
import { Food } from './models/food.js';
import { direction } from './constants.js';
import nearest_point from './utils/nearest_point.js';

class Game {
    constructor(ctx, speed) {
        this.ctx = ctx;
        this.speed = speed;
        this.snake = new Snake(this, {
            x: nearest_point(this.ctx.canvas.width / 2),
            y: nearest_point(this.ctx.canvas.height / 2)
        });
    }

    get speed() {
        return this._speed;
    }

    set speed(speed) {
        if (this._ticker !== undefined) {
            clearInterval(this._ticker);
        }
        this._ticker = setInterval(() => {
            this.tick();
        }, Math.min(600, 400 / (speed * 0.6)));
        this._speed = speed;
    }

    tick() {
        if (this.snake.will_collide()) {
            alert('Game over');
            clearInterval(this._ticker);
            return;
        }
        this.snake.move();
        if (this.food == null) {
            this.food = new Food(this);
        }
    }

    handleKey(keyCode) {
        let new_direction;
        switch (keyCode) {
        case 37: case 65:
            new_direction = direction.LEFT;
            break;
        case 38: case 87:
            new_direction = direction.UP;
            break;
        case 39: case 68:
            new_direction = direction.RIGHT;
            break;
        case 40: case 83:
            new_direction = direction.DOWN;
            break;
        }
        if (new_direction !== undefined) {
            const previous_cell = this.snake.cells[this.snake.cells.length - 2];
            if (this.snake.cells.length <= 1 || !this.snake.head.next(new_direction).equals(previous_cell)) {
                this.snake.direction = new_direction;
            }
        }
    }
}

export { Game };
