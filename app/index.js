import { MAP_WIDTH, MAP_HEIGHT, TILES } from './settings';
import { getMap, getIndex, getCoords, getInitialCoords, getPlayer, key, handleResize } from './utils';

const MAP = getMap(),
	  INITIAL_COORDS = getInitialCoords(MAP, Math.floor(Math.random() * MAP_WIDTH * MAP_HEIGHT)),
	  CANVAS = document.getElementById('game');
let img, ctx, player;	

window.onload = function() {
	handleResize();
	ctx = CANVAS.getContext('2d');
	ctx.font = "bold 10pt sans-serif";
	ctx.fillStyle = "#ff0000";
	img = new Image();
	img.src = 'http://i.imgur.com/j1drFYg.png';
	img.onload = function() {
		requestAnimationFrame(drawMap);
		player = getPlayer(ctx, img, INITIAL_COORDS);
	}
}

function drawMap() {
	for(let r = 0; r < MAP_HEIGHT; r++) {
		for(let c = 0; c < MAP_WIDTH; c++) {
			ctx.drawImage(
				img, 
				TILES[MAP[getIndex(c,r)]].x,
				TILES[MAP[getIndex(c,r)]].y,
				TILES[MAP[getIndex(c,r)]].width,
				TILES[MAP[getIndex(c,r)]].height,
				TILES[MAP[getIndex(c,r)]].width * c,
				TILES[MAP[getIndex(c,r)]].height * r,
				TILES[MAP[getIndex(c,r)]].width,
				TILES[MAP[getIndex(c,r)]].height
			);
		}
	}

	requestAnimationFrame(drawMap);
	player.draw();
}

function handleClick(e) {
	let cell = {
		x: Math.floor(e.pageX/TILES['0'].width),
		y: Math.floor(e.pageY/TILES['0'].height)
	}
	
	console.log('we clicked tile '+cell.x+','+cell.y);
}

CANVAS.addEventListener('click', handleClick, false);
window.addEventListener('resize', handleResize, false);
window.addEventListener('keyup', e => key.onKeyup(e), false);
window.addEventListener('keydown', e => key.onKeydown(e), false);