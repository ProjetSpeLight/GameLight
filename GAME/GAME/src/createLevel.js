

function createLevel(game) {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    bg = game.add.sprite(0, 0, 'sky');
    bg.fixedToCamera = true;

    game.world.setBounds(0, 0, 1600, 600);


    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();
    coins = game.add.group();
    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;
    coins.enableBody = true;



    /********** OLD VERSION *******************/

    /*var plateformData = [
        { "x": 400, "y": 400, "xScale": 1, "yScale": 1 },
        { "x": 50, "y": 250, "xScale": 1, "yScale": 1 },
        { "x": 800, "y": 300, "xScale": 1, "yScale": 1},
        { "x": 0, "y": game.world.height - 64, "xScale": game.world.width / 200 - 3, "yScale": 2 },
        { "x": game.world.width - 2, "y": game.world.height - 64, "xScale": 2, "yScale": 2 }];*/

    /*levelData = [
        { "type": 'plateform', "x": 400, "y": 400, "xScale": 1, "yScale": 1, "skin": 'ground'},
        { "type": 'plateform', "x": 50, "y": 250, "xScale": 1, "yScale": 1, "skin": 'ground' },
        { "type": 'plateform', "x": 0, "y": game.world.height - 64, "xScale": 2, "yScale": 2, "skin": 'ground' },
        { "type": 'coin', "x": 400, "y": 400, "xScale": 1, "yScale": 1, "skin": 'coin' },
        { "type": 'coin', "x": 50, "y": 250, "xScale": 1, "yScale": 1, "skin": 'coin' },
        { "type": 'coin', "x": 0, "y": game.world.height - 64, "xScale": 2, "yScale": 2, "skin": 'coin' },
        { "type": 'player', "x": 32, "y": game.world.height - 150, "xScale": 2, "yScale": 2, "skin": '' }
    ]*/

    /*levelData.forEach(function (element) {
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
    });*/


    /********** NEW VERSION WITH JSON ********************/

    // We parse the JSON file
    var levelData = game.cache.getJSON('level');

    // We store each array in a variable to process them individually
    var dataPlatforms = levelData.plateforms; // Fixed platforms
    var dataPlayer = levelData.playerStart; // Data related to the player
    var dataCoins = levelData.coins;

    // Creation of the fixed platforms
    for (var i = 0 ; i < dataPlatforms.length ; i++) {
        createPlatform(dataPlatforms[i]);
    }

    // Creation of the coins
    for (var i = 0 ; i < dataCoins.length ; i++) {
        createCoin(dataCoins[i]);
    }

    // Creation of the player
    createStart(dataPlayer, game);




    /*************** TO BE INCLUDED TO NEW VERSION ***********************/

    //Plateformes colorees
    ColourPlatforms = game.add.group();
    ColourPlatforms.enableBody = true;

    var ColourPlatformsData = [
        { "type": 'plateform', "x": 600, "y": 250, "xScale": 1, "yScale": 1, "platformcolor": 'GREEN' },
    { "type": 'plateform', "x": 600, "y": 50, "xScale": 1, "yScale": 1, "platformcolor": 'RED' }]



    ColourPlatformsData.forEach(function (element) {
        switch (element.platformcolor) {
            case 'GREEN':
                createPlatformGreen(element);
                break;
            case 'BLUE':
                createPlatformBlue(element);
                break;
            case 'RED':
                createPlatformRed(element);
                break;
            default:
        }
    });


    //Plateformes mouvantes
    movingPlatforms = game.add.physicsGroup();

    var movingPlatformsData = [{ "x": 900, "y": 400, "xScale": 1, "yScale": 1, "speed": 100, "limit": 200 },
    { "x": 100, "y": 150, "xScale": 1, "yScale": 1, "speed": 150, "limit": 600 }
    ]
    movingPlatformsData.forEach(function (element) {
        var plat = movingPlatforms.create(element.x, element.y, 'ground');
        plat.scale.setTo(element.xScale, element.yScale);
        plat.body.sprite.leftBounds = element.x;
        plat.body.sprite.rightBounds = element.x + element.limit;
        plat.body.velocity.x = element.speed;
    })
    movingPlatforms.setAll('body.allowGravity', false);
    movingPlatforms.setAll('body.immovable', true);


    diamond = game.add.sprite(300, 30, 'diamond');
    game.physics.arcade.enable(diamond);
    diamond.body.bounce.y = 0.0;
    diamond.body.gravity.y = 1000;


}

function createPlatform(element) {
    var ground = platforms.create(element.x, element.y, 'ground');
    ground.scale.setTo(element.xScale, element.yScale);
    ground.body.immovable = true;
}
function createPlatformGreen(element) {
    var ground = ColourPlatforms.create(element.x, element.y, 'groundGreen');
    ground.scale.setTo(element.xScale, element.yScale);
    ground.body.immovable = true;

}

function createPlatformBlue(element) {
    var ground = ColourPlatforms.create(element.x, element.y, 'groundBlue');
    ground.scale.setTo(element.xScale, element.yScale);
    ground.body.immovable = true;
}

function createPlatformRed(element) {
    var ground = ColourPlatforms.create(element.x, element.y, 'groundRed');
    ground.scale.setTo(element.xScale, element.yScale);
    ground.body.immovable = true;
}

function createCoin(element) {
    var coin = coins.create(element.x, element.y, 'coin');
    coin.body.gravity.y = 0;
}

function createStart(element, game) {
    // The player and its settings
    player = game.add.sprite(element.x, element.y, 'dude');

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



    /*
    stars = game.add.group();

    stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++) {
        //  Create a star inside of the 'stars' group
        var star = stars.create((game.world.width-100)*Math.random(), 0, 'coin');

        //  Let gravity do its thing
        star.body.gravity.y = 300;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.2 + Math.random() * 0.2;
    }  */

}
