// import Ball from './Ball.js';

// Rocket player prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to the existing scene
        scene.add.existing(this);
        this.isFiring = false;  // Track the rocket firing status
        this.moveSpeed = 3;     // pixels per frame

        // sound effect
        this.sfxRocket = scene.sound.add('sfx_rocket');

        this.sfxHit1 = scene.sound.add('hit1');
        this.sfxHit2 = scene.sound.add('hit2');
        this.sfxHit3 = scene.sound.add('hit3');
        this.sfxHit4 = scene.sound.add('hit4');

        this.rotations = 360;

        this.angle -= 10;

        this.restPoint = {x: x - 30, y: Math.floor(y - 4)};
        // console.log(this.restPoint);

        this.ball = scene.ball;

        this.hitActive = false;
    }

    update() {
        // left and right movement
        if (!this.isFiring){
            if(keyLEFT.isDown && this.x >= borderUISize + this.width){
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
                this.x += this.moveSpeed;
            }
        }

        this.restPoint.x = this.x - 30;
        this.restPoint.y = this.y - 4;

        // fire button
        if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring){
            // this.playHit();
            this.isFiring = true;
            this.rotations = 360/10;
            // this.sfxRocket.play(); // play sfx
        }
        // if fired, move the rocket up
        // if(this.isFiring && this.y >= borderUISize * 3 + borderPadding){
        //     this.y -= this.moveSpeed;
        // }

        if (this.isFiring){
            this.angle += 10;
            // console.log(this.angle);

            this.rotations -= 1;

            if (this.rotations <= 0){
                this.reset();
            }

            if (this.rotations >= (360/10) - 30){
                this.hitActive = true;
            } else {
                this.hitActive = false;
            }
        }

        // reset on miss
        if (this.y <= borderUISize * 3 + borderPadding){
            this.reset();
        }
    }

    // reset rocket to "ground"
    reset() {
        this.isFiring = false;
        this.hitActive = false;
        this.y = game.config.height - borderUISize - borderPadding;
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