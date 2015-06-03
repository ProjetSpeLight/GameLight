/**
  * This module defines the sprite representing the coins
  *
  */

define(['phaser', 'app/phasergame', 'app/player','app/states/gameState'], function (Phaser, PhaserGame,player,gameState) {

   function collectCoin(player,coin) {
    // Removes the star from the screen
                    
       
       coin.kill();
        //  Add and update the score
        this.score += coin.value;
       
   }
    
    return {
        
        /***** Attributes *****/

        // Object containing the physic group of coins
        group: null,
        score: 0,

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
                var coinData = data[i];
                
                var coin = this.group.create(coinData.x, coinData.y, coinData.skin);
                if (coinData.value == null)
                    coin.value = 1;
                else
                    coin.value = coinData.value;


            }
        },
        
        updateObject: function () {
            //when the player touches a coin, the score improves
            PhaserGame.game.physics.arcade.overlap(player.sprite, this.group, collectCoin, null, this);
        }
     
   
    }
        
    
    

});
