var config = {
  	type: Phaser.Canvas,
  	width: 730, // game width
  	height: 345, // game height
  	scene: [menu, level1, level2]
};

var game = new Phaser.Game(config);