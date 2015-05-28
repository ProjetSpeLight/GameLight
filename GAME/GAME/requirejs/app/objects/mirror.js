define(['phaser', 'app/phasergame', 'app/player'], function (Phaser, PhaserGame, player) {

    function reflexionPhoton(photon, mirror) {
        var angle = 0.3;
        var x = photon.body.velocity.x;
        var y = photon.body.velocity.y;
        photon.body.velocity.x = Math.cos(angle) * x - y * Math.sin(angle);
        photon.body.velocity.y = Math.cos(angle) * y + x * Math.sin(angle);

    }

 

        return {
            group: null,

            createObjectsGroup: function (data) {
                this.group = PhaserGame.game.add.physicsGroup();

                if (data == null) {
                    return;
                }

                for (var i = 0 ; i < data.length ; i++) {
                    var mirrorData = data[i];
                    // We create a new mirror at the position (x,y) with the token "mirror" to represent the corresponding image loaded
                    var mirrorObject = this.group.create(mirrorData.x, mirrorData.y, 'mirror');
                    // Attribute rotation = angle
                    mirrorObject.rotation = mirrorData.angle;
                    mirrorObject.body.immovable = true;
                    

                }

            },

            updateObject : function() {
                PhaserGame.game.physics.arcade.overlap(player.refPhotons.photons, this.group, reflexionPhoton);
            }
        }

    });




