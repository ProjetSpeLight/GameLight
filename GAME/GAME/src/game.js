/// <reference path="~/node_modules/phaser/build/Phaser.js" />
GameStates.Game = function (game) {
    var scoreText;
};

GameStates.Game.prototype = {

    create: function () {
        score = 0;
        var game = this;
        pushed = false;
        createLevel(game);
       scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
        scoreText.fixedToCamera = true;
        
       button_pause = this.add.button(700, 20, 'pause', actionClick, this);
        button_play.name = 'pause';
        button_play.anchor.setTo(0.5, 0.5);
        
        function actionClick() {
            
            update_pause(this);
        }

    },

    update: function () {
        if(!this.paused){
        this.physics.arcade.collide(player, platforms);
        this.physics.arcade.collide(stars, platforms);
        this.physics.arcade.overlap(player, stars, collectStar, null, this);

        var cursors = this.input.keyboard.createCursorKeys();
        
        //  Reset the players velocity (movement)
        /*if (player.body.velocity.x > 10 && !player.body.touching.down) {
            player.body.velocity.x -= 5;
        } else if (player.body.velocity.x < -10 && !player.body.touching.down) {
            player.body.velocity.x += 5;
        } else {
            player.body.velocity.x = 0;
        }

        if (cursors.left.isDown) {
            //  Move to the left
            player.body.velocity.x = -300;

            player.animations.play('left');
        }
        else if (cursors.right.isDown) {
            //  Move to the right
            player.body.velocity.x = 300;

            player.animations.play('right');
        }
        else {
            //  Stand still
            if (player.body.velocity.x == 0) {
                player.animations.stop();
                player.frame = 4;
            }
        }*/

        updatePositionPlayer(player, cursors);

        // TEMP : Change of colour (by space key)
        var keyboard = this.input.keyboard;
        updateColorPlayer(player, keyboard);

        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down && !pushed) {
            player.body.velocity.y = -600;
            pushed = true;
        }

        if (cursors.up.isUp) {
            pushed = false;
        }
        
        // We restart the game when "R" is pushed
        if (this.input.keyboard.isDown(Phaser.Keyboard.R)){
            this.create();
        }

        function collectStar(player, star) {

            // Removes the star from the screen
            star.kill();

            //  Add and update the score
            score += 10;
            scoreText.text = 'Score: ' + score;

        }
    }
    },

    render: function () { },

};
