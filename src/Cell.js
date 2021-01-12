import Geometry from './Geometry.js';

/**
 * The building component of the game
 * @param {Number} x the X coordinate in the grid
 * @param {Number} y the Y coordinate in the grid
 * @param {Boolean} isOffset
 * @param {Boolean} isAlive
 * @param {String} color
 * @param {Geometry} geometry
 */
export default class Cell {
    constructor(x, y, isOffset, isAlive, color, geometry) {
        this.color = color;
        this.isOffset = isOffset;
        this.geometry = geometry;
        // console.log(this.geometry);
        this.x = x;
        this.drawX = this.getDrawX(this.geometry, isOffset);

        this.y = y;
        this.drawY = this.getDrawY(this.geometry);
        this.isAlive = isAlive;
    }

    /**
     * convert the x grid position into a drawable coordinate
     * @param {Geometry} geometry
     * @param {Boolean} isOffset
     * @returns {Number} drawX
     */
    getDrawX(geometry, isOffset) {
        // console.log(geometry);
        if (isOffset) {
            return this.x * geometry.xMultiplier + geometry.offset;
        }
        return this.x * geometry.xMultiplier;
    }

    /**
     * convert the y grid position into a drawable coordinate
     * @param {Geometry} geometry
     * @returns {Number} drawY
     */
    getDrawY(geometry) {
        return this.y * geometry.yMultiplier;
        // console.log(drawY);
    }

    /** draw the cell on the canvas
     * @param {CanvasRenderingContext2D} ctx
     * @param {Geometry} geometry
     */
    draw(ctx, geometry) {
        ctx.save();

        if (this.isAlive) {
            ctx.fillStyle = 'pink';
        } else {
            ctx.fillStyle = this.color;
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
