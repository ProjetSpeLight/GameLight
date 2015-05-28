/**
  * This module defines the group of sprites representing the differents filters
  *
  */

define(['phaser', 'app/phasergame', 'app/player'], function (Phaser, PhaserGame, player) {

    function applyFilter(sprite, filter) {
        var color = 'Red';
        player.filterColor(color);
    }

    function updateObject() {
        PhaserGame.game.physics.arcade.overlap(player.sprite, ends, applyFilter);
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

            this.group = PhaserGame.game.add.physicsGroup();

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
        /// @function createObjectsGroup
        updateObject: updateObject
     
   
    }

});




