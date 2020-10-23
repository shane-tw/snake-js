import { Cell } from '../models/cell.js';

export default (point) => {
    return Math.floor(point / Cell.SIZE_WITH_BORDER) * Cell.SIZE_WITH_BORDER;
}
