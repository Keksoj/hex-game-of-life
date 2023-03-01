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

var pauseButton = document.getElementById('pause');
pauseButton.isToggled = false;

var death_to_0 = document.getElementById('0_death');
death_to_0.isToggled = false;

var board = new Board(geometry, 900, ctx);
// console.log(board);
// board.draw(ctx, geometry);
board.play();

pauseButton.onclick = () => {
    pauseButton.isToggled = !pauseButton.isToggled;
    console.log('pause/play toggled');
    if (pauseButton.isToggled) {
        board.pause();
    } else {
        board.play();
    }
};
