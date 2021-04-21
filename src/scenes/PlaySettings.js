class PlaySettings extends Phaser.Scene {
    

    constructor(){
        super("playSettingsScene");
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
        this.add.text(game.config.width/2, game.config.height/2 - 20, '← Endless\n→ Time Attack', menuConfig).setOrigin(0.5);

        menuConfig.fontSize = '14px';

        this.add.text(game.config.width/2, game.config.height/2 + 40, 'Endless: Return the ball as many times as you can in a single rally.\nTime Attack: Return the ball as many times as you can in 30 seconds.', menuConfig).setOrigin(0.5);
        if (game.settings.twoPlayer == false){
            this.add.text(game.config.width/2, game.config.height/2 + 100, 'Controls\n ←→ to move. ↓ to swing\nHitting the ball while moving will cause it to move in that direction.', menuConfig).setOrigin(0.5);
        }
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)){

            if (game.settings.twoPlayer){
                game.settings.endless = true;
                this.scene.start("twoPlayScene");
                return;
            }

            game.settings = {
                endless: true,
                twoPlayer: false,
            }
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){

            if (game.settings.twoPlayer){
                game.settings.endless = false;
                this.scene.start("twoPlayScene");
                return;
            }

            game.settings = {
                endless: false,
                twoPlayer: false,
            }
            this.scene.start('playScene');
        }
    }
}