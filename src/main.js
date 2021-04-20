let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play, TwoPlay ],
}

let game = new Phaser.Game(config);

// set UI sizes
let playerSpawnHeight = 60;
let enemySpawnHeight = 90;
let borderSize = 10;
let highScore = 0;

const directions = {
    RIGHT: 1,
    CENTER: 0,
    LEFT: -1,
}

//reserve keyboard bindings
let keyDOWN, keyLEFT, keyRIGHT, keyS, keyA, keyD, keyR, keyM;