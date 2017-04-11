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
		x: 18,
		y: 84,
		width: 32,
		height: 32,
		initialX: 64,
		initialY: 64
	}
}

let gameMap = '';
for(let i = 0; i < GAME_SETUP.MAP_WIDTH * GAME_SETUP.MAP_HEIGHT; i++) {
	gameMap += Math.round(Math.random());
}

function getIndex(c, r) {
	return gameMap[r * GAME_SETUP.MAP_WIDTH + c];
}

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



function getInitialCoords() {
	let x = Math.floor(Math.random() * GAME_SETUP.MAP_WIDTH),
		y = Math.floor(Math.random() * GAME_SETUP.MAP_HEIGHT);

	if(getIndex(x, y) == 0) {
		return {x, y};
	} else {
		getInitialCoords();
	}
}


	let coords = getInitialCoords();

function addPlayer() {
	ctx.drawImage(
		img, 
		GAME_SETUP.PLAYER.x, 
		GAME_SETUP.PLAYER.y, 
		GAME_SETUP.PLAYER.width, 
		GAME_SETUP.PLAYER.height,
		coords.initialX * 32, 
		coords.initialY * 32, 
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