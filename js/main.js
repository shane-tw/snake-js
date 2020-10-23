import { Game } from './game.js';
import nearest_point from './utils/nearest_point.js';

window.addEventListener('load', () => {
    const canvas = document.getElementById('tutorial');
    canvas.width = nearest_point(window.innerWidth / 2);
    canvas.height = nearest_point(window.innerHeight / 2);
    const ctx = canvas.getContext('2d');

    const game = new Game(ctx, 1);
    const pressed_keys = [];

    window.addEventListener('keydown', (e) => {
        if (pressed_keys.includes(e.keyCode)) {
            return;
        }
        pressed_keys.push(e.keyCode);
        game.handleKey(e.keyCode);
    });

    window.addEventListener('keyup', (e) => {
        const idx = pressed_keys.indexOf(e.keyCode);
        if (idx >= 0) {
            pressed_keys.splice(idx, 1);
        }
    });
});
