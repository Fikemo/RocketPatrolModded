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

        if (playMusic == null) playMusic = this.sound.add('playMusic', {volume: 0.1, loop: true});
        playMusic.stop();
        playMusic.play();

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

        this.add.text(game.config.width/2, game.config.height/2 - 60, 'RACQUET PATROL‽', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, '← 1 Player\n→ 2 Player', menuConfig).setOrigin(0.5);
        
        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        menuConfig.fontSize = '14px';
        menuConfig.align = 'left';
        this.add.text(game.config.width/2, game.config.height/2 + 100, `High Scores\n1P Endless: ${endlessHighScore}\n1P Time Attack: ${timeAttackHighScore}\n2P Endless: ${twoPlayerEndlessHighScore}\n2P Time Attack: ${twoPlayerTimeAttackHighScore}`, menuConfig).setOrigin(0.5);
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
            game.settings = {
                endless: false,
                twoPlayer: false,
            }
            this.scene.start('playSettingsScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            game.settings = {
                endless: false,
                twoPlayer: true,
            }
            this.scene.start('twoPlaySettingsScene');
        }
    }
}