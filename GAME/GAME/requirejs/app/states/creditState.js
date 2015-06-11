define(['phaser', 'app/cookie', 'app/music'], function (Phaser, cookie, music) {

    function CreditState(game) { };

    CreditState.prototype = {
        create: function () {
            // Background
            title = this.game.add.sprite(0, 0, 'BG_bad');
            var coef = 600 / 720;
            title.scale.x = coef;
            title.scale.y = coef;

            if (!this.game.device.desktop) {
                Touch.stop();
            }

            var button_menu = this.add.button(400, 210, 'RetMenu', this.returnMenu, this);
            button_menu.name = 'Returnmenu';
            button_menu.anchor.setTo(0.5, 0.5);
            button_menu.fixedToCamera = true;

            

        },

       
        returnMenu: function () {
            this.game.state.start('MainMenu');
        }




    };

    return CreditState;
});