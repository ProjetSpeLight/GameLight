(function () {
    //'use strict';

    requirejs.config({
        baseUrl: "requirejs/",
        paths: {
            phaser: 'lib/phaser/phaser',
            cordovalib: 'lib/cordova/cordova'
        },
        shim: {
            'phaser': {
                exports: 'Phaser',
            },
            'cordovalib': {
                exports: 'Cordova',
            }
        }
    });

    require([
        'phaser',
        'app/phasergame',
    'app/states/bootState',
    'app/states/preloadState',
    'app/states/gameState',
    'app/states/mainMenuState',
    'app/states/finishLevelState',
    'app/states/chooseLevelState',
    'app/states/restartGameState',
    'app/cordovaStart'
    ],
    function (
        Phaser,
        PhaserGame,
    BootState,
    PreloadState,
    GameState,
    MainMenuState,
    FinishLevelState,
    ChooseLevelState,
    RestartGameState,
    CordovaStart
    ) {
        PhaserGame.start();
        CordovaStart.initialize();
        PhaserGame.game.state.add('Boot', BootState);
        PhaserGame.game.state.add('Preload', PreloadState);
        PhaserGame.game.state.add('MainMenu', MainMenuState);
        PhaserGame.game.state.add('Game', GameState);
        PhaserGame.game.state.add('FinishLevel', FinishLevelState);
        PhaserGame.game.state.add('ChooseLevel', ChooseLevelState);
        PhaserGame.game.state.add('RestartGame', RestartGameState);
        PhaserGame.game.state.start('Boot');
    });
}());
