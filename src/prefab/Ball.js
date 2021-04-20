class Ball extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, parent = null){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.scene = scene;

        this.parent = parent;
        console.log(this.parent);

        this.centerVector = [0,1];
        this.rightVector = [0.5, Math.sqrt(3)/2];
        this.leftVector = [-0.5, Math.sqrt(3)/2];
        this.moveVector = this.centerVector;

        this.direction = directions.CENTER;

        this.directionModifier = -1;

        this.anims.create({
            key: 'ball',
            frames: this.anims.generateFrameNumbers('ball',{
                start: 0,
                end: 3,
                first: 0,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.play('ball');

        this.moveSpeed = 3;
        
        if (this.parent == null){
            this.parent = { restPoint: { x: x, y: y } };
        } else {
            parent.ball = this;
        }

        this.resting = true;
        this.restPoint = this.parent.restPoint;
        this.hitByPlayer = false;

        this.x = this.restPoint.x;
        this.y = this.restPoint.y;
    }

    update(){

        this.directionModifier = this.hitByPlayer ? -1 : 1;

        if (this.resting){
            this.restPoint = this.parent.restPoint;

            this.x = this.restPoint.x;
            this.y = this.restPoint.y;
        } else {

            switch(this.direction){
                case directions.CENTER:
                    this.moveVector = this.centerVector;
                break;
                case directions.LEFT:
                    this.moveVector = this.leftVector;
                break;
                case directions.RIGHT:
                    this.moveVector = this.rightVector;
                break;
            }

            this.x += this.moveVector[0] * this.moveSpeed;
            this.y += this.moveVector[1] * this.moveSpeed * this.directionModifier;
        }

        if (this.y < this.height / 2 || this.y > game.config.height + this.height / 2) {
            this.reset();
            this.scene.setGameOver(true);
        };
    }

    reset(){
        this.resting = true;
        this.hitByPlayer = false;
    }
}