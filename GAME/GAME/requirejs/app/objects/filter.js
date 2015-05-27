define(['phaser', 'app/phasergame', 'app/player'], function (Phaser, PhaserGame, player) {

    function applyFilter(sprite, filter) {
        var color = 'Red';
        player.filterColor(color);
    }

    function updateObject() {
        PhaserGame.game.physics.arcade.overlap(player.sprite, ends, applyFilter);
    }

    return {
        group : null,
        updateObject : updateObject
    }

});




