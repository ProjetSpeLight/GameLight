
define(['phaser', 'app/player', 'app/phasergame', 'app/objects/coin', 'app/objects/pique', 'app/objects/ennemi', 'app/objects/time', 'app/objects/objectsManager'], function (Phaser, player, PhaserGame, coinObject, piqueObject, ennemiObject, time, Manager) {

    function createObjects(levelData, createLevel) {
        // Creation of the objects handled by the manager
        Manager.createObjects(levelData);

        time.createTime(levelData.time);


        // Creation of texts
        var dataText = levelData.texts;

        if (dataText != null) {
            var style = { font: "24px Arial", fill: "#000000", align: "center" };
            for (var i = 0 ; i < dataText.length ; i++) {
                var textData = dataText[i];
                var text = PhaserGame.game.add.text(textData.x, textData.y, textData.message, style);
                //text.anchor.set(0);

            }
        }

    }

    function createWorld(levelData) {
        //  Creation of the background
        var background = PhaserGame.game.add.sprite(0, 0, levelData.background);
        background.fixedToCamera = true;

        // Creation of the "frame" of the level
        var worldBounds = levelData.worldBounds;
        PhaserGame.game.world.setBounds(worldBounds.leftBound, worldBounds.upperBound, worldBounds.rightBound, worldBounds.lowerBound);
    }





    function createStart(element) {
        player.initializePlayer(PhaserGame.game, element.x, element.y);
    }



    return {

        createLevel: function (str) {

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
