
define(['phaser', 'app/player', 'app/phasergame', 'app/objects/switch', 'app/objects/mirror', 'app/objects/coin', 'app/objects/platforms', 'app/objects/pique', 'app/objects/ennemi', 'app/objects/filter', 'app/objects/button', 'app/objects/time', 'app/objects/objectsManager'], function (Phaser, player, PhaserGame, switchObject, mirror, coinObject, platformsObject, piqueObject, ennemiObject, filter, button, time, Manager) {

    function createObjects(levelData, createLevel) {

        // Creation of the fixed platforms
        platformsObject.createObjectGroup(levelData);

        // Creation of the coins
        coinObject.createObjectGroup(levelData.coins);
        // Creation of the ennemies
        ennemiObject.createObjectGroup(levelData.ennemis);

        //Creation of the pique
        piqueObject.createObjectGroup(levelData.piques);

        // Creation of the ends
        createEnds(levelData);

        Manager.createObjects(levelData);


        filter.createObjectsGroup(levelData.filters);

        button.createObjectsGroup(levelData.buttons);

        time.createTime(levelData.time);

    }

    function createWorld(levelData) {
        //  Creation of the background
        var background = PhaserGame.game.add.sprite(0, 0, levelData.background);
        background.fixedToCamera = true;


        // Creation of the "frame" of the level
        var worldBounds = levelData.worldBounds;
        PhaserGame.game.world.setBounds(worldBounds.leftBound, worldBounds.upperBound, worldBounds.rightBound, worldBounds.lowerBound);
    }


    function createEnds(levelData) {
        var dataEnds = levelData.ends;
        if (dataEnds == null) {
            return;
        }
        for (var i = 0 ; i < dataEnds.length ; i++) {
            var endData = dataEnds[i];
            var end = ends.create(endData.x, endData.y, 'diamond');
            end.body.bounce.y = 0;
            end.body.gravity.y = 1000;
        }
    }

    function createCoin(levelData) {
        var dataCoins = levelData.coins;
        if (dataCoins == null) {
            return;
        }
        for (var i = 0 ; i < dataCoins.length ; i++) {
            var coinData = dataCoins[i];
            var coin = coins.create(coinData.x, coinData.y, 'coin');
            coin.body.gravity.y = 0;
        }
    }


    function createStart(element) {
        player.initializePlayer(PhaserGame.game, element.x, element.y);
    }



    return {

        createLevel: function (str) {

            //  We're going to be using physics, so enable the Arcade Physics system
            PhaserGame.game.physics.startSystem(Phaser.Physics.ARCADE);

            // We parse the JSON file
            var levelData = PhaserGame.game.cache.getJSON(str);
            if (levelData == null) {
                return false;
            }

            createWorld(levelData);

            // Create the differents groups of objects
           
            ends = PhaserGame.game.add.physicsGroup();

            // Creation of the level's objects
            createObjects(levelData, this);


            // Creation of the player
            createStart(levelData.playerStart, PhaserGame.game);

            return true;
        },


    };

});
