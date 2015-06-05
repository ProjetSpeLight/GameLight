define(['phaser', 'app/objects/time', 'app/touch', 'app/phasergame'], function (Phaser, time, Touch,PhaserGame) {
    // 'use strict';

    function FinishLevelState(game) { }

    FinishLevelState.prototype = {

        create: function () {

            if (!this.game.device.desktop) {
                Touch.stop();
            }

            var wellDone = this.add.text(300, 20, ' Bien joué !', { fontSize: '32px', fill: '#fff' });
            var scoreDone = this.add.text(250, 50, ' Votre score est de '+PhaserGame.score, { fontSize: '32px', fill: '#fff' });
            var timeDone = this.add.text(230, 80, ' Time: ', { fontSize: '32px', fill: '#fff' });
            if (time.time >= 0) {
                timeDone.text = 'Temps réalisé: ' + (time.timebegin - time.time) + ' sec !';
            } else {
                timeDone.text = 'Pas de temps pour ce niveau ';
            }
            var scoreFinal = this.add.text(70, 120, 'Score Final: Score Done + Bonus Time: ', { fontSize: '32px', fill: '#f00' });
            var scoreSave;
            if (time.time >= 0) {
                scoreSave=PhaserGame.score+(time.timebegin - time.time);
                scoreFinal.text = 'Final Score = Score Done + Bonus Time = ' + PhaserGame.score+' + '+ (time.timebegin - time.time) +' = '+scoreSave  ;
            } else {
                scoreSave=PhaserGame.score;
                scoreFinal.text = 'Final Score = Score Done + Bonus Time = ' + PhaserGame.score+' + 0 = '+scoreSave  ;
            }
            var cook = document.cookie;    
            //We add a cookie or change the last one for this level
            // We search the label 'Level i'
            var sub = cook.indexOf("Level"+this.game.state.states['Game'].currentLevel,1);
            //if this label exists,
            //we change the text to print the score
            if (sub<0){
                 document.cookie="Level"+ this.game.state.states['Game'].currentLevel+"="+scoreSave;
            } else {
                if (cook.substring(sub+7,sub+9)<scoreSave){
                    document.cookie="Level"+ this.game.state.states['Game'].currentLevel+"="+scoreSave;
                }
            }
            

            var button_menu = this.add.button(400, 210, 'RetMenu', this.menuclick, this);
            button_menu.name = 'Returnmenu';
            button_menu.anchor.setTo(0.5, 0.5);
            button_menu.fixedToCamera = true;

            var button_restart = this.add.button(400, 330, 'restart', this.restartclick, this);
            button_restart.name = 'restart';
            button_restart.anchor.setTo(0.5, 0.5);
            button_restart.fixedToCamera = true;

            var button_next = this.add.button(400, 450, 'buttonNextLevel', this.next, this);
            button_next.name = 'next';
            button_next.anchor.setTo(0.5, 0.5);
            button_next.fixedToCamera = true;

        },

        menuclick: function () {
            this.state.start('MainMenu');
        },

        restartclick: function () {
            this.state.start('Game');
        },

        next: function () {
            this.game.state.states['Game'].currentLevel += 1;
            if (this.game.nbLevel < this.game.state.states['Game'].currentLevel) {
                this.state.start('MainMenu', true, false);
            } else {
                this.state.start('Game', true, false);

            }
        }

    };

    return FinishLevelState;
});
