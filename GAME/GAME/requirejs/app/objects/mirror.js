define(['phaser', 'app/phasergame', 'app/player'], function (Phaser, PhaserGame, player) {

    /// @function reflexionPhoton
    /// Handler called when a photon hits a mirror - Change the direction of the photon according to its reflexion on the mirror
    /// @param {Photon} the photon which hits the mirror
    /// @param {Phaser.Sprite} the mirror which has been hit
    function reflexionPhoton(photon, mirror) {
        if (photon.hasHit) {
            return;
        }
        //var angle = 45 - (mirror.angle ) / 2;
        var x = photon.body.velocity.x;
        var y = photon.body.velocity.y;
        var theta = (90.0 - mirror.angle) * Math.PI / 180.0;
        var alpha = Math.acos((x * Math.cos(theta) + y * Math.sin(theta))/(Math.sqrt(x*x+y*y)));
        var newX = Math.cos(2 * alpha) * x - Math.sin(2 * alpha) * y;
        var newY = Math.sin(2 * alpha) * x + Math.cos(2 * alpha) * y;
        photon.body.velocity.x = newX;
        photon.body.velocity.y = - newY;
        /*photon.body.velocity.x = (Math.cos(angle * Math.PI / 180) * x - y * Math.sin(angle * Math.PI / 180));
        photon.body.velocity.y = -(Math.cos(angle * Math.PI / 180) * y + x * Math.sin(angle * Math.PI / 180));*/
        //photon.body.velocity.x = 0;
        //photon.body.velocity.y = -400;
        photon.hasHit = true;
    }

    return {
        // The group of sprites
        group: null,

        /// @function createObjectsGroup
        /// Creation of the differents mirrors defined in the JSON file
        /// @param {Array} Array of the different mirrors defined in the JSON file. Can be null if no mirrors are used in the current level
        createObjectsGroup: function (data) {
            // Allocation of the group
            this.group = PhaserGame.game.add.physicsGroup();
            // If no mirrors are defined in the current level, there is nothing to do
            if (data == null) {
                return;
            }
            // For each mirror defined
            for (var i = 0 ; i < data.length ; i++) {
                // We get its data
                var mirrorData = data[i];
                // We create a new mirror at the position (x,y) with the token "mirror" to represent the corresponding image loaded
                var mirrorObject = this.group.create(mirrorData.x, mirrorData.y, mirrorData.skin);
                //mirrorObject.pivot = new Phaser.Point(mirrorObject.width / 2, mirrorObject.height / 2);
                mirrorObject.anchor.setTo(0.5, 0.5);
                // Attribute rotation = angle
                mirrorObject.angle = mirrorData.angle;
                // A mirror is by default immovable
                mirrorObject.body.immovable = true;
            }
        },

        /// @function updateObject
        /// Updates the group of mirrors (to be called by the update() function of the game state)
        updateObject: function () {
            PhaserGame.game.physics.arcade.overlap(player.refPhotons.photons, this.group, reflexionPhoton);
        }
    }
});




