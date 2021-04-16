
// tennis ball prefab
class Ball extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, parent = null){
        super(scene, x, y, texture, frame);

        // add the object to the existing scene
        scene.add.existing(this);

        this.parent = parent;

        this.anims.create({
            key: 'ball',

            frames: this.anims.generateFrameNumbers('ball', {
                start: 0,
                end: 3,
                first: 0,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.play('ball');

        this.moveSpeed = 4;

        console.log(parent);

        if (this.parent == null) {
            this.parent = { restPoint: { x: x, y: y} };
        }

        this.state = {
            resting: true,
            restPoint: this.parent.restPoint,
        }

        this.x = this.state.restPoint.x;
        this.y = this.state.restPoint.y;
    }

    update(){

        if (this.state.resting){

            this.state.restPoint = this.parent.restPoint;

            this.x = this.state.restPoint.x;
            this.y = this.state.restPoint.y;
        }

    }
}