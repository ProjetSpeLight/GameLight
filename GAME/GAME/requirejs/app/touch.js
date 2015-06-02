/**
 * This module implements the joypad for touch devices
 */


define(['phaser', 'app/phasergame', 'app/player'], function (Phaser, PhaserGame, Player) {
    
    var options = { frequency: 100 };
    var watchID = null;
    var inGame = false;
    var orientationDroite = true;
    var zoneMorte = 3;
    var buttonjump;
    var buttonfire;
    var buttonleft;
    var buttonright;
    var buttondown;
    var buttonsOn = true;
    var buttonBouton;
    var buttonAccelerometre;

    function initJoypad() {
        this.buttonjump = PhaserGame.game.add.button(600, 500, 'buttonjump', null, this, 0, 1, 0, 1);
        this.buttonjump.fixedToCamera = true;
        this.buttonjump.events.onInputOver.add(function () { Player.activeJump = true; });
        this.buttonjump.events.onInputOut.add(function () { Player.activeJump = false; });
        this.buttonjump.events.onInputDown.add(function () { Player.activeJump = true;});
        this.buttonjump.events.onInputUp.add(function () { Player.activeJump = false; });

        this.buttonfire = PhaserGame.game.add.button(700, 500, 'buttonfire', null, this, 0, 1, 0, 1);
        this.buttonfire.fixedToCamera = true;
        this.buttonfire.events.onInputOver.add(function () { Player.fireActive = true; });
        this.buttonfire.events.onInputOut.add(function () { Player.fireActive = false; });
        this.buttonfire.events.onInputDown.add(function () { Player.fireActive = true; });
        this.buttonfire.events.onInputUp.add(function () { Player.fireActive = false; });

        this.buttonleft = PhaserGame.game.add.button(0, 472, 'buttonhorizontal', null, this, 0, 1, 0, 1);
        this.buttonleft.fixedToCamera = true;
        this.buttonleft.events.onInputOver.add(function () { Player.moveLeft = true; });
        this.buttonleft.events.onInputOut.add(function () { Player.moveLeft = false; });
        this.buttonleft.events.onInputDown.add(function () { Player.moveLeft = true; });
        this.buttonleft.events.onInputUp.add(function () { Player.moveLeft = false; });

        this.buttonright = PhaserGame.game.add.button(160, 472, 'buttonhorizontal', null, this, 0, 1, 0, 1);
        this.buttonright.fixedToCamera = true;
        this.buttonright.events.onInputOver.add(function () { Player.moveRight = true; });
        this.buttonright.events.onInputOut.add(function () { Player.moveRight = false; });
        this.buttonright.events.onInputDown.add(function () { Player.moveRight = true; });
        this.buttonright.events.onInputUp.add(function () { Player.moveRight = false; });

        this.buttondown = PhaserGame.game.add.button(96, 536, 'buttonvertical', null, this, 0, 1, 0, 1);
        this.buttondown.fixedToCamera = true;
        this.buttondown.events.onInputOver.add(function () { Player.changeColor = true; });
        this.buttondown.events.onInputOut.add(function () { Player.changeColor = false; });
        this.buttondown.events.onInputDown.add(function () { Player.changeColor = true; });
        this.buttondown.events.onInputUp.add(function () { Player.changeColor = false; });
        
    }

    function boutonsSwitch() {
        if (buttonsOn) {
            buttonBouton = PhaserGame.game.add.button(50, 50, 'bouton', changementBouton, this, 0, 1, 0, 1);
            buttonBouton.fixedToCamera = true;
        } else {
            buttonAccelerometre = PhaserGame.game.add.button(50, 50, 'accelerometre', changementBouton, this, 0, 1, 0, 1);
            buttonAccelerometre.fixedToCamera = true;
        }
    }

    function changementBouton() {
        if (buttonsOn) {
            buttonsOn = false;
            buttonBouton.kill();
            if (inGame) {
                changeControls();
            }
            boutonsSwitch();
        } else {
            buttonsOn = true;
            buttonAccelerometre.kill();
            if (inGame) {
                changeControls();
            }
            boutonsSwitch();
        }
    }
    
    function startWatching() {
        Player.accelerometerOn = true;
    }

    function onDeviceReady() {
        this.watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
    }

    function stopWatching() {
        Player.accelerometerOn = false;
    }

    function onSuccess(acceleration) {
        if (inGame) {            
            var signe;
            if(acceleration.x < 0){
                signe = -1;
            } else {
                signe = 1;
            }
            if (Math.abs(acceleration.y) > zoneMorte) {
                if(acceleration.y > 0){
                    Player.velocity = signe * (acceleration.y - zoneMorte) / (9.80 - zoneMorte) * 300;
                } else {
                    Player.velocity = signe * (acceleration.y + zoneMorte) / (9.80 - zoneMorte) * 300;
                }
            } else {
                Player.velocity = 0;
            }
        }
    }

    function killBoutonsSwitch() {
        if (buttonsOn) {
            buttonBouton.kill();
        } else {
            buttonAccelerometre.kill();
        }
    }
    
    function changeControls(){
        if(buttonsOn){
            startWatching();
            buttonjump.kill();
            buttonfire.kill();
            buttonleft.kill();
            buttonright.kill();
            buttondown.kill();
            buttonsOn = false;
        } else {
            stopWatching();
            initJoypad();
            buttonsOn = true;
        }
    }
    
    function init() {
        inGame = true;
        if(buttonsOn){
            initJoypad();
        } else {
            startWatching();
        }
    }
    
    function stop() {
        inGame = false;
        if(!buttonsOn){
            stopWatching();
        } else {
            Player.moveRight = false;
            Player.moveLeft = false;
            Player.fireActive = false;
            Player.activeJump = false;
            Player.changeColor = false;
        }
    }

    function onError(){
        alert("Acceleromètre ne marche pas");
    }
    

    return {
        init: init,
        stop: stop,
        onDeviceReady: onDeviceReady,
        changeControls: changeControls,
        boutonsSwitch: boutonsSwitch,
        killBoutonsSwitch: killBoutonsSwitch,
        changementBouton: changementBouton
    };
});