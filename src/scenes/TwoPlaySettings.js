class TwoPlaySettings extends Phaser.Scene {
    

    constructor(){
        super("twoPlaySettingsScene");
    }

    preload(){

    }

    create(){

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

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

        this.add.text(game.config.width/2, game.config.height/2 - 80, 'Game Type', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - 20, '← Co-Op\n→ Versus', menuConfig).setOrigin(0.5);

        menuConfig.fontSize = '14px';

        this.add.text(game.config.width/2, game.config.height/2 + 40, 'Co-Op: Endless or Time Attack with a friend.\nVersus: Take to either side of the court and\nbe the first player to score 10 points.', menuConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/2 + 110, 'Controls\n ←→ / AD to move. ↓ / S to swing\nHitting the ball while moving will cause it to move in that direction.', menuConfig).setOrigin(0.5);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
            game.settings = {
                endless: true,
                twoPlayer:true,
            }
            this.scene.start('playSettingsScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            game.settings = {
                endless: false,
                twoPlayer:true,
            }
            this.scene.start('twoPlayVersusScene');
        }
    }
}