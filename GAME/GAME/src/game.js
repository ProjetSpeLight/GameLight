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

        if (this.game.device.iOS) {
            addJoypad(game);
        }

        scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
        scoreText.fixedToCamera = true;
        button_pause = this.add.button(700, 20, 'pause', actionClick, this);

        initPhotons(this);

        button_pause.name = 'pause';
        button_pause.anchor.setTo(0.5, 0.5);
        button_pause.fixedToCamera = true;

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


        if (!this.paused) {
            this.physics.arcade.collide(player, platforms);
            this.physics.arcade.collide(player, movingPlatforms);
            this.physics.arcade.overlap(player, coins,
                                        collectCoin, null, this);
            this.physics.arcade.collide(player, colourPlatforms,
                                        makeColor, null, this);
            this.physics.arcade.collide(ends, platforms);
            this.physics.arcade.collide(ends, colourPlatforms);
            this.physics.arcade.collide(ends, movingPlatforms);
            this.physics.arcade.overlap(player, ends, finish, null, this);

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
            if (this.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
                update_pause(this);

            }


            //Déplacement des plateformes
            platforms.forEach(function (element) {
                if (element.body.x >= element.body.sprite.rightBounds) {
                    element.body.velocity.x *= -1;
                } else if (element.body.x <= element.body.sprite.leftBounds) {
                    element.body.velocity.x *= -1;
                }
                if (element.body.y <= element.body.sprite.topBounds) {
                    element.body.velocity.y *= -1;
                } else if (element.body.y >= element.body.sprite.bottomBounds) {
                    element.body.velocity.y *= -1;
                }
            })

            //Déplacement des plateformes
            colourPlatforms.forEach(function (element) {
                if (element.body.x >= element.body.sprite.rightBounds) {
                    element.body.velocity.x *= -1;
                } else if (element.body.x <= element.body.sprite.leftBounds) {
                    element.body.velocity.x *= -1;
                }
                if (element.body.y <= element.body.sprite.topBounds) {
                    element.body.velocity.y *= -1;
                } else if (element.body.y >= element.body.sprite.bottomBounds) {
                    element.body.velocity.y *= -1;
                }
            })


            function makeColor(player, colorplatform) {

                // Oblige le joueur à etre au dessus 
                //de la plateforme coloree pour changer de couleur
                if (player.body.touching.down) {

                    // Oblige le joueur à appuyer 
                    //sur la touche du bas pour changer de couleur
                    if (this.input.keyboard.
                        isDown(Phaser.Keyboard.DOWN)) {


                        switch (colorplatform.key) {
                            case 'groundGreen':
                                //ne met à jour que si c'est necessaire
                                if (player.color != ColorEnum.GREEN) {
                                    player.color = ColorEnum.GREEN;
                                    player.frame = player.color.value * 9 + 4;
                                }
                                break;
                            case 'groundRed':
                                if (player.color != ColorEnum.RED) {
                                    player.color = ColorEnum.RED;
                                    player.frame = player.color.value * 9 + 4;

                                }
                                break;
                            case 'groundBlue':
                                if (player.color != ColorEnum.BLUE) {
                                    player.color = ColorEnum.BLUE;
                                    player.frame = player.color.value * 9 + 4;
                                }
                                break;
                            default:
                        }

                        photons.destroy();
                        initPhotons(this);



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


            function finish(player, diamond) {

                this.state.start('FinishLevel');

            }

        }
    },

    render: function () { },

};
