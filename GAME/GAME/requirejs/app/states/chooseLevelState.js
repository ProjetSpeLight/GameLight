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
            for (var i = 1 ; i < 6 ; i++) {
                var emptyButton = this.game.add.sprite(x, y, 'buttonEmpty');
                var text = this.game.add.text(x + 50, y + 15, "Level " + i, { font: "28px Arial", fill: "#ffffff", align: "center" });
                text.inputEnabled = true;
                text.numLevel = i;
                text.refGame = this;
                text.events.onInputDown.add(this.down, text);
                y += emptyButton.height + 20;
                if (y > this.game.world.height - emptyButton.height) {
                    y = 10;
                    x += emptyButton.width + 20;
                }
            }
        },

        down: function (text) {
            text.refGame.game.state.states['Game'].currentLevel = text.numLevel;
            text.refGame.state.start('Game', true, false);
        },



    };

    return ChooseLevelState;
});
