export const 
	MAP_WIDTH = 20,
	MAP_HEIGHT = 20,
	GAME_SPEED = .75,
	TILE_WIDTH = 32,
	TILE_HEIGHT = 32,
	TILES = {
		0: {
			type: 'land',
			x: 0,
			y: 0,
			hover: {
				x: 0,
				y: 32
			}
		},
		1: {
			type: 'water',
			x: 32,
			y: 0,
			hover: {
				x: 32,
				y: 32		
			}
		},
		9: {
			type: 'player',
			x: 64,
			y: 0,			
		}
	};