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
    constructor(index, isAlive, geometry) {
        this.index = index;
        this.isAlive = isAlive;

        this.neighbors = this.getNeighbors(geometry);
        // console.log(this.neighbors);

        // console.log(this.geometry);
        this.x = this.getX(geometry);
        this.y = this.getY(geometry);

        if (this.y % 2 === 0) {
            this.isOffset = false;
        } else {
            this.isOffset = true;
        }

        this.drawX = this.getDrawX(geometry);
        this.drawY = this.getDrawY(geometry);
    }

    getNeighbors(geometry) {
        var width = geometry.widthInCells;
        var arrayLength = geometry.totalNumberOfCells;
        if (!this.isOffset) {
            return [
                this.circleSubstract(this.index, width + 1, arrayLength),
                this.circleSubstract(this.index, width, arrayLength),
                this.circleSubstract(this.index, 1, arrayLength),
                this.circleAdd(this.index, 1, arrayLength),
                this.circleAdd(this.index, width - 1, arrayLength),
                this.circleAdd(this.index, width, arrayLength),
            ];
        } else {
            return [
                this.circleSubstract(this.index, width, arrayLength),
                this.circleSubstract(this.index, width + 1, arrayLength),
                this.circleSubstract(this.index, 1, arrayLength),
                this.circleAdd(this.index, 1, arrayLength),
                this.circleAdd(this.index, width, arrayLength),
                this.circleAdd(this.index, width + 1, arrayLength),
            ];
        }
    }

    circleSubstract(firstTerm, secondTerm, arrayLength) {
        if (firstTerm - secondTerm < 0) {
            return arrayLength + firstTerm - secondTerm;
        } else {
            return firstTerm - secondTerm;
        }
    }

    circleAdd(firstTerm, secondTerm, arrayLength) {
        if (firstTerm + secondTerm > arrayLength - 1) {
            return firstTerm + secondTerm - arrayLength;
        } else {
            return firstTerm + secondTerm;
        }
    }

    getX(geometry) {
        return this.index % geometry.widthInCells;
    }

    getY(geometry) {
        return Math.floor(this.index / geometry.widthInCells);
    }

    /**
     * convert the x grid position into a drawable coordinate
     * @param {Geometry} geometry
     * @param {Boolean} isOffset
     * @returns {Number} drawX
     */
    getDrawX(geometry) {
        // console.log(geometry);
        if (this.isOffset) {
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
