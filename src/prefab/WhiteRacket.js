class WhiteRacket extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.isHitting = false;
        this.hitActive = false;
        this.score = 0;

        // movement and rotations
        this.moveSpeed = 5;
        this.rotationSpeed = 10;
        this.maxRotations = 360/this.rotationSpeed;
        this.rotations = this.maxRotations;
        this.direction = directions.CENTER;

        // sound effect
        this.sfxHit1 = scene.sound.add('hit1');
        this.sfxHit2 = scene.sound.add('hit2');
        this.sfxHit3 = scene.sound.add('hit3');
        this.sfxHit4 = scene.sound.add('hit4');

        // default rotation angle
        this.angle -= 10

        // where the ball rests
        this.restPoint = {x: x - 30, y: Math.floor(y - 4)};

        this.ball = scene.ball;
    }

    update(){
        if (!this.isHitting){

            if(keyLEFT.isDown && this.x >= this.width){
                this.x -= this.moveSpeed;
                this.direction = directions.LEFT;
            }
            if (keyRIGHT.isDown && this.x <= game.config.width - this.width){
                this.x += this.moveSpeed;
                this.direction = directions.RIGHT;
            }

            if (keyLEFT.isDown && keyRIGHT.isDown) this.direction = directions.CENTER;
            if (!keyLEFT.isDown && !keyRIGHT.isDown) this.direction = directions.CENTER;

            if (Phaser.Input.Keyboard.JustDown(keyDOWN)){
                this.isHitting = true;
                this.rotations = this.maxRotations;
            }
        } else {
            this.angle += this.rotationSpeed;

            this.rotations -= 1;
            if (this.rotations <= 0){
                this.reset();
            }

            if (this.rotations >= this.maxRotations - 30){
                this.hitActive = true;
            } else {
                this.hitActive = false;
            }
        }
        
        this.restPoint = {x: this.x - 30, y: Math.floor(this.y - 4)};
    }

    reset(){
        this.isHitting = false;
        this.hitActive = false;
    }

    playHit() {
        switch(Math.floor(Math.random() * 4)){
            case 0:
                this.sfxHit1.play();
                break;
            case 1:
                this.sfxHit2.play();
                break;
            case 2:
                this.sfxHit3.play();
                break;
            case 3:
                this.sfxHit4.play();
                break;
            default:
                console.log("Error: Invalid Sound");
        }
    }
}