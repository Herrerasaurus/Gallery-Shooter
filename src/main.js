//Celeste Herrera
// Created: 4/24/2024
// Phaser: 3.70.0
//
// Gallery Shooter


// debug with extreme prejudice
"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 1000,
    height: 800,
    scene: [Title, Movement, End, Credits],
    fps: { forceSetTimeOut: true, target: 30 }
}

const game = new Phaser.Game(config);