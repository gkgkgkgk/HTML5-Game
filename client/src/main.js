const config = {
	type: Phaser.AUTO,
	width: 1600,
	height: 900,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 }
		}
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

const game = new Phaser.Game(config);
let player = null;
let keys = null;
let lastFired = 0;
let bullets = null;

function preload () {
	this.load.image('ship', 'assets/ship.png');
	this.load.image('laser', 'assets/laser.png');
	keys = this.input.keyboard.addKeys('A,W,D,S');
}

function create () {
	var Bullet = new Phaser.Class({

        Extends: Phaser.Physics.Arcade.Image,

        initialize:

        function Bullet (scene)
        {
            Phaser.Physics.Arcade.Image.call(this, scene, 0, 0, 'laser', 'laser');

            this.setBlendMode(1);
            this.setDepth(1);

            this.speed = 1500;
            this.lifespan = 1000;

            this._temp = new Phaser.Math.Vector2();
        },

        fire: function (ship, position)
        {
            this.lifespan = 1000;

            this.setActive(true);
            this.setVisible(true);
            // this.setRotation(ship.rotation);
            this.setAngle(ship.body.rotation);
            this.setPosition(position.x, position.y);
            this.body.reset(position.x, position.y);

            // ship.body.advancePosition(10, this._temp);

            // this.setPosition(this._temp.x, this._temp.y);
            // this.body.reset(this._temp.x, this._temp.y);

            //  if ship is rotating we need to add it here
            // var a = ship.body.angularVelocity;

            // if (ship.body.speed !== 0)
            // {
            //     var angle = Math.atan2(ship.body.velocity.y, ship.body.velocity.x);
            // }
            // else
            // {
                var angle = Phaser.Math.DegToRad(ship.body.rotation);
            // }

            // this.body.world.velocityFromRotation(angle, this.speed + ship.body.speed, this.body.velocity);
            this.scene.physics.velocityFromRotation(angle, this.speed, this.body.velocity);

            this.body.velocity.x *= 2;
			this.body.velocity.y *= 2;
			this.scaleX = 0.025;
			this.scaleY = 0.025;
        },

        update: function (time, delta)
        {
            this.lifespan -= delta;

            if (this.lifespan <= 0)
            {
                this.setActive(false);
                this.setVisible(false);
                this.body.stop();
            }
        }

    });

	bullets = this.physics.add.group({
        classType: Bullet,
        maxSize: 30,
        runChildUpdate: true
    });
	

	player = this.physics.add.sprite(400, 300, 'ship');
	player.setDrag(300);
	console.log(player);
	player.scaleY = 0.05;
	player.scaleX = 0.05;
}

function update(time, delta) {
	if (keys.A.isDown)
    {
        player.setAngularVelocity(-150);
    }
    else if (keys.D.isDown)
    {
        player.setAngularVelocity(150);
    }
    else
    {
        player.setAngularVelocity(0);
    }

    if (keys.W.isDown)
    {
		player.setVelocity(Math.cos(player.rotation) * 600, Math.sin(player.rotation) * 600);    }
    else
    {
        player.setAcceleration(0);
	}
	

    if (keys.S.isDown && time > lastFired)
    {
        var bullet = bullets.get();

        if (bullet)
        {
			bullet.fire(player, {x: player.x, y: player.y});
            lastFired = time + 100;
        }
    }

}