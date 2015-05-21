/**
 * This module implements the fonctionnalities of the player
 */

// The object "player" (Phaser.Sprite) is defined and initialized in the main program (game.js).

// Declaration of the enumeration representing the color of the player
var ColorEnum = {
    BLACK: { value: 3, name: 'Black', code: 'B' },
    RED: { value: 2, name: 'Red', code: 'R' },
    BLUE: { value: 1, name: 'Blue', code: 'Bl' },
    GREEN: { value: 0, name: 'Green', code: 'G' },
    YELLOW: { value: 4, name: 'Yellow', code: 'Y' },
    CYAN: { value: 5, name: 'Cyan', code: 'C' },
    MAGENTA: { value: 6, name: 'Magenta', code: 'M' },
    WHITE: { value: 7, name: 'White', code: 'W' }
}


/// @function initializePlayerAnimations
/// Initialize the different movements animations
/// {Phaser.Sprite} the object player itself
function initializePlayerAnimations(player) {
    for (var color in ColorEnum) {
        var vcolor = ColorEnum[color];
        player.animations.add('left' + vcolor.name, [0 + 9*vcolor.value, 1 + 9*vcolor.value, 2 + 9*vcolor.value, 3 + 9*vcolor.value], 10, true);
        player.animations.add('right' + vcolor.name, [5 + 9*vcolor.value, 6 + 9*vcolor.value, 7 + 9*vcolor.value, 8 + 9*vcolor.value], 10, true);
    }
}

/// @function updatePositionPlayer
/// Move the player when the game is updated
/// @param {Phaser.Sprite} the object player itself
/// @param {} the cursors to know the item at the origin of the signal
function updatePositionPlayer(player, cursors) {

    //  Reset the players velocity (movement)
    if (player.body.velocity.x > 10 && !player.body.touching.down) {
        player.body.velocity.x -= 5;
    } else if (player.body.velocity.x < -10 && !player.body.touching.down) {
        player.body.velocity.x += 5;
    } else {
        player.body.velocity.x = 0;
    }

    if (cursors.left.isDown) {
        //  Move to the left
        player.body.velocity.x = -300;
        player.animations.play('left' + player.color.name);
    }
    else if (cursors.right.isDown) {
        //  Move to the right
        player.body.velocity.x = 300;
        player.animations.play('right' + player.color.name);
    }
    else {
        //  Stand still
        if (player.body.velocity.x == 0) {
            player.animations.stop();
            player.frame = player.color.value * 9 + 4;
        }
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -350;
    }

}


/// @function updateColorPlayer
/// Change the color of the player according to the value in argument
/// @param {Phaser.Sprite} the object player itself
/// @param {Phaser.Keyboard} an object representing the keyboard
function updateColorPlayer(player, keyboard, game) {
    var key = keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    if (key.onDown) {
        key.onDown.removeAll();
        var sig = key.onUp.add(changeColor);
       // sig.execute([player, key]);

    }

    //  Firing?
    if (fireButton.isDown) {
        firePhoton(game);
    }
}


function changeColor() {
    var pcolor = player.color.value;
    if (pcolor == 0) {
        player.color = ColorEnum.BLUE;
        player.frame = player.color.value * 9 + 4;
    } else if (pcolor == 1) {
        player.color = ColorEnum.RED;
        player.frame = player.color.value * 9 + 4;
    }

    else {
        player.color = ColorEnum.GREEN;
        player.frame = player.color.value * 9 + 4;
    }
}

var bullets;
var bulletTime = 0;
var fireButton;

function initBullets(game) {
    //  Our bullet group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

}


function firePhoton(game) {
    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime) {
        //  Grab the first bullet we can from the pool
        bullet = bullets.getFirstExists(false);

        if (bullet) {
            //  And fire it
            bullet.reset(player.x, player.y + 8);
            bullet.body.velocity.y = -400;
            bulletTime = game.time.now + 200;
        }
    }
}



