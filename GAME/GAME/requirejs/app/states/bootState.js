define([
    'phaser'
], function (
    Phaser
) { 
   // 'use strict';

    function BootState(game) {}
    
    BootState.prototype = {
        preload: function () {
            // load assets to be used later in the preloader e.g. for loading screen / splashscreen
            this.load.image('preloaderBar', 'assets/preloader-bar.png');
        },
        create: function () {
            // setup game environment
            // scale, input etc..
            alert('boot deb');
            if (this.game.device.iOS) {
                this.game.scale.forceOrientation(true, false);
                this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
                this.game.scale.refresh();
            }

            alert('boot end');

            // call next state
            this.state.start('Preload');
        }
    };
    
    return BootState;
});
