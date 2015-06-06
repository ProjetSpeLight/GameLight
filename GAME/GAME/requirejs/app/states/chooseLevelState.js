define([
    'phaser'
], function (
    Phaser
) {
    function ChooseLevelState(game) { };

    ChooseLevelState.prototype = {
        create: function () {
            // We generate a text and a button (sprite) per level
            var x = 10;
            var y = 10;
            // We read the cookies of the game
            var cook = document.cookie ;
            for (var i = 1 ; i <= this.game.nbLevel ; i++) {
                var emptyButton = this.game.add.button(x, y, 'buttonEmpty', this.down, self);
                emptyButton.scale.setTo(0.8, 0.8);

                var posLabelButtonX = x + 30;
                var posLabelButtonY = y + 9;
                var posLabelScoreX = x + 160;
                var posLabelScoreY = y+7;

                var text = this.game.add.text(posLabelButtonX, posLabelButtonY, "Level " + i, { font: "28px Arial", fill: "#ffffff", align: "center" });
                var textResult = this.game.add.text(posLabelScoreX, posLabelScoreY, " Score Done :\nNot Finish", { font: "18px Arial", fill: "#ffffff", align: "center" });
                
                // We search the label 'Level i'
                var sub = cook.lastIndexOf("Level"+i,1);
                //if this label exists,
                //we change the text to print the score
                if (sub>=0){
                    textResult.text=" Score Done : "+cook.substring(sub+7,sub+9);    
                }
                
                emptyButton.numLevel = i;
                emptyButton.refGame = this;
                y += emptyButton.height + 20;
                if (y > this.game.world.height - emptyButton.height) {
                    y = 10;
                    x += posLabelScoreX + textResult.width + 40;
                }
            }

            var buttonMenu = this.game.add.button(this.game.world.width - 10, this.game.world.height - 10, 'RetMenu', this.returnMenu, this);
            buttonMenu.scale.setTo(0.8, 0.8);
            buttonMenu.anchor.setTo(1, 1);
        },

        down: function (button) {
            button.refGame.game.state.states['Game'].currentLevel = button.numLevel;
            button.refGame.state.start('Game');
        },

        returnMenu: function () {
            this.game.state.start('MainMenu');
        },
        
        




    };

    return ChooseLevelState;
});
