let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, PlaySettings, TwoPlaySettings, Play, TwoPlay, TwoPlayVersus ],
}

let game = new Phaser.Game(config);
game.settings = {twoPlayer: false, endless: true }

// set UI sizes
let playerSpawnHeight = 60;
let enemySpawnHeight = 90;
let borderSize = 10;
let endlessHighScore = 0;
let timeAttackHighScore = 0;
let twoPlayerEndlessHighScore = 0;
let twoPlayerTimeAttackHighScore = 0;
let playMusic;

const directions = {
    RIGHT: 1,
    CENTER: 0,
    LEFT: -1,
}

//reserve keyboard bindings
let keyDOWN, keyLEFT, keyRIGHT, keyS, keyA, keyD, keyR, keyM;