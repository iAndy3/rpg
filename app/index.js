import _ from 'lodash';
import { MAP_WIDTH, MAP_HEIGHT, TILE_WIDTH, TILE_HEIGHT, TILES } from './settings';
import { getMap, getIndex, getCoords, getInitialCoords, getPlayer, key, handleResize } from './utils';

const MAP = getMap(),
	  CANVAS = document.getElementById('game'),
	  INITIAL_COORDS = getInitialCoords(MAP, Math.floor(Math.random() * MAP_WIDTH * MAP_HEIGHT));
let img, ctx, player, cellHovered, cell;	

window.onload = function() {
	handleResize();
	ctx = CANVAS.getContext('2d');
	img = new Image();
	img.src = 'http://i.imgur.com/FU5t5mw.png';
	img.onload = function() {
		requestAnimationFrame(drawMap);
		player = getPlayer(ctx, img, MAP);
	}
}

function drawMap() {
	let asd;
	if(cell) {
		console.log(`Cell x: ${cell.x*32}\nPlayer x: ${player.positionX}`);
		asd = cell.x * 32;
	}
	if(cell && cell.x * 32 === Math.floor(player.positionX)) {
		console.log('stop');
		key.onKeyup('39');
	}

	for(let r = 0; r < MAP_HEIGHT; r++) {
		for(let c = 0; c < MAP_WIDTH; c++) {
			if(cellHovered && r === cellHovered.y && c === cellHovered.x) {
				ctx.drawImage(
					img, 
					TILES[MAP[getIndex(c,r)]].hover.x,
					TILES[MAP[getIndex(c,r)]].hover.y,
					TILE_WIDTH,
					TILE_HEIGHT,
					TILE_WIDTH * c,
					TILE_HEIGHT * r,
					TILE_WIDTH,
					TILE_HEIGHT
				);
			} else {
				ctx.drawImage(
					img, 
					TILES[MAP[getIndex(c,r)]].x,
					TILES[MAP[getIndex(c,r)]].y,
					TILE_WIDTH,
					TILE_HEIGHT,
					TILE_WIDTH * c,
					TILE_HEIGHT * r,
					TILE_WIDTH,
					TILE_HEIGHT
				);				
			}

		}
	}

	requestAnimationFrame(drawMap);
	player.draw(asd);
}

function handleClick(e) {
	cell = {
		x: Math.floor(e.pageX/TILE_WIDTH),
		y: Math.floor(e.pageY/TILE_HEIGHT)
	}

	key.onKeydown('39', cell.x);

}

function handleHover(e) {
	console.log('hov');
	cellHovered = {
		x: Math.floor(e.pageX/TILE_WIDTH),
		y: Math.floor(e.pageY/TILE_HEIGHT)
	}
}

CANVAS.addEventListener('click', handleClick, false);
CANVAS.addEventListener('mousemove', _.throttle(handleHover, 100), false);
window.addEventListener('resize', handleResize, false);
window.addEventListener('keyup', e => key.onKeyup('39'), false);
window.addEventListener('keydown', e => key.onKeydown('39'), false); 