import Geometry from './Geometry.js';

/**
 * The building component of the game
 * @param {Number} x the X coordinate in the grid
 * @param {Number} y the Y coordinate in the grid
 * @param {Boolean} isOffset
 * @param {Boolean} isAlive
 * @param {Geometry} geometry
 */
export default class Cell {
    constructor(index, isOffset, neighbors, isAlive, geometry) {
        this.index = index;
        this.isAlive = isAlive;

        // console.log(this.neighbors);

        // console.log(this.geometry);
        this.x = this.getX(geometry);
        this.y = this.getY(geometry);

        this.isOffset = isOffset;

        this.neighbors = neighbors;
        this.liveNeighbors = 0;

        this.drawX = geometry.getDrawX(this.x, this.isOffset);
        this.drawY = geometry.getDrawY(this.y);
    }

    updateLiveState(rules) {
        var rule = rules.getRuleForLiveNeighbors(this.liveNeighbors);
        if (rule.death) {
            this.isAlive = false;
        }
        if (rule.birth) {
            this.isAlive = true;
        }
    }

    report() {
        console.log(
            'I am cell with index',
            this.index,
            'I have',
            this.liveNeighbors,
            'alive neighbors'
        );
    }

    getX(geometry) {
        return this.index % geometry.widthInCells;
    }

    getY(geometry) {
        return Math.floor(this.index / geometry.widthInCells);
    }

    /** draw the cell on the canvas
     * @param {CanvasRenderingContext2D} ctx
     * @param {Geometry} geometry
     */
    draw(ctx, geometry) {
        ctx.save();

        if (this.isAlive) {
            ctx.fillStyle = 'beige';
        } else {
            ctx.fillStyle = 'grey';
        }

        ctx.beginPath();
        // start in the middle of the right side
        ctx.moveTo(this.drawX + geometry.smallRadius, this.drawY);
        // up to the vertex
        ctx.lineTo(this.drawX + geometry.smallRadius, this.drawY + geometry.bigRadius / 2);
        // top vertex
        ctx.lineTo(this.drawX, this.drawY + geometry.bigRadius);
        // down to the top left vertex
        ctx.lineTo(this.drawX - geometry.smallRadius, this.drawY + geometry.bigRadius / 2);
        // down to the bottom left vertex
        ctx.lineTo(this.drawX - geometry.smallRadius, this.drawY - geometry.bigRadius / 2);
        // bottom vertex
        ctx.lineTo(this.drawX, this.drawY - geometry.bigRadius);
        // bottom right vertex
        ctx.lineTo(this.drawX + geometry.smallRadius, this.drawY - geometry.bigRadius / 2);
        ctx.lineTo(this.drawX + geometry.smallRadius, this.drawY);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }
}
