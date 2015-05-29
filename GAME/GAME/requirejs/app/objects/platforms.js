/**
 * This module implements the functions that create and animate platforms
 */

define(['phaser', 'app/phasergame'], function (Phaser, PhaserGame) {


    /// @function createStillPlatforms
    /// Create and initialize all stillPlatforms (platforms with no movement)
    /// @param {Object} the JSON object used to store the current level's informations
    function createStillPlatforms(levelData) {
        var dataPlatforms = levelData.platforms;
        for (var i = 0 ; i < dataPlatforms.length ; i++) {
            var platformData = dataPlatforms[i];
            var platform = platforms.create(platformData.position.x, platformData.position.y, platformData.skin + platformData.color);
            platform.color = platformData.color;

            platform.scale.setTo(platformData.size.x, platformData.size.y);

            platform.body.allowGravity = false;
            platform.body.immovable = platformData.immovable;
            PhaserGame.game.physics.enable(platform, Phaser.Physics.ARCADE);

            platform.body.checkCollision.up = true;
            platform.body.checkCollision.left = false;
            platform.body.checkCollision.right = false;
            platform.body.checkCollision.down = false;

        }
    }

    /// @function createBackAndForthPlatforms
    /// Create and initialize all backAndForthPlatforms (platforms with a movement that repeats in the opposite direction when it's done) and make a list of all these platforms to make the update of those platform's movement easier
    /// @param {Object} the JSON object used to store the current level's informations
    function createBackAndForthPlatforms(levelData) {
        var dataPlatforms = levelData.backAndForthPlatforms;
        this.backAndForthPlatforms = new Array();
        if (dataPlatforms != null) {
            for (var i = 0 ; i < dataPlatforms.length ; i++) {
                var platformData = dataPlatforms[i];
                var platform = platforms.create(platformData.positions[0].x, platformData.positions[0].y, platformData.skin + platformData.color);
                this.backAndForthPlatforms.push(platform);
                platform.color = platformData.color;
                platform.positions = platformData.positions;
                platform.increment = 1;
                platform.current = 0;
                platform.scale.setTo(platformData.size.x, platformData.size.y);

                platform.body.allowGravity = false;
                platform.body.immovable = platformData.immovable;
                PhaserGame.game.physics.enable(platform, Phaser.Physics.ARCADE);

                platform.body.velocity.x = platformData.positions[0].speed.x;

                platform.body.velocity.y = platformData.positions[0].speed.y;
            }
        }
    }

    /// @function createLoopingPlatforms
    /// Create and initialize all loopingPlatforms (platforms with a movement that repeats) and make a list of all these platforms to make the update of those platform's movement easier
    /// @param {Object} the JSON object used to store the current level's informations
    function createLoopingPlatforms(levelData) {
        var dataPlatforms = levelData.loopingPlatforms;
        this.loopingPlatforms = new Array();
        if (dataPlatforms != null) {
            for (var i = 0 ; i < dataPlatforms.length ; i++) {
                var platformData = dataPlatforms[i];
                var platform = platforms.create(platformData.positions[0].x, platformData.positions[0].y, platformData.skin + platformData.color);
                this.loopingPlatforms.push(platform);
                platform.color = platformData.color;
                platform.positions = platformData.positions;

                platform.current = 0;
                platform.scale.setTo(platformData.size.x, platformData.size.y);

                platform.body.allowGravity = false;
                platform.body.immovable = platformData.immovable;
                PhaserGame.game.physics.enable(platform, Phaser.Physics.ARCADE);

                platform.body.velocity.x = platformData.positions[0].speed.x;

                platform.body.velocity.y = platformData.positions[0].speed.y;
            }
        }
    }

    /// @function isNear
    /// Create and initialize all loopingPlatforms (platforms with a movement that repeats) and make a list of all these platforms to make the update of those platform's movement easier
    /// @param {Object} the JSON object used to store the current level's informations
    function isNear(x, y, w, z, epsillon) {
        var d = (x - w) * (x - w) + (y - z) * (y - z);
        return (d <= epsillon);
    }


    function updateLoopingPlatforms() {
        this.loopingPlatforms.forEach(function (element) {
            var next = element.positions[(element.current + 1) % (element.positions.length)];
            if (isNear(element.body.x, element.body.y, next.x, next.y, 1)) {
                element.current = (element.current + 1) % (element.positions.length);
                element.body.velocity.x = element.positions[element.current].speed.x;
                element.body.velocity.y = element.positions[element.current].speed.y;


            }
        })

    }

    
    function updateBackAndForthPlatforms() {

        //Déplacement des plateformes
        this.backAndForthPlatforms.forEach(function (element) {

            var next = element.positions[(element.current + element.increment)];
            if (isNear(element.body.x, element.body.y, next.x, next.y, 1)) {

                if (element.increment == 1) {
                    element.current = element.current + element.increment;

                    element.body.velocity.x = element.positions[element.current].speed.x;
                    element.body.velocity.y = element.positions[element.current].speed.y;
                    if (element.current == element.positions.length - 1) {
                        element.increment = -1;
                        element.body.velocity.x = -element.positions[element.current - 1].speed.x;
                        element.body.velocity.y = -element.positions[element.current - 1].speed.y;
                    }
                } else {
                    element.current = element.current + element.increment;
                    if (element.current == 0) {
                        element.increment = 1;
                        element.body.velocity.x = element.positions[element.current].speed.x;
                        element.body.velocity.y = element.positions[element.current].speed.y;
                    } else {
                        element.body.velocity.x = -element.positions[element.current - 1].speed.x;
                        element.body.velocity.y = -element.positions[element.current - 1].speed.y;
                    }

                }

            }
        })

    }

    

    return {
        // Both of the array are used to store a certain number of platforms in order to optimize the updating of moving platforms
        backAndForthPlatforms: new Array(),
        loopingPlatforms: new Array(),

        // Create all the object of type platform
        createObjectGroup: function (levelData) {
            createStillPlatforms(levelData);
            createBackAndForthPlatforms(levelData);
            createLoopingPlatforms(levelData);
        },

        // Update the movement of moving platforms
        updateObject: function () {
            updateLoopingPlatforms();
            updateBackAndForthPlatforms();
        },



    }
});
