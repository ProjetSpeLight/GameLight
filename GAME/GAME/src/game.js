/// <reference path="~/node_modules/phaser/build/Phaser.js" />
GameStates.Game = function (game) {
    var platforms;
    var player;
    var stars;
    var score = 0;
    var scoreText;
    var pushed;
};

GameStates.Game.prototype = {

    create: function () {
        score = 0;
        var game = this;
        pushed = false;

        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //  A simple background for our game
        game.add.sprite(0, 0, 'sky');


        var plateformData = [
            { "x": 400, "y": 400, "xScale": 1, "yScale": 1 },
            { "x": 50, "y": 250, "xScale": 1, "yScale": 1 },
            { "x": 0, "y": game.world.height - 64, "xScale": 2, "yScale": 2}
        ]

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = game.add.group();
        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;

        plateformData.forEach(function (element) {
            var ground = platforms.create(element.x, element.y, 'ground');
            ground.scale.setTo(element.xScale, element.yScale);
            ground.body.immovable = true;
        });




        // The player and its settings
        player = game.add.sprite(32, game.world.height - 150, 'dude');

        //  We need to enable physics on the player
        game.physics.arcade.enable(player);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.0;
        player.body.gravity.y = 1000;
        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        stars = game.add.group();

        stars.enableBody = true;

        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 12; i++) {
            //  Create a star inside of the 'stars' group
            var star = stars.create(i * 70, 0, 'star');

            //  Let gravity do its thing
            star.body.gravity.y = 300;

            //  This just gives each star a slightly random bounce value
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }

        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    },

    update: function () {
        this.physics.arcade.collide(player, platforms);
        this.physics.arcade.collide(stars, platforms);
        this.physics.arcade.overlap(player, stars, collectStar, null, this);

        var cursors = this.input.keyboard.createCursorKeys();

        //  Reset the players velocity (movement)
        if (player.body.velocity.x > 10 && !player.body.touching.down) {
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
        }

        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down && !pushed) {
            player.body.velocity.y = -600;
            pushed = true;
        }

        if (cursors.up.isUp) {
            pushed = false;
        }

        function collectStar(player, star) {

            // Removes the star from the screen
            star.kill();

            //  Add and update the score
            score += 10;
            scoreText.text = 'Score: ' + score;

        }
    },

    render: function () { },

};
