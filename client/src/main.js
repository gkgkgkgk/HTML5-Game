const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 }
		}
	},
	scene: {
		preload: preload,
		create: create
	}
};

const game = new Phaser.Game(config);
let player = null;
 

function preload ()
{
	this.load.image('ship', 'assets/ship.png');
}

function create ()
{
	player = this.physics.add.sprite(400, 300, 'ship');
	console.log(player);
	player.scaleY = 0.05;
	player.scaleX = 0.05;
	player.setVelocity(5, 0);
}