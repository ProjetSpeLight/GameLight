define(['phaser', 'app/phasergame', 'app/player', 'app/objects/filter', 'app/objects/action'], function (Phaser, PhaserGame, player, ennemi, action) {

    var CONST_DELAY = 5;
    var counter = 0;

   

    return {
        // The group of sprites
        group: null,
        



        /// @function createObjectsGroup
        /// Creation of the differents buttons defined in the JSON file
        /// @param {Array} Array of the different buttons defined in the JSON file. Can be null if no buttons are used in the current level
        createObjectsGroup: function (data) {
            // Allocation of the group
            this.group = PhaserGame.game.add.physicsGroup();

            // If no buttons are defined in the current level, there is nothing to do
            if (data == null) {
                return;
            }

            // For each button defined
            for (var i = 0 ; i < data.length ; i++) {
                // We get its data
                var buttonData = data[i];
                // We create a new button at the position (x,y) with the token "buttonData.skin + buttonData.color" to represent the corresponding image loaded
                //var buttonObject = this.group.create(buttonData.position.x, buttonData.position.y, buttonData.skin + buttonData.color);
                var buttonObject = this.group.create(buttonData.x, buttonData.y, 'button');
                // Attribute color
                //buttonObject.colorName = buttonData.color;
                // By default, a button is immovable
                buttonObject.body.immovable = true;

                buttonObject.buttonAction = action.actionMoveObject;
                buttonObject.args = {target:ennemi.group.children[0], x: 10, y: 0 };
            }

        },

        /// @function handlerButton
        /// Handler called when the player is on a button : trigger the associated action
        /// @param {Phaser.Sprite} the player sprite
        /// @param {Phaser.Sprite} the button
        handlerButton: function (playerSprite, button) {
            if (playerSprite.body.touching.down && !playerSprite.body.touching.right && !playerSprite.body.touching.left) {
                counter++;
                if (counter == CONST_DELAY) {
                    counter = 0;
                    button.buttonAction(button.args);
                }
            }
        },

        /// @function updateObject
        /// Updates the group of buttons (to be called by the update() function of the game state)
        updateObject: function () {
            PhaserGame.game.physics.arcade.collide(player.sprite, this.group, this.handlerButton);
        }
    }

});




