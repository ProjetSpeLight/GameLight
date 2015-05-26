define([
    'phaser'
], function (
    Phaser
) { 
    //'use strict';

    function ChooseLevelState(game) {
        
    };
    
    ChooseLevelState.prototype = {
        create: function () {
            // create main menu text and images -
            // create a "Start Game" mechanism - variety of ways to do this...
            button_play = this.add.button(400, 200, 'play1', this.playLevel, this);
            button_play.name = 'play1';
            button_play.anchor.setTo(0.5, 0.5);
            
        },

        playLevel: function () {
            this.state.start('Game',true,false);
        }

    };
       
    return ChooseLevelState;
});