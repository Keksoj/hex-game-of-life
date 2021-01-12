import Geometry from './Geometry.js';
import Cell from './Cell.js';

/**
 * The place where things happen
 * @
 * @param {Geometry} geometry the math constants
 * @property {Number} width
 * @property {Number} height
 * @property {[Cell]} cells
 */
export default class Board {
    constructor(geometry, ticktime) {
        this.geometry = geometry;
        // console.log(geometry);
        this.cells = [];

        // var aloneCell = new Cell(2, 2, true, 'beige', this.geometry);
        // this.cells.push(aloneCell);

        for (var y = 0; y < geometry.heightInCells; y++) {
            // offset odd rows
            var isOffset = !(y % 2 === 0);

            var row = [];
            for (var x = 0; x < geometry.widthInCells; x++) {
                // pseudo-randomize live cells
                var bringToLife = Math.random() > 0.5;
                row.push(new Cell(x, y, isOffset, bringToLife, 'grey', geometry));
            }
            this.cells.push(row);
        }
        this.ticktime = ticktime;
        this.ticker = window.setInterval(() => this.tick(), this.ticktime);
    }

    tick() {
        this.updateTheCells();
    }

    updateTheCells() {
        for (var y = 0; y < this.geometry.heightInCells; y++) {
            for (var x = 0; x < this.geometry.widthInCells; x++) {
                this.updateOneCell(y, x);
            }
        }
    }

    updateOneCell(y, x) {
        var liveNeigbors = 0;
        if (x === 0 || y === 0 || x === this.widthInCells-1 || y === this.heightInCells-1) {
            return;
        }
        if (this.cells[y - 1][x - 1].isAlive) {
            liveNeigbors++;
        }
        if (this.cells[y - 1][x - 1].isAlive) {
            liveNeigbors++;
        }
        if (this.cells[y - 1][x].isAlive) {
            liveNeigbors++;
        }
        if (this.cells[y][x + 1].isAlive) {
            liveNeigbors++;
        }
        if (this.cells[y + 1][x - 1].isAlive) {
            liveNeigbors++;
        }
        if (this.cells[y + 1][x].isAlive) {
            liveNeigbors++;
        }
        if (liveNeigbors <= 3) {
            this.cells[y][x].isAlive = false;
        }
        if ((liveNeigbors = 4)) {
            return;
        }
        if (liveNeigbors >= 5) {
            this.cells[y][x].isAlive = true;
        }
    }

    /** draw the game
     * @param {CanvasRenderingContext2D} ctx
     * @param {Geometry} geometry
     */
    draw(ctx) {
        ctx.save();
        for (var y = 0; y < this.geometry.heightInCells; y++) {
            for (var x = 0; x < this.geometry.widthInCells; x++) {
                this.cells[y][x].draw(ctx, this.geometry);
                // console.log(this.cells[i]);
            }
        }
        ctx.restore;
    }
}
