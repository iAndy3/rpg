import { MAP_WIDTH, MAP_HEIGHT, GAME_SPEED, TILE_WIDTH, TILE_HEIGHT } from './settings';

export function getMap() {
	let map = '';
	for(let i = 0; i < MAP_WIDTH * MAP_HEIGHT; i++) {
		map += Math.round(Math.random());
	}

	return map;
}

export function getIndex(cols, rows) {
	return rows * MAP_WIDTH + cols;
}

export function getCoords(i) {
	return {
		x: i % MAP_WIDTH,
		y: Math.floor(i / MAP_WIDTH)
	}
}

export function getInitialCoords(map, i) {
	if(map[i] == 0) {
		return getCoords(i);
	} else {
		return getInitialCoords(map, Math.floor(Math.random() * MAP_WIDTH * MAP_HEIGHT));
	}
}

export function handleResize() {
	let canvas = document.getElementById('game');
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
}
//http://buildnewgames.com/astar/