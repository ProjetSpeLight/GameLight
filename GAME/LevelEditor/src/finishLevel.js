
GameStates.FinishLevel = function (game) {  //declare the boot state

};

GameStates.FinishLevel.prototype = {
   
    create: function () {
        button_menu = this.add.button(400, 200, 'RetMenu', this.menuclick, this);
        button_menu.name = 'Returnmenu';
        button_menu.anchor.setTo(0.5, 0.5);
        button_menu.fixedToCamera=true;
        
        button_restart = this.add.button(400, 300, 'restart', this.restartclick, this);
        button_restart.name = 'restart';
        button_restart.anchor.setTo(0.5, 0.5);
        button_restart.fixedToCamera=true;   
        
    },
    
    menuclick: function () {
         this.state.start('MainMenu');
    },
    
    restartclick: function () {
        this.state.start('Game');
    }
    
};