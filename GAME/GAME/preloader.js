// Preloader will load all of the assets like graphics and audio
GameStates.Preloader = function (game) {
    this.preloadBar = null;
}

GameStates.Preloader.prototype = {
    preload: function () {
        // common to add a loading bar sprite here...
        this.preloadBar = this.add.sprite(this.game.width / 2 - 100, this.game.height / 2, 'preloaderBar');
        this.load.setPreloadSprite(this.preloadBar);
        // load all game assets
        // images, spritesheets, atlases, audio etc..
        this.load.image('logo', 'assets/phaser2.png');
        this.load.image('play', 'assets/button_play.png');
        this.load.image('help', 'assets/button_help.png');
        this.load.image('tutorial', 'assets/button_tutorial.png');
    },

    create: function () {
        //call next state
        this.state.start('MainMenu');
    }
};