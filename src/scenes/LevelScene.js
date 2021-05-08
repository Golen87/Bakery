import Player from "./../components/Player.js";

export default class LevelScene extends Phaser.Scene {
	constructor() {
		super({key: 'LevelScene'});
	}

	create() {
		this.cameras.main.setBackgroundColor(0xFFFFFF);

		this.bg = [];
		for (let i = 0; i < 3; i++) {
			let s = [0.8, 0.9, 1.1][i];
			this.bg[i] = this.add.image(this.CX, this.CY, 'bg'+(i+1));
			this.bg[i].setScale(s);
			this.bg[i].setScrollFactor(s, 1.0);
			this.bg[i].setDepth(i);
		}
		this.bg[2].x += 100;

		this.cameras.main.setScroll(0, 0);


		this.player = new Player(this, this.CX, 460);
		this.player.setDepth(1);


		/* Input */

		this.setupInput();
	}


	update(time, delta) {
		this.player.update(time, delta);
		// this.cameras.main.scrollX = 500*Math.sin(time/1000);
		this.cameras.main.scrollX = this.player.x - this.CX;
	}


	setupInput() {
		// if (!this._listeners) {
			// this._listeners = true;
		// }

		this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
			.on('down', this.onTapDown, this)
			.on('up', this.onTapUp, this);
		this.input.on('pointerdown', this.onTapDown, this);
		this.input.on('pointerup', this.onTapUp, this);

		this.keys = this.input.keyboard.addKeys({
			up: 'up',
			down: 'down',
			left: 'left',
			right: 'right',
			W: 'W',
			S: 'S',
			A: 'A',
			D: 'D'
		});
	}

	get leftDown() {
		return (this.keys.left.isDown || this.keys.A.isDown);
	}

	get rightDown() {
		return (this.keys.right.isDown || this.keys.D.isDown);
	}

	onTapDown(event) {
	}

	onTapUp(event) {
	}


	addEvent(delay, callback, callbackScope=this) {
		return this.time.addEvent({delay, callback, callbackScope});
	}


	get W() { return this.cameras.main.displayWidth; }
	get H() { return this.cameras.main.displayHeight; }
	get CX() { return this.cameras.main.centerX; }
	get CY() { return this.cameras.main.centerY; }

	fitToScreen(image) {
		image.setScale(Math.max(this.W / image.width, this.H / image.height));
	}
}