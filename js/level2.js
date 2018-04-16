class level2 extends Phaser.Scene {
	constructor(numDeaths) {
		super({ key: "level2"});
		if(numDeaths == null) {
			this.numDeaths = 0;
		} else {
			this.numDeaths = numDeaths;
		}
	}

	init() {
		this.playerSpeed = 3;
		//this.numDeaths = 0;
		this.topEnemySpeed = .5;
		this.botEnemySpeed = -.5;

		this.topEnemyMaxY = this.sys.game.config.height / 2 -20;
		this.topEnemyMinY = 1;

		this.botEnemyMaxY = this.sys.game.config.height / 2 + 7;
		this.botEnemyMinY = this.sys.game.config.height - 7;

	}

	preload() {
	
		this.load.image('background2', 'assets/deansLevel/background2 .png');
		this.load.image('divider', 'assets/deansLevel/divider.png');
		this.load.image('finish', 'assets/deansLevel/finish.png');
		this.load.image('enemy', 'assets/enemy.png');
		this.load.image('player', 'assets/deansLevel/player.png');
		this.load.image('enemy1', 'assets/deansLevel/enemy1.png');
		this.load.image('enemy2', 'assets/deansLevel/enemy2.png');
		this.load.image('enemy3', 'assets/deansLevel/enemy3.png');
		this.load.image('enemy4', 'assets/deansLevel/enemy4.png');
	};
 
	create() {
			let bg = this.add.sprite(0, 0, 'background2');
			bg.setOrigin(0, 0);
			bg.setScale(1.88,1.75);

		this.divider = this.add.sprite(345, 100, 'divider');
		this.divider.setOrigin(0, 0);
		this.divider.setScale(1);

		this.finish = this.add.sprite(555, (this.sys.game.config.height / 2) + 7, 'finish');
		this.finish.setOrigin(0, 0);
		this.finish.setScale(.75);

		// make sure this is the last sprite added so it shows up on top of the other sprites (anything under this will be above the player)
		this.player = this.add.sprite(30, 80, 'player');
		this.player.setScale(.5);
		this.player.setOrigin(0, 0);

		// movement
		this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

		this.playerIsAlive = true;
	
		
		// top row top enemies
		this.topEnemies = this.add.group({
			key: 'enemy1',
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
			key: 'enemy2',
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
			key: 'enemy3',
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
			key: 'enemy4',
			repeat: 5,
			setXY: {
				x: 143,
				y: this.sys.game.config.height - 7,
				stepX: 80,
			}
		});
		Phaser.Actions.ScaleXY(this.botBotEnemies.getChildren(), -0.5, -0.5);

		

	};

	update() {
		
		this.text = this.add.text(5, 5, "Death Count: " + this.numDeaths, { font: "20px Imapct", color: "black"});

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

		//collision with the endzone
		if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.finish.getBounds())) {
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
			if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), topEnemies[i].getBounds())) {
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
			if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), topBotEnemies[i].getBounds())) {
				this.gameOver();
				break;
			}
		}

		// bottom row top enemies
		let botEnemies = this.botEnemies.getChildren();
		let botNumEnemies = botEnemies.length;

		//enemies change direction when they hit a wall
		if (botEnemies[1].y >= this.botEnemyMaxY && this.botEnemySpeed > 0) {
			this.botEnemySpeed *= -1;
		} else if (botEnemies[1].y <= this.botEnemyMinY && this.botEnemySpeed < 0) {
			this.botEnemySpeed *= -1;
		}

		for (let i = 0; i < botNumEnemies; i++) {
			botEnemies[i].y += this.topEnemySpeed;

			// collision with enemies
			if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), botEnemies[i].getBounds())) {
				this.gameOver();
				break;
			}
		}

		// bottom row bottom enemies
		let botBotEnemies = this.botBotEnemies.getChildren();
		let botBotNumEnemies = botBotEnemies.length;

		//enemies change direction when they hit a wall
		if (botBotEnemies[1].y >= this.botEnemyMaxY && this.botEnemySpeed > 0) {
			this.botEnemySpeed *= -1;
		} else if (botBotEnemies[1].y <= this.botEnemyMinY && this.botEnemySpeed < 0) {
			this.botEnemySpeed *= -1;
		}

		for (let i = 0; i < botBotNumEnemies; i++) {
			botBotEnemies[i].y += this.botEnemySpeed;

			// collision with enemies
			if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), botBotEnemies[i].getBounds())) {
				this.gameOver();
				break;
			}
		}
	};

	gameOver() {
		console.log("numDeaths");
		this.numDeaths++;
		console.log(this.numDeaths);
		this.scene.start("level2");
	}

	gameWon() {
		console.log("GameWon");
		// next level goes here
		//this.scene.manager.bootScene(level2);
		//console.log(bootScene);
	}
}