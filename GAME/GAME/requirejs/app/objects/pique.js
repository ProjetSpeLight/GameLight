define(['phaser', 'app/phasergame', 'app/player', 'app/objects/platforms', 'app/objects/ennemi'], function (Phaser, PhaserGame, player, platforms, ennemiObject) {


    // Function which allow the pique to kill the enemies
    function killEnnemiPique(pique, ennemi) {
        ennemi.kill();
    }

    function killPlayerPique(playerSprite, pique) {
        player.kill();
    }

    return {

        // Object containing the physic group of piques
        group: null,

        /// @function preloadObjectImage
        /// Preloads the different images / spritesheets used by this module
        preloadObjectsImages: function () {
            PhaserGame.game.load.image('pique', 'assets/pique.png');
        },


        /// @function createObjectsGroup
        /// Create the differents objects defines in the JSON file represented by this module
        /// @param {Array} Array of elements representing 
        createObjectsGroup: function (data, Manager) {
            // Allocation of the group
            this.group = PhaserGame.game.add.physicsGroup();
            // Intialization of the group in the manager
            Manager.EnumModule.PIQUE.refGroup = this.group;

            if (data == null)
                return;
            for (var i = 0 ; i < data.length ; i++) {
                var piqueData = data[i];
                var pique = this.group.create(piqueData.x, piqueData.y, piqueData.skin);
                for (var j = 1; j <= piqueData.size.x; j++) {
                    var pique = this.group.create(piqueData.x + j * pique.body.width, piqueData.y, piqueData.skin);
                    pique.id = piqueData.id
                }
                /* pique.hitArea = new Phaser.Polygon([new Phaser.Point(0, pique.body.height),
                                                     new Phaser.Point(pique.body.width, pique.body.height),
                                                     new Phaser.Point(pique.body.width / 2, 0)]);*/
                //pique.hitArea = new Phaser.Rectangle(0, 0, 200, 200);

                /*PhaserGame.game.physics.p2.enable(pique);
               pique.body.addPolygon({ optimalDecomp: false, skipSimpleCheck: true, removeCollinearPoints: false },
                   [new Phaser.Point(0, pique.body.height),
                    new Phaser.Point(pique.body.width, pique.body.height),
                    new Phaser.Point(pique.body.width / 2, 0)
                   ]);*/
            }

        },

        updateObjects: function () {
            PhaserGame.game.physics.arcade.collide(this.group, platforms.group);
            PhaserGame.game.physics.arcade.collide(this.group, ennemiObject.group, killEnnemiPique, null, this);
            PhaserGame.game.physics.arcade.overlap(player.sprite, this.group, killPlayerPique, null, this);

            /* PhaserGame.game.physics.p2.collide(this.group, platforms); 
             PhaserGame.game.physics.p2.collide(this.group, ennemiObject.group, killEnnemiPique, null, this);
             PhaserGame.game.physics.p2.overlap(player.sprite, this.group, killPlayerPique, null, this);*/
        }

    }

});
