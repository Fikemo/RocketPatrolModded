class EnemyRacket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        
        scene.add.existing(this);
        this.moveSpeed = 3;
        this.moveDirection = 1;

        this.isHitting = false;
        this.hitActive = false;
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
        // this.angle -= 10
        
        // where the ball rests
        this.restPoint = { x: x + 40, y: Math.floor(y + 6) };

        this.ball = scene.ball;
    }

    update(){

        if (!this.isHitting){
            this.x += this.moveSpeed * this.moveDirection;
        } else {
            this.angle += this.rotationSpeed;

            this.rotations -= 1;
            if (this.rotations <= 0){
                this.isHitting = false;
                // this.angle = -10;
            }

            if (this.rotations >= this.maxRotations - 30){
                this.hitActive = true;
            } else {
                this.hitActive = false;
            }
        }

        if(this.x >= game.config.width + this.width){
            this.reset();
        }

        // let hitBuffer = 100;
        // 
        // if (this.x < hitBuffer){ // left side
        //     this.direction = this.getRandomInt(2) == 0 ? directions.CENTER : directions.RIGHT;
        // } else if (this.x > game.config.width - hitBuffer){ // right side
        //     this.direction = this.getRandomInt(2) == 0 ? directions.CENTER : directions.LEFT;
        // } else { // center
        //     switch (this.getRandomInt(3)){
        //         case 0:
        //             this.direction = directions.CENTER;
        //         break;
        //         case 1:
        //             this.direction = directions.LEFT;
        //         break;
        //         case 2:
        //             this.direction = directions.RIGHT;
        //         break;
        //     }
        // }
        
        this.restPoint = { x: this.x + 40, y: Math.floor(this.y + 6) };
    }

    getRandomInt(max){
        return Math.floor(Math.random() * max);
    }

    reset() {
        this.x = -this.width;
    }
}