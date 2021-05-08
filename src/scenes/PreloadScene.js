export default class PreloadScene extends Phaser.Scene {
	constructor() {
		super({key: 'PreloadScene'});
	}

	preload() {
		this.cameras.main.setBackgroundColor(0x111111);

		this.loading = this.add.text(this.CX, this.CY, "Loading...", { font: "20px Courier" });
		this.loading.setOrigin(0.5);

		this.load.on('progress', this.onLoadProgress, this);


		/* Images */

		this.load.image('logo', 'assets/images/logo.png');
		this.load.spritesheet('mouse', 'assets/images/mouse.png', { frameWidth: 256, frameHeight: 200 });


		/* Audio */

		// this.load.audio('shoot_1', 'assets/audio/shoot_1.wav');


		/* Plug-ins */

		//this.load.plugin('rexroundrectangleplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js', true);    
	}

	onLoadProgress(progress) {
		this.loading.setText(`Loading... ${Math.round(progress * 100)}%`);
	}

	create() {
		this.scene.start("TitleScene");
	}


	get W() { return this.cameras.main.displayWidth; }
	get H() { return this.cameras.main.displayHeight; }
	get CX() { return this.cameras.main.centerX; }
	get CY() { return this.cameras.main.centerY; }

	fitToScreen(image) {
		image.setScale(Math.max(this.W / image.width, this.H / image.height));
	}
}