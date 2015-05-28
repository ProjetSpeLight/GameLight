define(['phaser', 'app/phasergame'], function (Phaser, PhaserGame) {


    function updateLoopingPlatforms() {
        //Déplacement des plateformes
        this.loopingPlatforms.forEach(function (element) {
            //alert(element.body.x + " == " + element.positions[(element.current + 1) % (element.positions.length)].x + " = " + (element.body.x == element.positions[(element.current + 1) % (element.positions.length)].x));
            var next = element.positions[(element.current + 1) % (element.positions.length)];
            if (isNear(element.body.x, element.body.y, next.x, next.y, 2)) {
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
            if (isNear(element.body.x, element.body.y, next.x, next.y, 2)) {

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


    function createLoopingPlatform(levelData) {
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

    function createBackAndForthPlatform(levelData) {
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

        }
    }

    function isNear(x, y, w, z, epsillon) {
        var d = (x - w) * (x - w) + (y - z) * (y - z);
        return (d <= epsillon);
    }


    return {
        backAndForthPlatforms: new Array(),
        loopingPlatforms: new Array(),


        create: function (levelData) {
            createStillPlatforms(levelData);
            createBackAndForthPlatform(levelData);
            createLoopingPlatform(levelData);
        },

        update: function () {
            updateLoopingPlatforms();
            updateBackAndForthPlatforms();
        },

        /*
        updatePlatforms: function () {
            //Déplacement des plateformes
            platforms.forEach(function (element) {
                if (element.body.x >= element.body.sprite.rightBounds) {
                    element.body.velocity.x *= -1;
                } else if (element.body.x <= element.body.sprite.leftBounds) {
                    element.body.velocity.x *= -1;
                }
                if (element.body.y <= element.body.sprite.topBounds) {
                    element.body.velocity.y *= -1;
                } else if (element.body.y >= element.body.sprite.bottomBounds) {
                    element.body.velocity.y *= -1;
                }
            })


            this.updateLoopingPlatforms();
            this.updateBackAndForthPlatforms();
        },
*/

    }
});
