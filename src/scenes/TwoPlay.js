class TwoPlay extends Phaser.Scene {
    constructor(){
        super("twoPlayScene");
    }

    preload(){
        console.log("Two Player");

        this.gameOver = false;

        this.load.image("court", "./assets/court.png");
        this.load.image("redRacket", "./assets/redRacket.png");
        this.load.image("blueRacket", "./assets/blueRacket.png");
        this.load.image("blackRacket", "./assets/blackRacket.png");

        this.load.spritesheet('explosion', './assets/explosion.png',{
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9,
        });

        this.load.spritesheet('ball', './assets/ballSpriteSheet.png',{
            frameWidth: 16,
            frameHeight: 16,
            startFrame: 0,
            endFrame: 3,
        })

        this.score = 0;
    }

    create(){
        this.court = this.add.sprite(0,0,"court").setOrigin(0,0);

        this.p1Racket = new WhiteRacket(this, game.config.width/2 - 60, game.config.height - playerSpawnHeight, 'redRacket').setOrigin(0.75, 0.5);

        this.p2Racket = new PlayerTwoRacket(this, game.config.width/2 + 60, game.config.height - playerSpawnHeight, 'blueRacket').setOrigin(0.75, 0.5);
        
        let w = (game.config.width - (borderSize * 6 * 2)) / 4;
        let enemyGap = 30;
        this.enemyRacket01 = new EnemyRacket(this, w * 4, enemySpawnHeight, 'blackRacket', 0).setOrigin(0.25, 0.5);
        this.enemyRacket02 = new EnemyRacket(this, w * 3, enemySpawnHeight + enemyGap, 'blackRacket', 0).setOrigin(0.25, 0.5);
        this.enemyRacket03 = new EnemyRacket(this, w * 2, enemySpawnHeight + enemyGap * 2, 'blackRacket', 0).setOrigin(0.25, 0.5);
        this.enemyRacket04 = new EnemyRacket(this, w, enemySpawnHeight + enemyGap, 'blackRacket', 0).setOrigin(0.25, 0.5);
        this.enemyRacket05 = new EnemyRacket(this, 0, enemySpawnHeight, 'blackRacket', 0).setOrigin(0.25, 0.5);

        let ballParent = Math.random() < 0.5 ? this.p1Racket : this.p2Racket;

        this.ball = new Ball(this, game.config.width/2, game.config.height - playerSpawnHeight, 'ball', 0, ballParent);

        // this.enemyRacket01.setScale(1.7);
        // this.enemyRacket02.setScale(1.7);
        // this.enemyRacket03.setScale(1.7);
        // this.enemyRacket04.setScale(1.7);
        
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#000000',
            color: '#92DE00',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 112,
        }

        this.p1ScoreText = this.add.text(
            53,
            game.config.height - 39,
            this.p1Racket.score,
            scoreConfig
        );
        
        this.p2ScoreText = this.add.text(
            220,
            game.config.height - 39,
            this.p1Racket.score,
            scoreConfig
        );

        this.totalScoreText = this.add.text(
            game.config.width - 120,
            game.config.height - 39,
            this.score,
            scoreConfig
        );

        // label config
        let labelConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#92DE00',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        };

        this.p1ScoreLabel = this.add.text(
            this.p1ScoreText.x - 48,
            this.p1ScoreText.y,
            "P1:",
            labelConfig,
        );

        this.p2ScoreLabel = this.add.text(
            this.p2ScoreText.x - 48,
            this.p2ScoreText.y,
            "P2:",
            labelConfig,
        );

        this.totalScoreLabel = this.add.text(
            this.totalScoreText.x - 98,
            this.totalScoreText.y,
            "Total:",
            labelConfig,
        );

        this.clock = null;
        if (!game.settings.endless){
            this.clock = this.time.delayedCall(30000, ()=> {
                this.gameOver = true;
            }, null, this);

            this.timerText = this.add.text(
                53,
                3,
                Math.floor(this.clock.getRemainingSeconds()),
                scoreConfig,
            )
        }

    }

    update(){
        if (!this.gameOver){
            this.p1Racket.update();
            this.p2Racket.update();
            this.ball.update();
            this.enemyRacket01.update();
            this.enemyRacket02.update();
            this.enemyRacket03.update();
            this.enemyRacket04.update();
            this.enemyRacket05.update();

            if (this.clock != null) this.timerText.text = Math.floor(this.clock.getRemainingSeconds());

            if (this.p1Racket.hitActive){
                if (this.checkCollision(this.p1Racket, this.ball, 0.75, 0.5, 0.5, 0.5)){
                    if (this.ball.hitByPlayer == false) {
                        this.p1Racket.playHit();
                        if (!this.ball.resting) this.p1Racket.score++;
                        this.p1ScoreText.text = this.p1Racket.score.toString();
                    }

                    this.ball.hitByPlayer = true;
                    this.ball.resting = false;
                    this.ball.direction = this.p1Racket.direction;
                }
            }

            if (this.p2Racket.hitActive){
                if (this.checkCollision(this.p2Racket, this.ball, 0.75, 0.5, 0.5, 0.5)){
                    if (this.ball.hitByPlayer == false) {
                        this.p2Racket.playHit();
                        if (!this.ball.resting) this.p2Racket.score++;
                        this.p2ScoreText.text = this.p2Racket.score.toString();
                    }

                    this.ball.hitByPlayer = true;
                    this.ball.resting = false;
                    this.ball.direction = this.p2Racket.direction;
                }
            }

            this.score = this.p1Racket.score + this.p2Racket.score;
            this.totalScoreText.text = this.score;
            if (game.settings.endless){
                if (this.score > twoPlayerEndlessHighScore) twoPlayerEndlessHighScore = this.score;
            } else {
                if (this.score > twoPlayerTimeAttackHighScore) twoPlayerTimeAttackHighScore = this.score;
            }

            if (!this.ball.resting){
                let shipsArray = [this.enemyRacket01, this.enemyRacket02, this.enemyRacket03, this.enemyRacket04, this.enemyRacket05];

                for (let i = 0; i < shipsArray.length; i++){
                    if (this.checkCollision(this.ball, shipsArray[i], 0.5,0.5,0.25,0.5) && this.ball.hitByPlayer == true){
                        if (this.ball.hitByPlayer == true) {this.p1Racket.playHit(); console.log(this.ball); console.log(shipsArray[i]);}

                        shipsArray[i].isHitting = true;
                        shipsArray[i].rotations = shipsArray[i].maxRotations;

                        this.ball.hitByPlayer = false;
                        this.ball.resting = false;
                        this.ball.direction = shipsArray[i].direction;
                    }
                }
            }
        } else {

            let textHeight = 33;
            let textBuffer = 4;
            let textTotal = textHeight + textBuffer;

            let gameOverConfig = {
                fontFamily: 'Courier',
                fontSize: '28px',
                backgroundColor: '#000000',
                color: '#92DE00',
                align: 'center',
                padding: {
                    top: 5,
                    bottom: 5,
                    left: 4,
                    right: 4,
                },
                fixedWidth: 0,
            }
            this.add.text(game.config.width/2, game.config.height/2 - textTotal, 'GAME OVER', gameOverConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2, `Score: ${this.score}`, gameOverConfig).setOrigin(0.5);
            
            if (game.settings.endless){
                this.add.text(game.config.width/2, game.config.height/2 + textTotal, `High Score: ${twoPlayerEndlessHighScore}`, gameOverConfig).setOrigin(0.5);
            } else {
                this.add.text(game.config.width/2, game.config.height/2 + textTotal, `High Score: ${twoPlayerTimeAttackHighScore}`, gameOverConfig).setOrigin(0.5);
            }

            this.add.text(game.config.width/2, game.config.height/2 + textTotal * 2, 'Press ↓ to Restart or (M) for Menu',gameOverConfig).setOrigin(0.5);

            if (Phaser.Input.Keyboard.JustDown(keyDOWN)){
                this.scene.restart();
            }

            if (Phaser.Input.Keyboard.JustDown(keyM)){
                this.scene.start("menuScene");
            }
        }


    }

    checkCollision(a, b, offsetAX = 0, offsetAY = 0, offsetBX = 0, offsetBY = 0){
        let aX = a.x - (offsetAX * a.width * a.scaleX);
        let aY = a.y - (offsetAY * a.height * a.scaleY);
        let bX = b.x - (offsetBX * b.width * b.scaleX);
        let bY = b.y - (offsetBY * b.height * b.scaleY);

        if (aX < bX + b.width &&
            aX + a.width > bX &&
            aY < bY + b.height &&
            a.height + aY > bY){
                return true;
            } else {
                return false;
            }
    }

    setGameOver(bool){
        this.gameOver = bool;
    }
}