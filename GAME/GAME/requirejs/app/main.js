(function () {
    //'use strict';

    requirejs.config({
        baseUrl: "requirejs/",
        paths: {
            phaser: 'lib/phaser/phaser'          
        },
        shim: {
            'phaser': {
                exports: 'Phaser'
            }
        }
    });
 
    require([
        'phaser',
        'app/phasergame'
    ],
    function (
        Phaser,
        PhaserGame
    ) {
        var phasergame = new PhaserGame();
        phasergame.start();
    });
}());
