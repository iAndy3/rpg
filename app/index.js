import _ from 'lodash';
import { MAP_WIDTH, MAP_HEIGHT, TILE_WIDTH, TILE_HEIGHT, TILES } from './settings';
import { getMap, getIndex, handleResize } from './utils';

const MAP = getMap(),
	  CANVAS = document.getElementById('game');
let img, ctx, cellHovered;	

window.onload = function() {
	handleResize();
	ctx = CANVAS.getContext('2d');
	img = new Image();
	img.src = 'http://i.imgur.com/FU5t5mw.png';
	img.onload = function() {
		requestAnimationFrame(drawMap);
	}
}

function drawMap() {
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
}

function handleClick(e) {
	let cell = {
		x: Math.floor(e.pageX/TILE_WIDTH),
		y: Math.floor(e.pageY/TILE_HEIGHT)
	}
	
	console.log('we clicked tile '+cell.x+','+cell.y);
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