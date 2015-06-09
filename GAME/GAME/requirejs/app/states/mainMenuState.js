define(['phaser', 'app/touch', 'app/cutscenes/intro'], function (Phaser, Touch, Intro) {

    var screenTitle1;
    var screenTitle2;

    function MainMenuState(game) {};
    
    MainMenuState.prototype = {
        create: function () {            

            this.game.state.states['Game'].currentLevel = 1;

            //Gestion de du fond
            this.createTitle();

            //button_play = this.add.button(400, 180, 'play', this.playGame, this);
            var button_play = this.add.button(400, 180, 'play', this.playGame, this, 1, 0, 1);
            button_play.name = 'play';
            button_play.anchor.setTo(0.5, 0.5);

            var button_tutorial = this.add.button(400, 300, 'tutorial', this.playTutorial, this, 1, 0, 1);
            button_tutorial.name = 'tutorial';
            button_tutorial.anchor.setTo(0.5, 0.5);

            var button_help = this.add.button(400, 420, 'help', this.help, this, 1, 0, 1);
            button_help.name = 'tutorial';
            button_help.anchor.setTo(0.5, 0.5);

            if(!this.game.device.desktop){
                Touch.stop();
                Touch.boutonsSwitch();
            }
        },

        playGame: function () {
            this.state.start('ChooseLevel');
        },

        playTutorial: function () {
            this.game.state.states['Game'].currentLevel = 0;
            this.state.start('Game');
        },

        help: function () {
            this.state.start('FinishLevel');
        },

        createTitle: function(){
            title = this.game.add.sprite(0, 0, 'BG_bad');
            var coef = 600 / 720;
            title.scale.x = coef;
            title.scale.y = coef;
            var boule = [];
            for (i = 0; i < 3; ++i) {
                boule[i] = Intro.createBoule(Math.floor(Math.random() * 250), Math.floor(100 + Math.random() * 400), i % 3);
                boule[i].animations.play('anim');
            }
            for (i = 0; i < 3; ++i) {
                boule[i] = Intro.createBoule(Math.floor(200 + Math.random() * 550), Math.floor(Math.random() * 100), i % 3);
                boule[i].animations.play('anim');
            }
            for (i = 0; i < 3; ++i) {
                boule[i] = Intro.createBoule(Math.floor(500 + Math.random() * 250), Math.floor(300 + Math.random() * 250), i % 3);
                boule[i].animations.play('anim');
            }
        },

        update: function () {

        }

    };
    
    
    return MainMenuState;
});
