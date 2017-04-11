let img,
	ctx;

const GAME_SETUP = {
	MAP_WIDTH: 30,
	MAP_HEIGHT: 15,
	TILES: {
		0: {
			type: 'land',
			x: 0,
			y: 0,
			width: 32,
			height: 32
		},
		1: {
			type: 'water',
			x: 32,
			y: 0,
			width: 32,
			height: 32
		}
	},
	PLAYER: {
		type: 'player',
		x: 64,
		y: 0,
		width: 25,
		height: 32,
	}
}

let gameMap = '';
for(let i = 0; i < GAME_SETUP.MAP_WIDTH * GAME_SETUP.MAP_HEIGHT; i++) {
	gameMap += Math.round(Math.random());
}

function getIndex(c, r) {
	return gameMap[r * GAME_SETUP.MAP_WIDTH + c];
}

function getCoords(i) {
	return {
		x: i % GAME_SETUP.MAP_WIDTH,
		y: Math.floor(i / GAME_SETUP.MAP_WIDTH)
	}
}

let coords = getCoords(getInitialCoords(Math.floor(Math.random() * GAME_SETUP.MAP_WIDTH * GAME_SETUP.MAP_HEIGHT)));

function drawMap() {
	for(let r = 0; r < GAME_SETUP.MAP_HEIGHT; r++) {
		for(let c = 0; c < GAME_SETUP.MAP_WIDTH; c++) {
			ctx.drawImage(
				img, 
				GAME_SETUP.TILES[getIndex(c,r)].x,
				GAME_SETUP.TILES[getIndex(c,r)].y,
				GAME_SETUP.TILES[getIndex(c,r)].width,
				GAME_SETUP.TILES[getIndex(c,r)].height,
				GAME_SETUP.TILES[getIndex(c,r)].width * c,
				GAME_SETUP.TILES[getIndex(c,r)].height * r,
				GAME_SETUP.TILES[getIndex(c,r)].width,
				GAME_SETUP.TILES[getIndex(c,r)].height
			);
		}
	}

	requestAnimationFrame(drawMap);
	addPlayer();
}

let movement = {
	x: 32,
	y:32
}

function getInitialCoords(i) {
	if(gameMap[i] == 0) {
		return i;
	} else {
		return getInitialCoords(Math.floor(Math.random() * GAME_SETUP.MAP_WIDTH * GAME_SETUP.MAP_HEIGHT));
	}
}

var Keyboard = {};

Keyboard.LEFT = 37;
Keyboard.RIGHT = 39;
Keyboard.UP = 38;
Keyboard.DOWN = 40;

Keyboard._keys = {};


window.addEventListener('keydown', function(e) {
	console.log(e);
	switch(e.key) {
		case 'ArrowUp':
			movement.y-=2;
			break;
		case 'ArrowDown':
			movement.y+=2;
			break;
		case 'ArrowRight':
			movement.x+=2;
			break;
		case 'ArrowLeft':
			movement.x-=2;
			break;
	}
	e.preventDefault();
})

console.log(coords);
function addPlayer() {
	ctx.drawImage(
		img, 
		GAME_SETUP.PLAYER.x, 
		GAME_SETUP.PLAYER.y, 
		GAME_SETUP.PLAYER.width, 
		GAME_SETUP.PLAYER.height,
		coords.x * movement.x, 
		coords.y * movement.y, 
		GAME_SETUP.PLAYER.width, 
		GAME_SETUP.PLAYER.height
	);
}

window.onload = function() {
	ctx = document.getElementById('game').getContext('2d');
	ctx.font = "bold 10pt sans-serif";
	ctx.fillStyle = "#ff0000";
	img = new Image();
	img.src = 'new-tiles.png';
	img.onload = function() {
		requestAnimationFrame(drawMap);
		  
	}
}