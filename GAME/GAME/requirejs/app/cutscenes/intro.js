define(['phaser', 'app/phasergame'], function (Phaser, PhaserGame) {

    var text = [];
    var style;
    var tween = [];
    var emitter;
    var BG_good;
    var BG_bad;

    return {
        emitter: emitter,
        BG_good: BG_good,
        BG_bad: BG_bad,

        intro1: function () {
            //Fond NOIR
            PhaserGame.game.stage.backgroundColor = '#000000';

            //Définition des textes
            style = { font: "20px Arial", fill: "#ffffff", align: "center" };
            text[0] = PhaserGame.game.add.text(PhaserGame.game.world.width/3, PhaserGame.game.world.height/3, "Dans un monde rempli de lumière...", style);
            text[0].alpha = 0;
            text[0].anchor.set(0.5);
            text[1] = PhaserGame.game.add.text(2 * PhaserGame.game.world.width / 3, 2 * PhaserGame.game.world.height / 3, "Tout était en parfaite harmonie", style);
            text[1].alpha = 0;
            text[1].anchor.set(0.5);

            //Tween entrée et sortie
            tween[0] = PhaserGame.game.add.tween(text[0]).to({ alpha: 1 }, 4000, Phaser.Easing.Linear.None);
            tween[1] = PhaserGame.game.add.tween(text[0]).to({ alpha: 0 }, 4000, Phaser.Easing.Linear.None);
            tween[1].delay(2000);
            tween[0].chain(tween[1]);
            tween[0].start();
            tween[2] = PhaserGame.game.add.tween(text[1]).to({ alpha: 1 }, 4000, Phaser.Easing.Linear.None);
            tween[3] = PhaserGame.game.add.tween(text[1]).to({ alpha: 0 }, 4000, Phaser.Easing.Linear.None);
            tween[2].delay(2000);
            tween[3].delay(2000);
            tween[3].onComplete.add(this.intro2, this);
            tween[2].chain(tween[3]);
            tween[2].start();
        },

        intro2: function () {
            //Chargement de l'image de fond invisible
            BG_good = PhaserGame.game.add.sprite(0, 0, 'BG_good');
            var coef = 600 / 720;
            BG_good.scale.x = coef;
            BG_good.scale.y = coef;
            BG_good.alpha = 0;

            //Définition des textes
            style = { font: "20px Arial", fill: "#000000", align: "center" };
            text[1] = PhaserGame.game.add.text(2*PhaserGame.game.world.width / 3, PhaserGame.game.world.height / 3, "Mais cet équilibre n'était que précaire", style);
            text[1].alpha = 0;
            text[1].anchor.set(0.5);
            

            //Tween entrée BG
            tween[0] = PhaserGame.game.add.tween(BG_good).to({ alpha: 1 }, 4000, Phaser.Easing.Linear.None);
            tween[0].start();

            //Tween entrée texte
            tween[2] = PhaserGame.game.add.tween(text[1]).to({ alpha: 1 }, 4000, Phaser.Easing.Linear.None);
            tween[3] = PhaserGame.game.add.tween(text[1]).to({ alpha: 0 }, 4000, Phaser.Easing.Linear.None);
            tween[2].delay(2000);
            tween[3].delay(2000);
            tween[3].onComplete.add(this.intro3, this);
            tween[2].chain(tween[3]);
            tween[2].start();
        },

        intro3: function () {
            this.flash();
        },

        flash: function () {
            //Dessin du rectangle blanc
            var rectangle = PhaserGame.game.add.graphics(0, 0);
            rectangle.clear();
            rectangle.alpha = 0;
            rectangle.lineStyle(1, 0xffffff);
            rectangle.beginFill(0xffffff);
            rectangle.drawRect(0, 0, 800, 600);
            rectangle.endFill();

            //Animation de flash
            var tween1 = PhaserGame.game.add.tween(rectangle).to({ alpha: 1 }, 50, Phaser.Easing.Linear.None);
            var tween1_bis = PhaserGame.game.add.tween(rectangle).to({ alpha: 1 }, 50, Phaser.Easing.Linear.None);
            var tween2 = PhaserGame.game.add.tween(rectangle).to({ alpha: 0 }, 50, Phaser.Easing.Linear.None);
            var tween3 = PhaserGame.game.add.tween(rectangle).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None);
            tween1.chain(tween2, tween1_bis, tween3);
            tween3.onComplete.add(this.flash, this);
            tween1.start();
        }
    };
});