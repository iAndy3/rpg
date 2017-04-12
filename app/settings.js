export const GAME_SETUP = {
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