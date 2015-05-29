// Boot will take care of initializing a few settings,

// declare the object that will hold all game states
var GameStates = {
    //quite common to add game variables/constants in here
    orientated: false
};

GameStates.Boot = function (game) {  //declare the boot state
    
};

GameStates.Boot.prototype = {
    preload: function () {
        // load assets to be used later in the preloader e.g. for loading screen / splashscreen
        this.load.image('preloaderBar', 'assets/preloader-bar.png');
    },
    create: function () {
        // setup game environment
        // scale, input etc..
        
        if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
        }
        else
        {
            this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL; // Important
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            this.scale.setResizeCallback(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        }

        // call next state
        this.state.start('Preloader');
        
        
    },
    
    enterIncorrectOrientation: function () {

        GameStates.orientated = false;

        document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function () {

        GameStates.orientated = true;

        document.getElementById('orientation').style.display = 'none';

    }
};

