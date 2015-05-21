
function createLevel(game, levelData) {
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');


    levelData = [
        { "type": 'plateform', "x": 400, "y": 400, "xScale": 1, "yScale": 1, "skin": 'ground'},
        { "type": 'plateform', "x": 50, "y": 250, "xScale": 1, "yScale": 1, "skin": 'ground' },
        { "type": 'plateform', "x": 0, "y": game.world.height - 64, "xScale": 2, "yScale": 2, "skin": 'ground' },
        { "type": 'coin', "x": 400, "y": 400, "xScale": 1, "yScale": 1, "skin": 'coin' },
        { "type": 'coin', "x": 50, "y": 250, "xScale": 1, "yScale": 1, "skin": 'coin' },
        { "type": 'coin', "x": 0, "y": game.world.height - 64, "xScale": 2, "yScale": 2, "skin": 'coin' },
        { "type": 'player', "x": 32, "y": game.world.height - 150, "xScale": 2, "yScale": 2, "skin": '' }
    ]

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();
    coins = game.add.group();
    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;
    coins.enableBody = true;




    /*
    game.levelData.platforms.forEach(function (element) {
        createPlatform(element);
    });

    game.levelData.coins.forEach(function (element) {
        createCoin(element);
    });

    game.levelData.playerStart.forEach(function (element) {
        createStart(element, game);
    });
    */




    levelData.forEach(function (element) {
        switch (element.type) {
            case 'plateform':
                createPlatform(element);
                break;
            case 'coin':
                createCoin(element);
                break;
            case 'player':
                createStart(element,game);
                break;
            default:
        }
    });

    

    



}

function createPlatform(element) {
    var ground = platforms.create(element.x, element.y, 'ground');
    ground.scale.setTo(element.xScale, element.yScale);
    ground.body.immovable = true;
}

function createCoin(element) {
    var coin = coins.create(element.x, element.y, 'coin');
    coin.body.gravity.y = 0;
}

function createStart(element,game) {
    // The player and its settings
    player = game.add.sprite(element.x, element.y, 'dude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.0;
    player.body.gravity.y = 1000;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
}
