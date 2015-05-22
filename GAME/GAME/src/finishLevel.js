
GameStates.FinishLevel = function (game) {  //declare the boot state

};

GameStates.FinishLevel.prototype = {
   
    create: function () {
        this.add.sprite(200, 200, 'logo');
        
    }
};