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
		width: 25,
		height: 32,
		position: {
			x: x * TILE_WIDTH,
			y: y * TILE_HEIGHT
		},
		draw: function(dir) {
			if(dir) {
/*				console.log('Direction:', dir.x * TILE_HEIGHT);
				console.log('Player:', this.position.x);*/
				if(this.position.y === dir.y * TILE_HEIGHT && this.position.x === dir.x * TILE_HEIGHT ) {
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
				this.width, 
				this.height,
				this.position.x, 
				this.position.y, 
				this.width, 
				this.height
			);
		}
	}
}

/*
 * Links
 * http://buildnewgames.com/astar/
 * https://github.com/Kitanga/Tile-World/blob/master/main.js
 * http://nielsgrootobbink.com/wokflok/jte/jte_article_10.php
*/