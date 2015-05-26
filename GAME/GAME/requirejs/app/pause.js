define(['phaser'], function (Phaser) {



    function preload_pause(game) {
        game.load.image('pause', 'assets/pause.png', 180, 210);
        game.load.image('menu', 'assets/button_menu.png', 180, 210);
        game.load.image('RetMenu', 'assets/button_RetMenu.png', 180, 210);
        game.load.image('restart', 'assets/button_restart.png', 180, 210);
        game.load.image('resume', 'assets/button_resume.png', 180, 210);
    }


    function create_pause(game) {
        game.escKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    }

    function update_pause() {
        
        game.physics.arcade.isPaused = true;
        this.is_paused = true;
        game.paused = true;

        //var returnmenu = false;
        button_menu = game.add.button(400, 200, 'RetMenu', returnMenu, self);
        button_menu.name = 'Returnmenu';
        button_menu.anchor.setTo(0.5, 0.5);
        button_menu.fixedToCamera = true;
        //var temp = new SignalBinding(button_menu.onInputUp, returnMenu, true);
        //game.add(temp);
        //button_menu.onInputUp.addOnce(returnMenu, this);

        button_restart = game.add.button(400, 300, 'restart', restart, self);
        button_restart.name = 'restart';
        button_restart.anchor.setTo(0.5, 0.5);
        button_restart.fixedToCamera = true;

        button_resume = game.add.button(400, 400, 'resume', resume, self);
        button_resume.name = 'resume';
        button_resume.anchor.setTo(0.5, 0.5);
        button_resume.fixedToCamera = true;


        //game.input.onDown.add(unpause, self);

        button_menu.inputEnabled = true;
        button_menu.events.onInputUp.add(returnMenu, this);

        // And finally the method that handels the pause menu
        function unpause(event) {
            game.paused = false;
        }

        

        function menuclick() {
            returnMenu(game);
        }

        function resumeclick() {
            resume(game);
        }


        function restartclick() {
            restart(game);
        }

        function returnMenu() {
            game.paused = false;

            this.is_paused = false;
            game.physics.arcade.isPaused = false;

            game.state.start('MainMenu');
        }

        function resume(game) {
            game.paused = false;

            button_menu.destroy();
            button_restart.destroy();
            button_resume.destroy();

            this.is_paused = false;
            game.physics.arcade.isPaused = false;
        }

        function restart(game) {
            game.paused = false;

            this.is_paused = false;
            game.paused = false;

            game.physics.arcade.isPaused = false;
            game.state.start('Game');
        }


    }


    


    return {
        is_paused : false,
        update_pause: update_pause,
        preload_pause: preload_pause
    }


});
    
    
    
    
    

