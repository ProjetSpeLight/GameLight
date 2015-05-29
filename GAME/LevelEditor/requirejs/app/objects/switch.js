define(['phaser', 'app/phasergame', 'app/player'], function (Phaser, PhaserGame, player) {

    function handlerSwitch(photon, switchObject) {
        if (photon.color.name == switchObject.colorName) {
            alert('interrupteur on');
        }

        photon.kill();
    }

    return {
        group: null,

        preloadObjectImage: function () {
            //PhaserGame.game.load.image('switch', 'assets/switch.png');
        },

        createObjectsGroup: function (data) {
            this.group = PhaserGame.game.add.physicsGroup();

            if (data == null) {
                return;
            }

            for (var i = 0 ; i < data.length ; i++) {
                var switchData = data[i];
                // We create a new switch at the position (x,y) with the token "switchData.skin + switchData.color" to represent the corresponding image loaded
                //var switchObject = this.group.create(switchData.position.x, switchData.position.y, switchData.skin + switchData.color);
                var switchObject = this.group.create(switchData.x, switchData.y, 'switch');
                // Attribute color
                switchObject.colorName = switchData.color;
                switchObject.body.immovable = true;
                switchObject.rotation = 90;
            }

        },

        updateObject: function () {
            PhaserGame.game.physics.arcade.collide(player.refPhotons.photons, this.group, handlerSwitch);
        }
    }

});




