import { MAP_WIDTH, MAP_HEIGHT, GAME_SPEED, TILE_SIZE } from './settings';
import { getCoords, getInitialCoords } from './utils';

export let move = {
	direction: {},
	LEFT: 'W',
	UP: 'N',
	RIGHT: 'E',
	DOWN: 'S',
	check: function(p) {
		return this.direction[p];
	},
	to: function(p) {
		this.clear();
		this.direction[p] = true;
	},
	clear: function() {
		this.direction = {};
	}
};

export function getPlayer(ctx, img, map) {
	let {x, y} = getInitialCoords(map, Math.floor(Math.random() * MAP_WIDTH * MAP_HEIGHT));
	return {
		type: 'player',
		x: 65,
		y: 0,
		position: {
			x: x * TILE_SIZE,
			y: y * TILE_SIZE
		},
		draw: function(dir) {
			if(dir) {
/*				console.log('Direction:', dir.x * TILE_SIZE);
				console.log('Player:', this.position.x);*/
				if(this.position.y === dir.y * TILE_SIZE && this.position.x === dir.x * TILE_SIZE ) {
					move.clear();
				}
/*				console.log(move.direction);*/
				if(move.check(move.UP)) this.position.y -= GAME_SPEED;
				if(move.check(move.LEFT)) this.position.x -= GAME_SPEED;
				if(move.check(move.DOWN)) this.position.y += GAME_SPEED;
				if(move.check(move.RIGHT)) this.position.x += GAME_SPEED;				
			}

			ctx.drawImage(
				img, 
				this.x, 
				this.y, 
				TILE_SIZE, 
				TILE_SIZE,
				this.position.x, 
				this.position.y, 
				TILE_SIZE, 
				TILE_SIZE
			);
		}
	}
}