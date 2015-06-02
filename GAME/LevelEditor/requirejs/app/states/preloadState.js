define(['phaser', 'app/pause', 'app/phasergame'], function (Phaser, pause, PhaserGame) {
    // 'use strict';

    function PreloadState(game) { }

    PreloadState.prototype = {
        preload: function () {
            // common to add a loading bar sprite here...
            this.preloadBar = PhaserGame.game.add.sprite(PhaserGame.game.width / 2 - 100, PhaserGame.game.height / 2, 'preloaderBar');
            PhaserGame.game.load.setPreloadSprite(this.preloadBar);

            // load all game assets
            // images, spritesheets, atlases, audio etc..
            PhaserGame.game.load.image('sky', 'http://localhost:4200/assets/sky.png');
            PhaserGame.game.load.image('ground', 'http://localhost:4200/assets/platform.png');
            PhaserGame.game.load.image('diamond', 'http://localhost:4200/assets/diamond.png');


            PhaserGame.game.load.image('groundYellow', 'http://localhost:4200/assets/platform_Jaune.png');
            PhaserGame.game.load.image('groundRed', 'http://localhost:4200/assets/platform_Rouge.png');
            PhaserGame.game.load.image('groundBlue', 'http://localhost:4200/assets/platform_Bleu.png');
            PhaserGame.game.load.image('groundGreen', 'http://localhost:4200/assets/platform_Vert.png');

            PhaserGame.game.load.image('coin', 'http://localhost:4200/assets/star.png');

            PhaserGame.game.load.image('logo', 'http://localhost:4200/assets/phaser2.png');
            PhaserGame.game.load.image('dead', 'http://localhost:4200/assets/dead.png');
            PhaserGame.game.load.image('switch', 'http://localhost:4200/assets/switch.png');
            PhaserGame.game.load.image('mirror', 'http://localhost:4200/assets/mirror.png');



            // For the pause state
            pause.preload_pause();



            this.load.image('button_jump', 'http://localhost:4200/assets/button_jump.png', 64, 64);
            this.load.image('pique', 'http://localhost:4200/assets/pique.png');

            if (!this.game.device.desktop) {
                this.load.spritesheet('buttonvertical', 'http://localhost:4200/assets/buttons/button-vertical.png', 64, 64);
                this.load.spritesheet('buttonhorizontal', 'http://localhost:4200/assets/buttons/button-horizontal.png', 96, 64);
                this.load.spritesheet('buttonfire', 'http://localhost:4200/assets/buttons/button-round-a.png', 96, 96);
                this.load.spritesheet('buttonjump', 'http://localhost:4200/assets/buttons/button-round-b.png', 96, 96);
            }

            this.load.image('play', 'http://localhost:4200/assets/button_play.png');
            this.load.image('play1', 'http://localhost:4200/assets/button_play_level1.png');
            this.load.image('play2', 'http://localhost:4200/assets/button_play_level2.png');
            this.load.image('help', 'http://localhost:4200/assets/button_help.png');
            this.load.image('tutorial', 'http://localhost:4200/assets/button_tutorial.png');
            this.load.image('buttonNextLevel', 'http://localhost:4200/assets/button_nextlevel.png');


            this.load.spritesheet('dude', 'http://localhost:4200/assets/colordude.png', 32, 48);
            this.load.spritesheet('photon', 'http://localhost:4200/assets/photons.png', 20, 20);
            this.load.spritesheet('baddie', 'http://localhost:4200/assets/baddie.png', 32, 32);








            this.load.json('level', 'http://localhost:4200/assets/levels/Tutoriel.json');
            



        },

        create: function () {
            //call next state
            this.state.start('Game');
        }
    };

    return PreloadState;
});
