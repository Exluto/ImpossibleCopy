//global variables
var left=false
var right=false
var player;

class level1 extends Phaser.Scene {
	constructor(numDeaths = 0) {
		super({ key: "level1"});
		this.numDeaths = numDeaths;
	}

	init() {
		this.playerSpeed = 3;
		this.topEnemySpeed = 3;
		this.botEnemySpeed = -3;
		this.numCoins = 0;

		this.topEnemyMaxY = this.sys.game.config.height / 2 - 7;
		this.topEnemyMinY = 15;

		// change this to true so you cant die
		this.inDebugMode = false;
	}

	preload() {
		this.load.image('background', 'assets/josheslevel/background.png');
		this.load.image('divider', 'assets/josheslevel/divider.png');
		this.load.image('endzone', 'assets/josheslevel/endzone.png');
		this.load.image('enemy', 'assets/josheslevel/enemy.png');
		this.load.image('coin', 'assets/josheslevel/coin.png');
		this.load.image('player', 'assets/josheslevel/player.png');
	};
 
	create() {
		let bg = this.add.sprite(0, 0, 'background');
		bg.setOrigin(0, 0);
		bg.setScale(.75);

		//coins top row coins
		this.topCoins = this.add.group({
			key: 'coin',
			repeat: 1,
			setXY: {
				x: 263,
				y: 15,
				stepX: 200
			}
		});
		Phaser.Actions.ScaleXY(this.topCoins.getChildren(), -.5, -.5);

		//coins bottom row coins
		this.bottomCoins = this.add.group({
			key: 'coin',
			repeat: 1,
			setXY: {
				x: 143,
				y: this.sys.game.config.height / 2 - 15,
				stepX: 200
			}
		});
		Phaser.Actions.ScaleXY(this.bottomCoins.getChildren(), -.5, -.5);

		//coins bottom row coins
		this.botBottomCoins = this.add.group({
			key: 'coin',
			repeat: 1,
			setXY: {
				x: 263,
				y: this.sys.game.config.height / 2 + 15,
				stepX: 200
			}
		});
		Phaser.Actions.ScaleXY(this.botBottomCoins.getChildren(), -.5, -.5);

		//coins bottom row coins
		this.topBottomCoins = this.add.group({
			key: 'coin',
			repeat: 1,
			setXY: {
				x: 143,
				y: this.sys.game.config.height - 15,
				stepX: 200
			}
		});
		Phaser.Actions.ScaleXY(this.topBottomCoins.getChildren(), -.5, -.5);

		this.endzone = this.add.sprite(5, (this.sys.game.config.height / 2) + 7, 'endzone');
		this.endzone.setOrigin(0, 0);
		this.endzone.setScale(.75);

		// top row top enemies
		this.topEnemies = this.add.group({
			key: 'enemy',
			repeat: 6,
			setXY: {
				x: 103,
				y: 7,
				stepX: 80,
			}
		});
		Phaser.Actions.ScaleXY(this.topEnemies.getChildren(), -0.5, -0.5);

		// top row bottom enemies
		this.topBotEnemies = this.add.group({
			key: 'enemy',
			repeat: 5,
			setXY: {
				x: 143,
				y: this.sys.game.config.height / 2 - 7,
				stepX: 80,
			}
		});
		Phaser.Actions.ScaleXY(this.topBotEnemies.getChildren(), -0.5, -0.5);

		// bottom row top enemies
		this.botEnemies = this.add.group({
			key: 'enemy',
			repeat: 6,
			setXY: {
				x: 103,
				y: this.sys.game.config.height / 2 + 7,
				stepX: 80,
			}
		});
		Phaser.Actions.ScaleXY(this.botEnemies.getChildren(), -0.5, -0.5);

		// bottom row bottom enemies
		this.botBotEnemies = this.add.group({
			key: 'enemy',
			repeat: 5,
			setXY: {
				x: 143,
				y: this.sys.game.config.height - 7,
				stepX: 80,
			}
		});
		Phaser.Actions.ScaleXY(this.botBotEnemies.getChildren(), -0.5, -0.5);

		this.divider = this.add.sprite(0, this.sys.game.config.height / 2, 'divider');
		this.divider.setOrigin(0, 0);
		this.divider.setScale(.75);

		// make sure this is the last sprite added so it shows up on top of the other sprites (anything under this will be above the player)
		this.player = this.add.sprite(30, 80, 'player');
		this.player.setScale(.5);
		this.player.setOrigin(0, 0);

		//movement game controller
		buttonleft = game.add.button(0, 472, 'leftbutton', null, this, 0, 1, 0, 1);
		buttonleft.events.onInputOver.add(function(){left=true;});
		buttonleft.events.onInputOut.add(function(){left=false;});
		buttonleft.events.onInputDown.add(function(){left=true;});
		buttonleft.events.onInputUp.add(function(){left=false;});

		buttonright = game.add.button(160, 472, 'rightbutton', null, this, 0, 1, 0, 1);
		buttonright.events.onInputOver.add(function(){right=true;});
		buttonright.events.onInputOut.add(function(){right=false;});
		buttonright.events.onInputDown.add(function(){right=true;});
		buttonright.events.onInputUp.add(function(){right=false;});

		// movement
		/*this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
	*/
		this.playerIsAlive = true;

		Phaser.Actions.Call(this.topCoins.getChildren(), function(coin) {
			coin.canCollect = true;
		}, this);

		Phaser.Actions.Call(this.bottomCoins.getChildren(), function(coin) {
			coin.canCollect = true;
		}, this);

		Phaser.Actions.Call(this.botBottomCoins.getChildren(), function(coin) {
			coin.canCollect = true;
		}, this);

		Phaser.Actions.Call(this.topBottomCoins.getChildren(), function(coin) {
			coin.canCollect = true;
		}, this);
	};

	update() {
		this.text = this.add.text(5, 0, "Death Count: " + this.numDeaths, { font: "20px Imapct", color: "black"});

		if (buttonleft) {
			this.player.x -= this.playerSpeed;
			player.body.moveLeft(500);
		}

		if(buttonright) {
			this.player.x += this.playerSpeed;
			player.body.moveRight(500);
		}
		/*if(this.key_A.isDown) {
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
*/
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

		// top row top enemies
		let topEnemies = this.topEnemies.getChildren();
		let topNumEnemies = topEnemies.length;

		//enemies change direction when they hit a wall
		if (topEnemies[1].y >= this.topEnemyMaxY && this.topEnemySpeed > 0) {
			this.topEnemySpeed *= -1;
		} else if (topEnemies[1].y <= this.topEnemyMinY && this.topEnemySpeed < 0) {
			this.topEnemySpeed *= -1;
		}

		for (let i = 0; i < topNumEnemies; i++) {
			topEnemies[i].y += this.topEnemySpeed;

			// collision with enemies
			if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), topEnemies[i].getBounds()) && !this.inDebugMode) {
				this.gameOver();
				break;
			}
		}

		// top row bottom enemies
		let topBotEnemies = this.topBotEnemies.getChildren();
		let topBotNumEnemies = topBotEnemies.length;

		//enemies change direction when they hit a wall
		if (topBotEnemies[1].y >= this.topEnemyMaxY && this.botEnemySpeed > 0) {
			this.botEnemySpeed *= -1;
		} else if (topBotEnemies[1].y <= this.topEnemyMinY && this.botEnemySpeed < 0) {
			this.botEnemySpeed *= -1;
		}

		for (let i = 0; i < topBotNumEnemies; i++) {
			topBotEnemies[i].y += this.botEnemySpeed;

			// collision with enemies
			if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), topBotEnemies[i].getBounds()) && !this.inDebugMode) {
				this.gameOver();
				break;
			}
		}

		// bottom row top enemies
		let botEnemies = this.botEnemies.getChildren();
		let botNumEnemies = botEnemies.length;

		for (let i = 0; i < botNumEnemies; i++) {
			botEnemies[i].y += this.topEnemySpeed;

			// collision with enemies
			if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), botEnemies[i].getBounds()) && !this.inDebugMode) {
				this.gameOver();
				break;
			}
		}

		// bottom row bottom enemies
		let botBotEnemies = this.botBotEnemies.getChildren();
		let botBotNumEnemies = botBotEnemies.length;

		for (let i = 0; i < botBotNumEnemies; i++) {
			botBotEnemies[i].y += this.botEnemySpeed;

			// collision with enemies
			if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), botBotEnemies[i].getBounds()) && !this.inDebugMode) {
				this.gameOver();
				break;
			}
		}

		// top row top coins
		let topCoins = this.topCoins.getChildren();
		let topCoinsNum = topCoins.length;

		for(let i = 0; i < topCoinsNum; i++) {
			if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), topCoins[i].getBounds())) {
				if(topCoins[i].canCollect) {
					this.numCoins++;
					topCoins[i].canCollect = false;
					topCoins[i].destroy();
					console.log(this.numCoins);
				}
				break;
			}
		}

		// top row bottom coins
		let bottomCoins = this.bottomCoins.getChildren();
		let botCoinsNum = bottomCoins.length;

		for(let i = 0; i < botCoinsNum; i++) {
			if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), bottomCoins[i].getBounds())) {
				if(bottomCoins[i].canCollect) {
					this.numCoins++;
					bottomCoins[i].canCollect = false;
					bottomCoins[i].destroy();
					console.log(this.numCoins);
				}
				break;
			}
		}

		// bottom row top coins
		let topBottomCoins = this.topBottomCoins.getChildren();
		let topBotCoinsNum = topBottomCoins.length;

		for(let i = 0; i < topBotCoinsNum; i++) {
			if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), topBottomCoins[i].getBounds())) {
				if(topBottomCoins[i].canCollect) {
					this.numCoins++;
					topBottomCoins[i].canCollect = false;
					topBottomCoins[i].destroy();
					console.log(this.numCoins);
				}
				break;
			}
		}

		// bottom row bottom coins
		let botBottomCoins = this.botBottomCoins.getChildren();
		let botBotCoinsNum = botBottomCoins.length;

		for(let i = 0; i < botBotCoinsNum; i++) {
			if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), botBottomCoins[i].getBounds())) {
				if(botBottomCoins[i].canCollect) {
					this.numCoins++;
					botBottomCoins[i].canCollect = false;
					botBottomCoins[i].destroy();
					console.log(this.numCoins);
				}
				break;
			}
		}
	};

	gameOver() {
		console.log("GameOver");
		this.numDeaths++;
		this.scene.start("level1");
	}

	gameWon() {
		if(this.numCoins >= 8) {
			console.log("GameWon");
			this.scene.start("level2");
		}
	}
}