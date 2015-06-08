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
        },

        create: function () {
            
            //Intro.intro1();
            Intro.flash();
           PhaserGame.game.physics.startSystem(Phaser.Physics.ARCADE);

            /*this.BG_bad = PhaserGame.game.add.sprite(0, 0, 'BG_bad');
            this.BG_good = PhaserGame.game.add.sprite(0, 0, 'BG_good');
            var coef = 600 / 720;
            this.BG_bad.scale.x = coef;
            this.BG_bad.scale.y = coef;
            this.BG_good.scale.x = coef;
            this.BG_good.scale.y = coef;


            PhaserGame.game.physics.arcade.enable(this.BG_good);
            this.BG_good.body.setSize(this.BG_good.width, 150, 0, 600 - 100);
            this.BG_good.body.immovable = true;

            player.initializePlayer(PhaserGame.game, 0, 0);

           

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
            /*PhaserGame.game.physics.arcade.collide(this.BG_good, player.sprite);
            this.i++;
            if (this.i == 6 && this.BG_good.alpha > 0) {
                this.BG_good.alpha -= 0.01;
                this.emitter.gravity -= 5;
                this.i = 0;
            }*/
        },

        render: function () {
            //PhaserGame.game.debug.body(this.BG_good);
            //PhaserGame.game.debug.body(player.sprite);
        }
    };

    return PreludeState;
});