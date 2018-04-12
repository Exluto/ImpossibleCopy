class level2 extends Phaser.Scene {
	constructor(numDeaths = 0) {
		super({ key: "level2"});
		this.numDeaths = numDeaths;
	}

	init() {
		this.playerSpeed = 3;
		//this.numDeaths = 0;
	}

	preload() {
		this.load.image('enemy5', 'assets/deansLevel/enemy5.png');
		this.load.image('enemy4', 'assets/deansLevel/enemy4.png');
		this.load.image('enemy3', 'assets/deansLevel/enemy3.png');
		this.load.image('enemy2', 'assets/deansLevel/enemy2.png');
		this.load.image('background2', 'assets/deansLevel/background2 .png');
		this.load.image('divider', 'assets/deansLevel/divider.png');
		this.load.image('endzone', 'assets/endzone.png');
		this.load.image('player', 'assets/player.png');
	};
 
	create() {
			let bg = this.add.sprite(0, 0, 'background2');
			bg.setOrigin(0, 0);
			bg.setScale(1.88,1.75);

		this.divider = this.add.sprite(345, 100, 'divider');
		this.divider.setOrigin(0, 0);
		this.divider.setScale(1);

		this.endzone = this.add.sprite(500,100, (this.sys.game.config.height / 2) + 7, 'endzone');
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

		this.playerIsAlive = true;
		this.enemy2 = this.add.sprite(200,80, 'enenmy2');
	
		this.enemy2.setScale(.5);
		this.enemy2.setOrigin(0,0);

		this.enemy3 = this.add.sprite(500,80, 'enenmy3');
		this.enemy3.setScale(.5);
		this.enemy3.setOrigin(0,0);

		this.enemy4 = this.add.sprite(333,40, 'enenmy4');
		this.enemy4.setScale(.5);
		this.enemy4.setOrigin(0,0);
	
		this.enemy5 = this.add.sprite(100,200, 'enenmy5');
		this.enemy5.setScale(.5);
		this.enemy5.setOrigin(0,0);

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
			
			if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.enemy2.getBounds())) {
		this.gameOver();
	}
		if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.enemy3.getBounds())) {
		this.gameOver();
	}
			if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.enemy4.getBounds())) {
		this.gameOver();
	}
			if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.enemy5.getBounds())) {
		this.gameOver();
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
		if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.endzone.getBounds())) {
			this.gameWon();
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