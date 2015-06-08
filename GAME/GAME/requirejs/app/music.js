define(['app/phasergame'], function (PhaserGame) {

    return {
        preload: function () {
            PhaserGame.game.load.audio('musicTheme', 'assets/audio/shellyshelly.ogg');
        },

        create: function () {
            var music = PhaserGame.game.add.audio('musicTheme', 1, true);
            music.play();
        }
    }

});






