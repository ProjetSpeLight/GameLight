define(['phaser', 'app/phasergame', 'app/player'], function (Phaser, PhaserGame, player) {

    function reflexionPhoton(photon, mirror) {
        var angle = 0.3;
        var x = photon.body.velocity.x;
        var y = photon.body.velocity.y;
        photon.body.velocity.x = Math.cos(angle) * x - y * Math.sin(angle);
        photon.body.velocity.y = Math.cos(angle) * y + x * Math.sin(angle);

    }

    function updateObject() {
        PhaserGame.game.physics.arcade.overlap(player.refPhotons.photons, ends, reflexionPhoton);
    }

    return {
        group : null,
        updateObject : updateObject
    }

});




