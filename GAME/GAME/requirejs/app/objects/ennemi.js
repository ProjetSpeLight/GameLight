/**
  * This module defines the sprite representing the ennemis
  *
  */

define(['phaser', 'app/phasergame', 'app/player', 'app/objects/coin', 'app/photon', 'app/touch', 'app/objects/platforms'], function (Phaser, PhaserGame, player, coinObject, photon, Touch, platforms) {



    function killEnnemi(photon, ennemi) {
        ennemi.kill();
        photon.kill();
        coinObject.score += 10;
    }

    function killPlayer(playerSprite, ennemi) {
        player.kill(coinObject);
    }

    return {

        /***** Attributes *****/

        // Object containing the physic group of ennemis
        group: null,


        /***** Methodes *****/

        /// @function createObjectsGroup
        /// Create the differents objects defines in the JSON file represented by this module
        /// @param {Array} Array of elements representing 
        createObjectGroup: function (data) {

            this.group = PhaserGame.game.add.physicsGroup();

            if (data == null)
                return;          
            for (var i = 0 ; i < data.length ; i++) {
                var ennemiData = data[i];
                var ennemi = this.group.create(ennemiData.x, ennemiData.y, ennemiData.skin);
                ennemi.frame = 1;

                var speed = ennemiData.speed;
                if (speed != null) {
                    if (speed.x == null)
                        speed.x = 0;
                    if (speed.y == null)
                        speed.y = 0;
                } else {
                    speed.x = 0;
                    speed.y = 0;
                }
                ennemi.body.velocity.x = speed.x;
                ennemi.body.velocity.y = speed.y;

                var bounds = ennemiData.bounds;
                if (bounds != null) {
                    if(bounds.left != null)
                        ennemi.body.sprite.leftBounds = ennemiData.bounds.left;
                    if(bounds.right !=null)
                        ennemi.body.sprite.rightBounds = ennemiData.bounds.right;
                    if (bounds.top != null)
                        ennemi.body.sprite.topBounds = ennemiData.bounds.top;
                    if (bounds.bottom != null)
                        ennemi.body.sprite.bottomBounds = ennemiData.bounds.bottom;
                }

                ennemi.body.collideWorldBounds = true;
                ennemi.body.bounce.y = 1;
                ennemi.body.bounce.x = 1;


            }
        },

        updateObject: function () {

            PhaserGame.game.physics.arcade.collide(this.group, this.group);
            PhaserGame.game.physics.arcade.collide(this.group, platforms.group);
            PhaserGame.game.physics.arcade.overlap(player.sprite, this.group, killPlayer, null, this);
            PhaserGame.game.physics.arcade.collide(photon.photons, this.group, killEnnemi, null, this);
            
            //Déplacement des ennemis
            this.group.forEach(function (element) {
                if (element.body.x >= element.body.sprite.rightBounds || element.body.x <= element.body.sprite.leftBounds)
                    element.body.velocity.x *= -1;

                if (element.body.y <= element.body.sprite.topBounds || element.body.y >= element.body.sprite.bottomBounds) 
                    element.body.velocity.y *= -1;

            })
            
        }


    }

});
