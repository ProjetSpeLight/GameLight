/**
 * This file implements the functions related to the photon
 */


var photons;
var photonTime = 0;
var fireButton;

function initPhotons(game) {
    //  Our photon group
    photons = game.add.group();
    photons.enableBody = true;
    photons.physicsBodyType = Phaser.Physics.ARCADE;
    photons.createMultiple(30, 'photon');
    photons.setAll('anchor.x', 0.5);
    photons.setAll('anchor.y', 1);
    photons.setAll('outOfBoundsKill', true);
    photons.setAll('checkWorldBounds', true);

    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

}


function firePhoton(game) {
    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > photonTime) {
        //  Grab the first photon we can from the pool
        photon = photons.getFirstExists(false);

        if (photon) {
            //  And fire it
            photon.reset(player.x, player.y + 8);
            photon.body.velocity.y = -400;
            photonTime = game.time.now + 200;
        }
    }
}



