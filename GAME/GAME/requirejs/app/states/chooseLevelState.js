define([
    'phaser',
    'app/cook'
], function (
    Phaser,
     cook
) {
    function ChooseLevelState(game) { };

    ChooseLevelState.prototype = {
        create: function () {
            // We generate a text and a button (sprite) per level
            var x = 10;
            var y = 10;
            
            for (var i = 1 ; i <= this.game.nbLevel ; i++) {
                var emptyButton = this.game.add.button(x, y, 'buttonEmpty', this.down, self);
                var text = this.game.add.text(x + 50, y + 15, "Level " + i, { font: "28px Arial", fill: "#ffffff", align: "center" });
                var textResult= this.game.add.text(x + 200, y+15, " Score Done :\nNot Finish" ,  { font: "18px Arial", fill: "#ffffff", align: "center" });
                
                // we check if a cookie contains the score for the level i
                var nb = cook.readCookie("Level"+i);
                if (nb!=null){ // if there is already a score, we print it
                    textResult.text=" Score Done : "+nb;    
                }
                
                emptyButton.numLevel = i;
                emptyButton.refGame = this;
                y += emptyButton.height + 20;
                if (y > this.game.world.height - emptyButton.height) {
                    y = 10;
                    x += emptyButton.width + 20;
                }
            }

            var buttonMenu = this.game.add.button(this.game.world.width - 10, this.game.world.height - 10, 'RetMenu', this.returnMenu, this);
            buttonMenu.anchor.setTo(1, 1);
        },

        down: function (button) {
            button.refGame.game.state.states['Game'].currentLevel = button.numLevel;
            button.refGame.state.start('Game');
        },

        returnMenu: function () {
            this.game.state.start('MainMenu');
        }
        
        



    };

    return ChooseLevelState;
});
