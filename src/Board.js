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

        var index = 0;
        for (var y = 0; y < geometry.heightInCells; y++) {
            var isOffset = y % 2 !== 0;
            for (var x = 0; x < geometry.widthInCells; x++) {
                var neighbors = this.geometry.getNeighbors(y, x, isOffset);
                var isAlive = Math.random() > 0.05;
                this.cells.push(new Cell(index, isOffset, neighbors, isAlive, geometry));
                index++;
            }
        }

        this.rules = [
            { death: true, birth: false }, // zero live neighbor
            { death: true, birth: false }, // one live neighbor
            { death: true, birth: true }, // two live neighbors
            { death: false, birth: false }, // three live neighbors
            { death: true, birth: false }, // four live neighbors
            { death: true, birth: false }, // five live neighbors
            { death: true, birth: false }, // six live neighbors
        ];
        // for (var i = 0; i < geometry.totalNumberOfCells; i++) {
        //     var bringToLife = Math.random() > 0.3;
        //     this.cells.push(new Cell(i, bringToLife, geometry));
        // }
        // console.log(this.cells);

        // this.draw();
        // this.countLiveNeighbors();
        // this.updateLiveState();

        this.draw();
        this.ticktime = ticktime;
        this.ticker = window.setInterval(() => this.tick(), this.ticktime);
    }

    tick() {
        this.countLiveNeighbors();
        this.updateLiveState();
        this.draw();
    }

    countLiveNeighbors() {
        for (var index = 0; index < this.geometry.totalNumberOfCells; index++) {
            var liveNeighbors = 0;
            for (var i = 0; i < 6; i++) {
                if (this.cells[this.cells[index].neighbors[i]].isAlive) {
                    liveNeighbors++;
                }
            }
            this.cells[index].liveNeighbors = liveNeighbors;
            // this.cells[index].report();
        }
    }

    updateLiveState() {
        for (var index = 0; index < this.geometry.totalNumberOfCells; index++) {
            this.cells[index].updateLiveState(this.rules);
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
