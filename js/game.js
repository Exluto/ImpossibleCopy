let gameScene = new Phaser.Scene('Game');
 
let config = {
  	type: Phaser.AUTO,
  	width: 730, // game width
  	height: 345, // game height
  	scene: gameScene
};

let game = new Phaser.Game(config);

gameScene.init = function() {
  this.playerSpeed = 3;
}

gameScene.preload = function() {
	this.load.image('background', 'assets/background.png');
	this.load.image('divider', 'assets/divider.png');
	this.load.image('endzone', 'assets/endzone.png');
	this.load.image('player', 'assets/player.png');
};
 
gameScene.create = function() {
	let bg = this.add.sprite(0, 0, 'background');
	bg.setOrigin(0, 0);
	bg.setScale(.75);

	this.divider = this.add.sprite(0, this.sys.game.config.height / 2, 'divider');
	this.divider.setOrigin(0, 0);
	this.divider.setScale(.75);

	this.endzone = this.add.sprite(5, (this.sys.game.config.height / 2) + 7, 'endzone');
	this.endzone.setOrigin(0, 0);
	this.endzone.setScale(.75);

	// make sure this is the last sprite added so it shows up on top of the other sprites (anything under this will be above the player)
	this.player = this.add.sprite(30, 80, 'player');
	this.player.setScale(.5);
	this.player.setOrigin(0, 0);

	// movement
	this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
	this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
	this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
	this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
};

gameScene.update = function() {
	if(this.key_A.isDown) {
		this.player.x -= this.playerSpeed;
	}

	if(this.key_D.isDown) {
		this.player.x += this.playerSpeed;
	}

	if(this.key_W.isDown) {
		this.player.y -= this.playerSpeed;
	}

	if(this.key_S.isDown) {
		this.player.y += this.playerSpeed;
	}

	// collision with the middle divider line
	if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.divider.getBounds())) {
		this.gameOver();
	}

	// collision with any of the walls
	if(this.player.y + this.player.height / 2 >= this.sys.game.config.height || this.player.y <= 0 || this.player.x + this.player.width / 2 >= this.sys.game.config.width || this.player.x <= 0) {
		this.gameOver();
	}

	// collision with the endzone
	if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.endzone.getBounds())) {
		this.gameWon();
	}
};

gameScene.gameOver = function() {
	console.log("GameOver");
	this.scene.manager.bootScene(this);
}

gameScene.gameWon = function() {
	console.log("GameWon");

	// next level goes here
	// this.scene.manager.bootScene(NextLevelHere);
}