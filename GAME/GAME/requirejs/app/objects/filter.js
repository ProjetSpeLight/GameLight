define(['phaser', 'app/phasergame', 'app/player', 'app/color'], function (Phaser, PhaserGame, player, Color) {

    /// @function applyFilter
    /// Handler called when the player overlap a filter
    function applyFilter(sprite, filter) {
        player.filterColor(color, filter.color);
    }

    /// @function applyFilter
    /// Handler called when a photon thrown by the player overlap a filter
    function applyFilterPhoton(photon, filter) {
        photon.color = Color.subFilterColor(photon.color, Color.getColor(filter.color));
    }




    /************ Public part of the module ************/

    return {

        /***** Attributes *****/

        // Object containing the physic group of filters
        group: null,

        /***** Methodes *****/

        /// @function createObjectsGroup
        /// Create the differents objects defines in the JSON file represented by this module
        /// @param {Array} Array of elements representing 
        createObjectGroup: function (data) {
            // Allocation of the group
            this.group = PhaserGame.game.add.physicsGroup();
            // If no filters are defined in the current level, there is nothing to do
            if (data == null) {
                return;
            }

            for (var i = 0 ; i < data.length ; i++) {
                var filterData = data[i];
                // We create a new filter at the position (x,y) with the token "filterData.skin + filterData.color" to represent the corresponding image loaded
                var filter = this.group.create(filterData.position.x, filterData.position.y, filterData.skin + filterData.color);
                // Attribute color
                filter.color = filterData.color;
            }
        },

        /// @function updateObject
        /// Updates the group of filters (to be called by the update() function of the game state)
        updateObject: function () {
            PhaserGame.game.physics.arcade.overlap(player.sprite, this.group, applyFilter);
            PhaserGame.game.physics.arcade.overlap(player.refPhotons.photons, this.group, applyFilterPhoton);
        }


    }

});




