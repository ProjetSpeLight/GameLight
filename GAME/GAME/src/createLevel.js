﻿
function createLevel(game) {
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    bg = game.add.sprite(0, 0, 'sky');
    bg.fixedToCamera = true;



    var plateformData = [
        { "x": 400, "y": 400, "xScale": 1, "yScale": 1 },
        { "x": 50, "y": 250, "xScale": 1, "yScale": 1 },
        { "x": 800, "y": 300, "xScale": 1, "yScale": 1},
        { "x": 0, "y": game.world.height - 64, "xScale": game.world.width/200, "yScale": 2}
    ]

    game.world.setBounds(0, 0, 1600, 600);
 

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();
    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    plateformData.forEach(function (element) {
        var ground = platforms.create(element.x, element.y, 'ground');
        ground.scale.setTo(element.xScale, element.yScale);
        ground.body.immovable = true;
    });




    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.0;
    player.body.gravity.y = 1000;
    game.camera.follow(player);
    player.body.collideWorldBounds = true;

    // Initialization of the player animations
    initializePlayerAnimations(player);
    player.color = ColorEnum.BLUE;

    stars = game.add.group();

    stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++) {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 70, 0, 'star');

        //  Let gravity do its thing
        star.body.gravity.y = 300;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }  
}
