import _ from 'lodash';
import { MAP_WIDTH, MAP_HEIGHT, TILE_SIZE, TILES } from './settings';
import { getMap, getIndex, handleResize } from './utils';
import { getPlayer, move } from './player';

const MAP = getMapss(),
	  CANVAS = document.getElementById('game');
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
					TILE_SIZE,
					TILE_SIZE,
					TILE_SIZE * c,
					TILE_SIZE * r,
					TILE_SIZE,
					TILE_SIZE
				);
			} else {
				ctx.drawImage(
					img, 
					TILES[MAP[getIndex(c,r)]].x,
					TILES[MAP[getIndex(c,r)]].y,
					TILE_SIZE,
					TILE_SIZE,
					TILE_SIZE * c,
					TILE_SIZE * r,
					TILE_SIZE,
					TILE_SIZE
				);				
			}
		}
	}

	requestAnimationFrame(drawMap);
	player.draw(clickedCell);
}

function handleClick(e) {
	clickedCell = {
		x: Math.floor(e.pageX/TILE_SIZE),
		y: Math.floor(e.pageY/TILE_SIZE)
	}
	move.clear();
	if(clickedCell.y * TILE_SIZE === player.position.y && clickedCell.x * TILE_SIZE < player.position.x) {
		move.to('W');
	} else if(clickedCell.y * TILE_SIZE === player.position.y && clickedCell.x * TILE_SIZE > player.position.x) {
		move.to('E');
	} else if(clickedCell.x * TILE_SIZE === player.position.x && clickedCell.y * TILE_SIZE < player.position.y) {
		move.to('N');
	} else if(clickedCell.x * TILE_SIZE === player.position.x && clickedCell.y * TILE_SIZE > player.position.y) {
		move.to('S');
	}
}

function handleHover(e) {
	hoveredCell = {
		x: Math.floor(e.pageX/TILE_SIZE),
		y: Math.floor(e.pageY/TILE_SIZE)
	}
}

CANVAS.addEventListener('click', handleClick, false);
CANVAS.addEventListener('mousemove', _.throttle(handleHover, 100), false);
window.addEventListener('resize', handleResize, false);