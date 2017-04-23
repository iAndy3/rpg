import _ from 'lodash';
import { MAP_WIDTH, MAP_HEIGHT, TILE_WIDTH, TILE_HEIGHT, TILES } from './settings';
import { getMap, getIndex, getCoords, getInitialCoords, getPlayer, move, handleResize } from './utils';

const MAP = getMap(),
	  CANVAS = document.getElementById('game'),
	  INITIAL_COORDS = getInitialCoords(MAP, Math.floor(Math.random() * MAP_WIDTH * MAP_HEIGHT));
let img, ctx, player, hoveredCell, clickedCell;	

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
	for(let r = 0; r < MAP_HEIGHT; r++) {
		for(let c = 0; c < MAP_WIDTH; c++) {
			if(hoveredCell && r === hoveredCell.y && c === hoveredCell.x) {
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
	player.draw(clickedCell);
}

function handleClick(e) {
	clickedCell = {
		x: Math.floor(e.pageX/TILE_WIDTH),
		y: Math.floor(e.pageY/TILE_HEIGHT)
	}
	move.clear();
	if(clickedCell.y * TILE_WIDTH === player.position.y && clickedCell.x * TILE_HEIGHT < player.position.x) {
		move.to('W');
	} else if(clickedCell.y * TILE_WIDTH === player.position.y && clickedCell.x * TILE_HEIGHT > player.position.x) {
		move.to('E');
	} else if(clickedCell.x * TILE_HEIGHT === player.position.x && clickedCell.y * TILE_WIDTH < player.position.y) {
		move.to('N');
	} else if(clickedCell.x * TILE_HEIGHT === player.position.x && clickedCell.y * TILE_WIDTH > player.position.y) {
		move.to('S');
	}
}

function handleHover(e) {
	hoveredCell = {
		x: Math.floor(e.pageX/TILE_WIDTH),
		y: Math.floor(e.pageY/TILE_HEIGHT)
	}
}

CANVAS.addEventListener('click', handleClick, false);
CANVAS.addEventListener('mousemove', _.throttle(handleHover, 100), false);
window.addEventListener('resize', handleResize, false);