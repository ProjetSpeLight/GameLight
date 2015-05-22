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
        
        if(this.game.device.iOS){                    
            addJoypad(game);
        }

       scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
        scoreText.fixedToCamera = true;
        button_pause = this.add.button(700, 20, 'pause', actionClick, this);

        initPhotons(this);

        button_pause.name = 'pause';
        button_pause.anchor.setTo(0.5, 0.5);
        button_pause.fixedToCamera=true;
        
        function actionClick() {
            update_pause(this);
        }
        
         //player.body.onBeginContact.add(groundHit,this);
        function groundHit(body, shapeA, shapeB, equation) {
           
            switch (body.sprite.key) {
                case 'groundYellow':
                   
                    break;
                case 'groundGreen':
                    player.color = ColorEnum.GREEN;
                    player.frame = player.color.value * 9 + 4;
                    break;
                case 'groundRed':
                    player.color = ColorEnum.RED;
                    player.frame = player.color.value * 9 + 4;  
                    break;
                case 'groundBlue':
                    player.color = ColorEnum.BLUE;
                    player.frame = player.color.value * 9 + 4;
                    break;
                default:
            }
        }

    },

    update: function () {

        
        if(!this.paused){
            this.physics.arcade.collide(player, platforms);
            this.physics.arcade.collide(player, movingPlatforms);
            this.physics.arcade.collide(coins, platforms);
            this.physics.arcade.collide(coins, movingPlatforms);
            this.physics.arcade.overlap(player, coins, collectCoin, null, this);
                
            this.physics.arcade.collide(player,ColourPlatforms,makeColor,null,this);

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
        updateColorPlayer(player, keyboard, this);

        
            
            
            //check collision platform and player
            
                
            

        
        // We restart the game when "R" is pushed
        if (this.input.keyboard.isDown(Phaser.Keyboard.R) || player.body.y > this.world.height - 64) {
            this.state.start('Game');
        }
            
            // we stop the game when "ESC" is pushed 
            if (this.input.keyboard.isDown(Phaser.Keyboard.ESC)){
            update_pause(this);
               
            }

        //Déplacement des plateformes
        movingPlatforms.forEach(function (element) {
            if (element.body.x >= element.body.sprite.rightBounds) {
                element.body.velocity.x *= -1;
            } else if (element.body.x <= element.body.sprite.leftBounds) {
                element.body.velocity.x *= -1;
            }
        })

        function makeColor(player, colorplatform) {
            if(player.body.touching.down ){
            //gerer les bonnes couleur et pas que le vert
            
            
            
            switch (colorplatform.key) {
            case 'groundGreen':
                 player.color = ColorEnum.GREEN;
            player.frame = player.color.value * 9 + 4;
                break;
            case 'groundRed':
                player.color = ColorEnum.RED;
            player.frame = player.color.value * 9 + 4;
                break;
            case 'groundBlue':
                player.color = ColorEnum.BLUE;
            player.frame = player.color.value * 9 + 4;
                break;
            default:
        }
            }

        }
        
        function collectCoin(player, coin) {

            // Removes the star from the screen
            coin.kill();

            //  Add and update the score
            score += 10;
            scoreText.text = 'Score: ' + score;

        }
        
    }
    },

    render: function () { },

};
