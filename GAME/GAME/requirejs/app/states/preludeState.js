define(['phaser', 'app/phasergame', 'app/player', 'app/cutscenes/intro'], function (Phaser, PhaserGame, player, Intro)
{


    function PreludeState(game) {
        
        var i = 0;
    }

    PreludeState.prototype = {

        preload: function() {
            this.load.image('BG_good', 'assets/intro/BG_good.jpg');
            this.load.image('BG_bad', 'assets/intro/BG_bad.jpg');
            this.load.image('lumiere', 'assets/intro/lumiere.png');
            this.load.image('rain', 'assets/intro/rain.png');
            this.load.audio('son_eclair', 'assets/audio/eclair.mp3');
            this.load.audio('son_pluie', 'assets/audio/pluie.mp3');
        },

        create: function () {

            PhaserGame.game.physics.startSystem(Phaser.Physics.ARCADE);

            Intro.BG_good = PhaserGame.game.add.sprite(0, 0, 'BG_good');
            var coef = 600 / 720;
            Intro.BG_good.scale.x = coef;
            Intro.BG_good.scale.y = coef;
            Intro.BG_good.alpha = 0;

            //Création du BG Bad
            Intro.BG_bad = PhaserGame.game.add.sprite(0, 0, 'BG_bad');
            Intro.BG_bad.scale.x = coef;
            Intro.BG_bad.scale.y = coef;
            Intro.BG_bad.alpha = 0;

            PhaserGame.game.physics.arcade.enable(Intro.BG_good);
            Intro.BG_good.body.setSize(Intro.BG_good.width, 150, 0, 600 - 100);
            Intro.BG_good.body.immovable = true;

            player.initializePlayer(PhaserGame.game, 100, 100);
            player.sprite.body.gravity.y = 30;
            player.sprite.frame = player.sprite.color.value * 9 + 4;
            player.sprite.alpha = 0;

            Intro.intro1();
            //Intro.flash();

            /*
            

           

            this.i = 0;

            this.emitter = PhaserGame.game.add.emitter(PhaserGame.game.world.centerX, 500, 200);

            this.emitter.makeParticles('lumiere');

            this.emitter.setRotation(0, 0);
            this.emitter.setAlpha(0.3, 0.8);
            this.emitter.setScale(0.5, 1);
            this.emitter.gravity = -200;

            //	false means don't explode all the sprites at once, but instead release at a rate of one particle per 100ms
            //	The 5000 value is the lifespan of each particle before it's killed
            this.emitter.start(false, 5000, 100);*/

            
        },

        update: function () {
            PhaserGame.game.physics.arcade.collide(Intro.BG_good, player.sprite);
            /*this.i++;
            if (this.i == 6 && this.BG_good.alpha > 0) {
                this.BG_good.alpha -= 0.01;
                this.emitter.gravity -= 5;
                this.i = 0;
            }*/
        },

        render: function () {
            /*PhaserGame.game.debug.body(Intro.BG_good);
            PhaserGame.game.debug.body(player.sprite);*/
        }
    };

    return PreludeState;
});