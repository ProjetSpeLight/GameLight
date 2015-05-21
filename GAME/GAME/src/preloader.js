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
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('logo', 'assets/phaser2.png');

        this.load.image('play', 'assets/button_play.png');
        this.load.image('help', 'assets/button_help.png');
        this.load.image('tutorial', 'assets/button_tutorial.png');

        this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    },

    create: function () {
        //call next state
        this.state.start('MainMenu');
    }
};