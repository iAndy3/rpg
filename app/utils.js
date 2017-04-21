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
export let key = {
	_pressed: {},
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	isDown: function(keyCode){
		return this._pressed[keyCode];
	},
	onKeydown: function(e){
		this._pressed[e.keyCode] = true;
	},
	onKeyup: function(e){
		delete this._pressed[e.keyCode];
	}
};

export function getPlayer(ctx, img, coords) {
	return {
		type: 'player',
		x: 65,
		y: 0,
		width: 25,
		height: 32,
		positionX: coords.x * TILE_WIDTH,
		positionY: coords.y * TILE_HEIGHT,
		draw: function() {
			if(key.isDown(key.UP)) this.positionY -= GAME_SPEED;
			if(key.isDown(key.LEFT)) this.positionX -= GAME_SPEED;
			if(key.isDown(key.DOWN)) this.positionY += GAME_SPEED;
			if(key.isDown(key.RIGHT)) this.positionX += GAME_SPEED;

			ctx.drawImage(
				img, 
				this.x, 
				this.y, 
				this.width, 
				this.height,
				this.positionX, 
				this.positionY, 
				this.width, 
				this.height
			);
		}
	}
}