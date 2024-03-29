import Geometry from './Geometry.js';
import Rule from './Rule.js';
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
                var isAlive = Math.random() > 800 / geometry.totalNumberOfCells;
                this.cells.push(new Cell(index, isOffset, neighbors, isAlive, geometry));
                index++;
            }
        }

        this.rules = [
            new Rule(0, true, false), // zero live neighbor
            new Rule(1, true, false), // one live neighbor
            new Rule(2, false, true), // two live neighbors
            new Rule(3, true, true), // three live neighbors
            new Rule(4, true, false), // four live neighbors
            new Rule(5, true, false), // five live neighbors
            new Rule(6, true, false), // six live neighbors
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
        this.ticker;
        // this.ticker = window.setInterval(() => this.tick(), this.ticktime);
    }

    tick() {
        this.countLiveNeighbors();
        this.updateLiveState();
        this.draw();
    }

    play() {
        this.ticker = window.setInterval(() => this.tick(), this.ticktime);
    }
    pause() {
        clearInterval(this.ticker);
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

    /**
     * Apply a rule to the ongoing game
     * @param {Rule} rule
     */
    applyRule(rule) {
        this.rules[rule.liveNeighbors] = rule;
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
