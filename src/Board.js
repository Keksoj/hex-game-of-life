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
    constructor(geometry, ticktime, ctx) {
        this.ctx = ctx;
        this.geometry = geometry;
        // console.log(geometry);
        this.cells = [];

        for (var i = 0; i < geometry.totalNumberOfCells; i++) {
            
            var bringToLife = Math.random() > 0.3;
            this.cells.push(new Cell(i, bringToLife, geometry));
        }
        // console.log(this.cells);

        this.draw();
        this.ticktime = ticktime;
        this.ticker = window.setInterval(() => this.tick(), this.ticktime);
    }

    tick() {
        this.updateTheCells();
        this.draw();
    }

    updateTheCells() {
        for (var index = 0; index < this.geometry.totalNumberOfCells; index++) {
            this.updateOneCell(index);
        }
    }

    updateOneCell(index) {
        var liveNeighbors = 0;

        var listOfNeighbors = this.cells[index].neighbors;
        // console.log(listOfNeighbors);
        for (var i = 0; i < 6; i++) {
            var indexOfTheNeighbor = listOfNeighbors[i];
            // console.log(this.cells[indexOfTheNeighbor]);
            if (this.cells[indexOfTheNeighbor].isAlive) {
                liveNeighbors++;
                // console.log(liveNeighbors)
            }
        }

        if (liveNeighbors <= 2) {
            this.cells[index].isAlive = false;
        }
        if ((liveNeighbors = 3)) {
            return;
        }
        if (liveNeighbors >= 4) {
            this.cells[index].isAlive = true;
        }
        
    }

    /** draw the game
     * @param {CanvasRenderingContext2D} ctx
     * @param {Geometry} geometry
     */
    draw() {
        this.ctx.save();
        for (var index = 0; index < this.geometry.totalNumberOfCells; index++) {
            this.cells[index].draw(this.ctx, this.geometry);
            // console.log(this.cells[i]);
        }
        this.ctx.restore;
    }
}
