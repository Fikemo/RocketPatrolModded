class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){
        this.load.path = './assets/';

        this.load.audio('hit1', 'racketHit1.wav');
        this.load.audio('hit2', 'racketHit2.wav');
        this.load.audio('hit3', 'racketHit3.wav');
        this.load.audio('hit4', 'racketHit4.wav');
        this.load.audio('playMusic', 'playMusic.wav');
    }

    create(){
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
             backgroundColor: '#F3B141',
             color: '#843605',
             align: 'center',
             padding: {
                 top: 5,
                 bottom: 5,
             },
             fixedWidth: 0,
        }

        this.add.text(game.config.width/2, game.config.height/2 - 60, 'RACQUET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, '← 1 Player\n→ 2 Player', menuConfig).setOrigin(0.5);

        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        
        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            this.scene.start('twoPlayScene');
        }
    }
}