define(['app/phasergame', 'app/touch'], function (PhaserGame, Touch) {

    var button_retour;
    var aide;

    function gameHelp() {
        

        //On affiche notre aide
        if (!PhaserGame.game.device.desktop) {
            if (Touch.buttonsOn) {
                aide = PhaserGame.game.add.sprite(0, 0, 'aideBouton');
            } else {
                aide = PhaserGame.game.add.sprite(0, 0, 'aideAccelero');
            }
        } else {
            aide = PhaserGame.game.add.sprite(0, 0, 'aideOrdi');
        }

        // Creation of the three buttons

        button_retour = PhaserGame.game.add.button(700, 60, 'retour', this.reprendre, this, 1, 0, 1);
        button_retour.name = 'retour';
        button_retour.anchor.setTo(0.5, 0.5);
        button_retour.scale.x = 0.7;
        button_retour.scale.y = 0.7;

        // We put the game into pause
        PhaserGame.game.physics.arcade.isPaused = true;
        //PhaserGame.game.paused = true;
    }

    function reprendre() {
        PhaserGame.game.physics.arcade.isPaused = false;
        PhaserGame.game.paused = false;
        button_retour.kill();
        aide.kill();
    }


    return {
        gameHelp: gameHelp,
        reprendre: reprendre
    }


});