import { MAP_WIDTH, MAP_HEIGHT, GAME_SPEED } from './settings';

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

export let Key = {
	_pressed: {},

	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,

	isDown: function(keyCode){
		return this._pressed[keyCode];
	},
	onKeydown: function(event){
		this._pressed[event.keyCode] = true;
	},
	onKeyup: function(event){
		delete this._pressed[event.keyCode];
	}
};

export function getPlayer(ctx, img, coords) {
	return {
		type: 'player',
		x: 64,
		y: 0,
		width: 25,
		height: 32,
		positionX: coords.x * 32,
		positionY: coords.y * 32,
		draw: function() {
			if(Key.isDown(Key.UP)) this.positionY -= GAME_SPEED;
			if(Key.isDown(Key.LEFT)) this.positionX -= GAME_SPEED;
			if(Key.isDown(Key.DOWN)) this.positionY += GAME_SPEED;
			if(Key.isDown(Key.RIGHT)) this.positionX += GAME_SPEED;

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