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

        this.widthInCells = Math.floor(windowWidth / (bigDiameter + this.gapBetweenCells) + 2);
        this.heightInCells = Math.floor(windowHeight / (bigDiameter + this.gapBetweenCells))+5;

        this.totalNumberOfCells = this.widthInCells * this.heightInCells;
        // convert the x and y positions into drawable coordinates
        this.xMultiplier = this.smallDiameter + gapBetweenCells;
        this.yMultiplier = this.bigDiameter * 0.75 + this.verticalGap;

        this.offset = this.smallRadius + gapBetweenCells / 2;

        console.table(this);
    }
}
