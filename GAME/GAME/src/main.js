(function () {
    'use strict';

    requirejs.config({
        baseUrl: "src/",
       /* paths: {
            phaser: '../node_modules/phaser/build/phaser',
        },
        shim: {
            'phaser': {
                exports: 'Phaser'
            }
        }*/
        paths: {
            Phaser: '../node_modules/phaser/build/phaser'
        },
        map: {
            '*': {
                phaser: 'Phaser'
            }
        }
    });

    require([
        'phaser',
        'app/Game'
    ],
    function (
        Phaser,
        Game
    ) {
        var game = new Game();
        game.start();
    });
}());
