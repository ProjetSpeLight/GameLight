GameStates.MainMenu = function (game) {

};

GameStates.MainMenu.prototype = {
        create: function () {
                // create main menu text and images -
                // create a "Start Game" mechanism - variety of ways to do this...

                //below code creates a simple tween animation. You will want to delete this when adding your code
                var logo = this.add.sprite(this.world.centerX, this.world.centerY, 'logo');
                logo.anchor.setTo(0.5, 0.5);
                logo.scale.setTo(0.2, 0.2);
                this.add.tween(logo.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);

                this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

                this.enterKey.onDown.add(this.playGame, this);
        },
        playGame: function () {
                this.state.start('Game');
        }
};
