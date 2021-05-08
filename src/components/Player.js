export default class Player extends Phaser.GameObjects.Container {
	constructor(scene, x, y) {
		super(scene, x, y);
		this.scene = scene;
		scene.add.existing(this);

		this.sprite = scene.add.sprite(0, 0, 'mouse', 0);
		// this.sprite.setOrigin(0.5, 1.0);
		// this.sprite.setScale(this.size);
		// this.sprite.setTint(0x7777ff);
		this.add(this.sprite);

		this.setupAnimations();

		this.walkSpeed = 10;
	}

	update(time, delta) {
		let horInput = (-1 * this.scene.leftDown) + (1 * this.scene.rightDown);

		if (horInput == 0) {
			this.play('idle', true);
		}
		else {
			this.play('walk', true);

			this.scaleX = horInput;
		}

		this.x += horInput * this.walkSpeed;
	}


	play(key, ignoreIfPlaying=false) {
		this.sprite.play(key, ignoreIfPlaying);
	}

	setupAnimations() {
		this.scene.anims.create({
			key: 'idle',
			frames: [
				{key: 'mouse', frame: 0, duration: 300},
				{key: 'mouse', frame: 1, duration: 300},
			],
			repeat: -1
		});

		this.scene.anims.create({
			key: 'walk',
			frames: [
				{key: 'mouse', frame: 2, duration: 100},
				{key: 'mouse', frame: 3, duration: 100},
			],
			repeat: -1
		});
	}
}