class menu extends Phaser.Scene {
	constructor() {
		super({ key: "menu" });
	}

	create() {
		var styleGame = { font: "40px Impact", boundsAlignH: "center", boundsAlignV: "middle" };
		var styleStart = { font: "20px Impact", boundsAlignH: "center", boundsAlignV: "middle" };

		this.gameName = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - 25, "Game Title Here", styleGame);
		this.clickToStart = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 20, "Click To Start", styleStart);

		this.gameName.x -= (this.gameName.width * 0.5);
		this.gameName.y -= (this.gameName.height * 0.5);

		this.clickToStart.x -= (this.clickToStart.width * 0.5);
		this.clickToStart.y -= (this.clickToStart.height * 0.5);
	}

	update(delta) {
		if (this.input.activePointer.isDown) {
			this.scene.start("level1");
		}
	}
}