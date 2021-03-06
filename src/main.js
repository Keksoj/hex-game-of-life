import Board from './Board.js';
import Geometry from './Geometry.js';

var hexagonDiameter = 10; // pixels
var gapBetweenCells = 2;
const geometry = new Geometry(
    window.innerWidth,
    window.innerHeight,
    hexagonDiameter,
    gapBetweenCells
);
// console.log(geometry);

const canvas = document.getElementById('canvas');
canvas.width = geometry.canvasWidth;
canvas.height = geometry.canvasHeight;
var ctx = canvas.getContext('2d');

var board = new Board(geometry, 100, ctx);
// console.log(board);
// board.draw(ctx, geometry);
