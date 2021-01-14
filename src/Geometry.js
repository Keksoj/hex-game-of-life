/**
 * The main place to put all the boring math stuff
 * Feed it the window and hexagon size, it churns out the rest
 * @param {Number} windowWidth in pixels
 * @param {Number} windowHeight in pixels
 * @param {Number} bigDiameter in pixels
 * @param {Number} gapBetweenCells in pixels
 * @property {Number} canvasWidth  in pixels
 * @property {Number} canvasHeigth in pixels
 * @property {Number} angle 30° in radians
 * @property {Number} bigRadius
 * @property {Number} smallRadius
 * @property {Number} offset
 */
export default class Geometry {
    constructor(windowWidth, windowHeight, bigDiameter, gapBetweenCells) {
        // compute the canvas' size
        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;
        this.canvasWidth = windowWidth - 100;
        this.canvasHeight = windowHeight - 100;

        // the hexagons stand upright
        // top and bottom are vertices, left and right are vertical sides
        this.angle = 0.523598776; // 30° in radians

        this.bigDiameter = bigDiameter;
        this.bigRadius = this.bigDiameter / 2;
        this.smallDiameter = Math.cos(this.angle) * this.bigDiameter;
        this.smallRadius = this.smallDiameter / 2;

        this.gapBetweenCells = gapBetweenCells;
        this.verticalGap = this.gapBetweenCells * Math.cos(this.angle);

        // should be an even number
        
        // convert the x and y positions into drawable coordinates
        this.xMultiplier = this.smallDiameter + gapBetweenCells;
        this.yMultiplier = this.bigDiameter * 0.75 + this.verticalGap;
        
        this.widthInCells = Math.floor(windowWidth / this.xMultiplier);
        var heightInCells = Math.floor(windowHeight / this.yMultiplier);
        if (heightInCells % 2 !== 0) {
            heightInCells++;
        }
        this.heightInCells = heightInCells;
        
        this.totalNumberOfCells = this.widthInCells * this.heightInCells;

        this.offset = this.smallRadius + gapBetweenCells / 2;

        console.table(this);
    }

    getDrawX(x, isOffset) {
        // console.log(geometry);
        if (isOffset) {
            return x * this.xMultiplier + this.offset;
        }
        return x * this.xMultiplier;
    }

    getDrawY(y) {
        return y * this.yMultiplier;
        // console.log(drawY);
    }

    getNeighbors(y, x, isOffset) {
        var neighbors = [];

        var leftNeighbor = { y: y, x: this.getLeftNeighbor(x) };
        var rightNeighbor = { y: y, x: this.getRightNeighbor(x) };

        var upperNeighbor = { y: this.getUpperNeighbor(y), x: x };
        var bottomNeighbor = { y: this.getBottomNeighbor(y), x: x };

        // console.log(upperNeighbor);

        if (!isOffset) {
            var otherUpperNeighbor = {
                y: upperNeighbor.y,
                x: this.getLeftNeighbor(upperNeighbor.x),
            };
            var otherBottomNeighbor = {
                y: bottomNeighbor.y,
                x: this.getLeftNeighbor(bottomNeighbor.x),
            };
        } else {
            var otherUpperNeighbor = {
                y: upperNeighbor.y,
                x: this.getRightNeighbor(upperNeighbor.x),
            };
            var otherBottomNeighbor = {
                y: bottomNeighbor.y,
                x: this.getRightNeighbor(bottomNeighbor.x),
            };
        }
        neighbors.push(
            upperNeighbor,
            otherUpperNeighbor,
            leftNeighbor,
            rightNeighbor,
            bottomNeighbor,
            otherBottomNeighbor
        );
        // console.log(neighbors);
        var neighborsIndexes = [];
        for (var i = 0; i < 6; i++) {
            neighborsIndexes.push(this.getIndex(neighbors[i].y, neighbors[i].x));
        }
        return neighborsIndexes;
    }

    getIndex(y, x) {
        return y * this.widthInCells + x;
    }

    getLeftNeighbor(x) {
        if (x === 0) {
            return this.widthInCells - 1;
        } else {
            return x - 1;
        }
    }
    getRightNeighbor(x) {
        if (x === this.widthInCells - 1) {
            return 0;
        } else {
            return x + 1;
        }
    }
    getUpperNeighbor(y) {
        if (y === 0) {
            return this.heightInCells - 1;
        } else {
            return y - 1;
        }
    }
    getBottomNeighbor(y) {
        if (y === this.heightInCells - 1) {
            return 0;
        } else {
            return y + 1;
        }
    }
}
