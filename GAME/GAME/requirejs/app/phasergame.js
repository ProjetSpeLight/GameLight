define([
    'phaser'
], function (
    Phaser
) {
    //'use strict';

    return {
        game: null,
        start: function () {            
                this.game = new Phaser.Game(800, 600, Phaser.AUTO, '');

                //if(game.device.iOS){
                //game.scale.startFullScreen();
                //}


                

        }
    }

    /*function Game() { }

    Game.prototype = {
        start: function () {
            game = new Phaser.Game(800, 600, Phaser.AUTO, '');

            //if(game.device.iOS){
            //game.scale.startFullScreen();
            //}


            game.state.add('Boot', BootState);
            game.state.add('Preload', PreloadState);
            game.state.add('MainMenu', MainMenuState);
            game.state.add('Game', GameState);
            game.state.add('FinishLevel', FinishLevelState);

            /*
             var platforms;
        var player;
        var coins;
        var score = 0;
        var pushed;
        var movingPlatforms;
        var levelData;
            game.state.start('Boot');
        }
    };

    return Game;*/
});
