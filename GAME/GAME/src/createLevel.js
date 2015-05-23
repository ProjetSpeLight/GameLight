

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
    ends = game.add.group();
    colourPlatforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;
    coins.enableBody = true;
    ends.enableBody = true;
    colourPlatforms.enableBody = true;


    // We parse the JSON file
    var levelData = game.cache.getJSON('level');


    var dataPlayer = levelData.playerStart; // Data related to the player


    // Creation of the fixed platforms
    createPlatform(levelData);

    // Creation of the coins
    createCoin(levelData);

    // Creation of the ends
    createEnds(levelData);

    // Creation of the player
    createStart(dataPlayer, game);


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


}

function createPlatform(levelData) {
    var dataPlatforms = levelData.platforms;
    for (var i = 0 ; i < dataPlatforms.length ; i++) {
        var platformData = dataPlatforms[i];
        var platform;
        if (platformData.coulour != "") {
            platform = colourPlatforms.create(platformData.x, platformData.y, platformData.skin + platformData.color);
        } else {
            platform = platforms.create(platformData.x, platformData.y, platformData.skin + platformData.color);
        }
        platform.scale.setTo(platformData.xScale, platformData.yScale);
        platform.body.immovable = true;
    }
}

function createEnds(levelData) {
    var dataEnds = levelData.ends;
    for (var i = 0 ; i < dataEnds.length ; i++) {
        var endData = dataEnds[i];
        var end = ends.create(endData.x, endData.y, 'diamond');
        end.body.bounce.y = 0;
        end.body.gravity.y = 1000;
    }
}

function createCoin(levelData) {
    var dataCoins = levelData.coins;
    for (var i = 0 ; i < dataCoins.length ; i++) {
        var coinData = dataCoins[i];
        var coin = coins.create(coinData.x, coinData.y, 'coin');
        coin.body.gravity.y = 0;
    }
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
