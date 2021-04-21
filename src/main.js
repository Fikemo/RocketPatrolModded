// Finn Morrison
// Racquet Patrol
// 
// Points
// Novice Tier:
// Display the time remain (in seconds) on the screen (10) (Only applicable when playing Time Attack)
// Shrek Tier:
// Implement a smimultaneous two-player mode (30)
// Redesign the game's artwork, UI, and sound to change its theme/aesthetic (It's a tennis game now)
// Bonuses:
// Track a high score that persists across scenes and display it in the UI (5)
// Add your own (copyright-free) background music to the game (5)
// All the new game mechanics (INFINITE)
// 
// Music: https://opengameart.org/content/busy-day-at-the-market
// SFX: https://youtu.be/KOMtMxqrKqU

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