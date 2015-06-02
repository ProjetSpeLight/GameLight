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
            PhaserGame.game.load.image('sky', 'assets/sky.png');
            PhaserGame.game.load.image('ground', 'assets/platform.png');
            PhaserGame.game.load.image('diamond', 'assets/diamond.png');


            PhaserGame.game.load.image('groundYellow', 'assets/platform_Jaune.png');
            PhaserGame.game.load.image('groundRed', 'assets/platform_Rouge.png');
            PhaserGame.game.load.image('groundBlue', 'assets/platform_Bleu.png');
            PhaserGame.game.load.image('groundGreen', 'assets/platform_Vert.png');

            PhaserGame.game.load.image('coin', 'assets/star.png');

            PhaserGame.game.load.image('logo', 'assets/phaser2.png');
            PhaserGame.game.load.image('dead', 'assets/dead.png');
            PhaserGame.game.load.image('switch', 'assets/switch.png');
            PhaserGame.game.load.image('mirror', 'assets/mirror.png');



            // For the pause state
            pause.preload_pause();

<<<<<<< HEAD
            //Chargement �cran titre
=======
            //Chargement Úcran titre
>>>>>>> 89f328209a769ab47376bb6932290bf44ea9de72
            this.load.image('screentitle', 'assets/ScreenTitle.png');

            this.load.image('button_jump', 'assets/button_jump.png', 64, 64);
            this.load.image('pique', 'assets/pique.png');

            if (!this.game.device.desktop) {
                this.load.spritesheet('buttonvertical', 'assets/buttons/button-vertical.png', 64, 64);
                this.load.spritesheet('buttonhorizontal', 'assets/buttons/button-horizontal.png', 96, 64);
                this.load.spritesheet('buttonfire', 'assets/buttons/button-round-a.png', 96, 96);
                this.load.spritesheet('buttonjump', 'assets/buttons/button-round-b.png', 96, 96);
            }

            //this.load.image('play', 'assets/button_play.png');
            this.load.spritesheet('play', 'assets/boutons/New_Game.png', 190, 68);
            this.load.image('play1', 'assets/button_play_level1.png');
            this.load.image('play2', 'assets/button_play_level2.png');
            this.load.spritesheet('help', 'assets/boutons/Aide.png', 190, 68);
            this.load.spritesheet('tutorial', 'assets/boutons/Tuto.png', 190, 68);
            this.load.image('buttonNextLevel', 'assets/button_nextlevel.png');
            this.load.spritesheet('bouton', 'assets/boutons/Boutons.png', 190, 68);
            this.load.spritesheet('accelerometre', 'assets/boutons/Accelerometre.png', 190, 68);


            this.load.spritesheet('dude', 'assets/colordude.png', 32, 48);
            this.load.spritesheet('photon', 'assets/photons.png', 20, 20);
            this.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);



            this.load.image('button', 'assets/photon_vert.png');

            // Tutoriel
            this.load.json('level0', 'http://localhost:4200/assets/levels/Tutoriel.json');

            // Niveaux du jeu
            this.load.json('level1', 'http://localhost:4200/assets/levels/Tutoriel2.json');
            this.load.json('level2', 'http://localhost:4200/assets/levels/Tutoriel4.json');
            this.load.json('level3', 'http://localhost:4200/assets/levels/Tutoriel3.json');
             this.load.json('level4', 'http://localhost:4200/assets/levels/Tutoriel5.json');
            this.load.json('level5', 'http://localhost:4200/assets/levels/Exemple.json');



             /*this.load.json('level1', 'http://projetspelight.github.io/assets/levels/Tutoriel4.json');
             this.load.json('level2', 'http://projetspelight.github.io/assets/levels/Exemple.json');
             this.load.json('level3', 'http://projetspelight.github.io/assets/levels/levelTest.json');*/



        },

        create: function () {
            //call next state
            this.state.start('MainMenu');
        }
    };

    return PreloadState;
});
