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

       /* this.load.image('groundYellow', 'assets/platform_Jaune.png');
        this.load.image('groundRed', 'assets/platform_Rouge.png');
        this.load.image('groundBlue', 'assets/platform_Bleu.png');
        this.load.image('groundGreen', 'assets/platform_Vert.png');*/
        
        this.load.image('coin', 'assets/star.png');

        this.load.image('logo', 'assets/phaser2.png');
        preload_pause(this);

        this.load.image('play', 'assets/button_play.png');
        this.load.image('help', 'assets/button_help.png');
        this.load.image('tutorial', 'assets/button_tutorial.png');


        this.load.spritesheet('dude', 'assets/colordude.png', 32, 48);

    },

    create: function () {
        //call next state
        this.state.start('MainMenu');
    }
};
