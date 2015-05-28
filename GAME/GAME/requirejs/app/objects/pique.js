/**
  * This module defines the sprite representing the piques
  *
  */

define(['phaser', 'app/phasergame','app/player','app/objects/coin','app/objects/platforms'], function (Phaser, PhaserGame,player,coinObject,platform) {

   function killPlayerPique(player, pique) {
                   
       
       if (!PhaserGame.game.device.desktop) {
           Touch.stopMobile();
       }
       coinObject.score = 0;
       time =0;
       PhaserGame.game.state.start('RestartGame');
                
   }
   
    function killEnnemiPique(photon, ennemi){
        ennemi.kill();
    }
    
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
                var piqueData = data[i];
                
                var pique = this.group.create(piqueData.x, piqueData.y, piqueData.skin );
                pique.body.gravity.y=1000;


            }
            
        },
        
        updateObject: function () {
            //when the player touches a coin, the score improves
             PhaserGame.game.physics.arcade.collide(this.group, platform.group);
            
                PhaserGame.game.physics.arcade.collide(player.sprite, this.group, killPlayerPique, null, this);
              PhaserGame.game.physics.arcade.collide(this.group,ennemis,killEnnemiPique,null,this);
        }
       
   }

});