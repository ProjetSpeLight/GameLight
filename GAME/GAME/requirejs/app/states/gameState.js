
define(['phaser', 'app/createLevel', 'app/player', 'app/pause', 'app/photon' , 'app/phasergame', 'app/touch', 'app/objects/mirror', 'app/objects/filter', 'app/objects/switch','app/objects/platforms','app/objects/coin','app/objects/pique'], function (Phaser, createLevel, player, pause, photon, PhaserGame, Touch,mirror,filter,switchObject,platformsObject,coinObject,piqueObject) {




    function GameState(game) {
        score = 0;
        paused = false;
        time = 0;
        compt=0;
    }

    var stopped = false;

    GameState.prototype = {
        create: function () {
            stopped = false;
            PhaserGame.game.physics.startSystem(Phaser.Physics.ARCADE);
            if (!createLevel.createLevel('level' + this.currentLevel)) {
                alert('niveau indisponible');
                stopped = true;
                return;
            }


            if (!this.game.device.desktop) {
                Touch.initJoypad();
                Touch.startMobile();
            }

            scoreText = PhaserGame.game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
            scoreText.fixedToCamera = true;
            
            timeText = PhaserGame.game.add.text(150, 16, 'Time: 0', { fontSize: '32px', fill: '#000' });
            timeText.fixedToCamera = true;
            var button_pause = PhaserGame.game.add.sprite(750, 20, 'pause');
            button_pause.inputEnabled = true;
             button_pause.name = 'pause';
            button_pause.anchor.setTo(0.5, 0.5);
            button_pause.fixedToCamera = true;

            
          
            
            
            PhaserGame.game.input.onDown.add(unpause,self);
            function unpause(event){
                if(PhaserGame.game.paused) {
                        //if(event.x > 300 && event.x <500 ){
                            if(event.y > 180 && event.y <240 ){

                                PhaserGame.game.physics.arcade.isPaused = false;
                                pause.is_paused = false;
                                PhaserGame.game.paused = false;
                                coinObject.score = 0;
                                time = 0;
                                PhaserGame.game.state.start('MainMenu');
                                
                            } else if (event.y > 270 && event.y <340) {
                                PhaserGame.game.physics.arcade.isPaused = false;
                                pause.is_paused = false;
                                PhaserGame.game.paused = false;
                                pause.destruction();
                                coinObject.score = 0;
                                time = 0;
                                PhaserGame.game.state.start('RestartGame');
                            } else if (event.y > 370 && event.y <440) {
                                PhaserGame.game.physics.arcade.isPaused = false;
                                pause.is_paused = false;
                                PhaserGame.game.paused = false;
                                
                                pause.destruction();
                            }
                      
                }
            }

            function actionClick() {
                pause.update_pause();
                
            }
        },   

        update: function () {
            compt++;
            scoreText.text = 'Score: ' + coinObject.score;
            if (compt==60){
                time ++;
                compt=0;
                timeText.text = 'Time: ' + time;
                
            }
            if (stopped) {
                if (!this.game.device.desktop) {
                    Touch.stopMobile();
                }
                PhaserGame.game.state.start('MainMenu');
                return;
            }


            if (!pause.is_paused) {


                PhaserGame.game.physics.arcade.collide(ennemis, platforms);
                PhaserGame.game.physics.arcade.collide(player.sprite, platforms, makeColor, null, this);
                PhaserGame.game.physics.arcade.collide(ends, platforms);

                //PhaserGame.game.physics.arcade.collide(ends, colourPlatforms);
                //PhaserGame.game.physics.arcade.collide(ends, movingPlatforms);
               
            

                //PhaserGame.game.physics.arcade.collide(player.sprite, ennemis, killPlayer, null, this);
                PhaserGame.game.physics.arcade.collide(photon.photons,ennemis,killEnnemi,null,this);
                PhaserGame.game.physics.arcade.overlap(player.sprite, ends, finish, null, this);

                PhaserGame.game.physics.arcade.overlap(player.sprite, ennemis, killPlayer, null, this);

                /*function photonRedirection(photon, ends) {
                    photon.body.velocity.y = 200;
                }*/

                
                mirror.updateObject();
                filter.updateObject();
                switchObject.updateObject();
                platformsObject.updateObject();
                coinObject.updateObject();
                piqueObject.updateObject();
                
                
                var cursors = PhaserGame.game.input.keyboard.createCursorKeys();
                player.updatePositionPlayer(cursors);              

                
                // We restart the game when "R" is pushed
                if (PhaserGame.game.input.keyboard.isDown(Phaser.Keyboard.R)) {
                    coinObject.score = 0;
                    time = 0;
                    if (!this.game.device.desktop) {
                        Touch.stopMobile();
                    }   
                    PhaserGame.game.state.start('RestartGame');
                }

                // We restart the game when the character falls of the map
                if (player.sprite.body.y > PhaserGame.game.world.height - 64) {
                    coinObject.score = 0;
                    time= 0;
                    if (!this.game.device.desktop) {
                        Touch.stopMobile();
                    }
                    PhaserGame.game.state.start('RestartGame');
                }
                
                // Mort du personnage quand coincé entre deux plateformes
                if ((player.sprite.body.touching.down && player.sprite.body.touching.up) || (player.sprite.body.touching.right && player.sprite.body.touching.left)) {
                    coinObject.score = 0;
                    time =0;
                    if (!this.game.device.desktop) {
                        Touch.stopMobile();
                    }
                    PhaserGame.game.state.start('RestartGame');
                }


                
                
                // we stop the game when "ESC" is pushed 
                if (PhaserGame.game.input.keyboard.isDown(Phaser.Keyboard.ESC) ) {
                    if (!pause.is_paused){
                    pause.gamepaused();
                    } else {
                        PhaserGame.game.physics.arcade.isPaused = false;
                                pause.is_paused = false;
                                PhaserGame.game.paused = false;
                                
                                pause.destruction();
                    }
                    
                }
                
              
                
                
                //Déplacement des ennemis
                 ennemis.forEach(function (element) {
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
                
                
                
                if (PhaserGame.game.input.activePointer.isDown && 
                    PhaserGame.game.input.y<34 &&
                    PhaserGame.game.input.y>5  &&
                    (PhaserGame.game.input.x >(PhaserGame.game.camera.width-86)) &&
                    (PhaserGame.game.input.x <(PhaserGame.game.camera.width-12)) )
                {
                    
                    pause.gamepaused();
                }


                function makeColor(sprite, colorplatform) {


                    // Oblige le joueur à etre au dessus 
                    //de la plateforme coloree pour changer de couleur
                    if (sprite.body.touching.down) {

                        // Oblige le joueur à appuyer 
                        //sur la touche du bas pour changer de couleur
                        if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN) || player.changeColor) {
                            player.changePlayerColor(colorplatform.color);
                        }

                    }
                }


                function finish(player, diamond) {
                    if (!this.game.device.desktop) {
                        Touch.stopMobile();
                    }
                    PhaserGame.game.state.start('FinishLevel');
                }
                
                

                    
                function killPlayer(player, ennemi) {    
                    if (!this.game.device.desktop) {
                        Touch.stopMobile();
                    }
                    coinObject.score = 0;
                   time = 0;
                    PhaserGame.game.state.start('RestartGame');
                    //PhaserGame.game.state.restart();
                
                }
                
                
            
                function killEnnemi(photon, ennemi){
                                ennemi.kill();
                                photon.kill();
                }

            } 
        },

        render: function () { },


    };

    return GameState;
});
