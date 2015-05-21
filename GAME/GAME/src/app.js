/// <reference path="~/node_modules/phaser/build/Phaser.js" />
window.onload = function () {

    var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

    //  Add the States your game has.
    game.state.add('Boot', GameStates.Boot);
    game.state.add('Preloader', GameStates.Preloader);
    game.state.add('MainMenu', GameStates.MainMenu);
    game.state.add('Game', GameStates.Game);

    //Variables globales
    var platforms;
    var player;
    var stars;
    var score = 0;
    var pushed;
    var movingPlatforms;

    //  Now start the Boot state.
    game.state.start('Boot');
 

   

    

};
