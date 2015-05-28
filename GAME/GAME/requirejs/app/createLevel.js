
define(['phaser', 'app/player', 'app/phasergame', 'app/objects/switch', 'app/objects/platforms'], function (Phaser, player, PhaserGame, switchObject, platformsObject) {




    function createObjects(levelData, createLevel) {

        // Creation of the fixed platforms
        platformsObject.create(levelData);

        // Creation of the coins
        createCoin(levelData);

        // Creation of the ennemies
        createEnnemis(levelData);
        //Creation of the pique
        createPiques(levelData);

        // Creation of the ends
        createEnds(levelData);

        switchObject.createObjectsGroup(levelData.switch);
    }

    function createWorld(levelData) {
        //  Creation of the background
        var background = PhaserGame.game.add.sprite(levelData.background.position.x, levelData.background.position.y, levelData.background.skin);
        background.fixedToCamera = true;


        // Creation of the "frame" of the level
        var worldBounds = levelData.worldBounds;
        PhaserGame.game.world.setBounds(worldBounds.leftBound, worldBounds.upperBound, worldBounds.rightBound, worldBounds.lowerBound);
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


    function createStart(element) {
        player.initializePlayer(PhaserGame.game, element.x, element.y);
    }

    function isNear(x, y, w, z, epsillon) {
        var d = (x - w) * (x - w) + (y - z) * (y - z);
        return (d <= epsillon);
    }


    function createEnnemis(levelData) {
        var dataEnnemis = levelData.ennemis;
        for (var i = 0 ; i < dataEnnemis.length ; i++) {
            var ennemiData = dataEnnemis[i];
            var ennemi = ennemis.create(ennemiData.x, ennemiData.y, 'baddie');
            ennemi.frame = 1;
            if (ennemiData.speed.x != 0) {
                ennemi.body.sprite.leftBounds = ennemiData.bounds.left;
                ennemi.body.sprite.rightBounds = ennemiData.bounds.right;
                ennemi.body.velocity.x = ennemiData.speed.x;
            }
            //pas sur non plus de ces 3 la
            //platform.body.immovable = platformData.immovable;
            //ennemi.body.immovable = ennemiData.immovable;
            ennemi.body.bounce.y = 0;
            ennemi.body.gravity.y = 1000;
        }


    }

    function createPiques(levelData) {
        var dataPiques = levelData.piques;
        if (dataPiques != null) {
            for (var i = 0 ; i < dataPiques.length ; i++) {
                var piqueData = dataPiques[i];
                var pique = piques.create(piqueData.x, piqueData.y, 'pique');
                pique.body.gravity.y = 1000;
            }
        }
    }








    return {

        createLevel: function (str) {



            //var game = this;
            //  We're going to be using physics, so enable the Arcade Physics system
            PhaserGame.game.physics.startSystem(Phaser.Physics.ARCADE);

            // We parse the JSON file
            var levelData = PhaserGame.game.cache.getJSON(str);
            if (levelData == null) {
                return false;
            }


            createWorld(levelData);

            // Create the differents groups of objects
            platforms = PhaserGame.game.add.physicsGroup();
            ends = PhaserGame.game.add.group();
            coins = PhaserGame.game.add.group();
            ennemis = PhaserGame.game.add.physicsGroup();
            piques = PhaserGame.game.add.physicsGroup();


            //  We will enable physics for any object that is created in those group
            platforms.enableBody = true;
            coins.enableBody = true;
            ends.enableBody = true;
            ennemis.enableBody = true;

            // Creation of the level's objects
            createObjects(levelData, this);


            // Creation of the player
            createStart(levelData.playerStart, PhaserGame.game);

            return true;
        },

        updatePlatforms: function () {
            //Deplacement des plateformes
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

        updateLoopingPlatforms: function () {
            //Déplacement des plateformes
            if (this.loopingPlatforms != null) {
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
        },

        updateBackAndForthPlatforms: function () {
            //Déplacement des plateformes
            if (this.backAndForthPlatforms != null) {
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

        }


    };

});
