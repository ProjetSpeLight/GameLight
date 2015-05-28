define(['phaser', 'app/phasergame', 'app/player'], function (Phaser, PhaserGame, player) {

    function reflexionPhoton(photon, mirror) {
        var angle = 0.3;
        photon.body.velocity.y = 200;
    }

    function updateObject() {
        PhaserGame.game.physics.arcade.overlap(player.refPhotons.photons, ends, reflexionPhoton);
    }

    return {
        group : null,
        updateObject : updateObject
    }

});




