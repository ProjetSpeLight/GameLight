define(['phaser', 'app/phasergame', 'app/player'], function (Phaser, PhaserGame, player) {

    var text = [];
    var style;
    var tween = [];
    var emitter = [];
    var BG_good;
    var BG_bad;
    var affichePlayer = false;

    return {
        emitter: emitter,
        BG_good: BG_good,
        BG_bad: BG_bad,
        affichePlayer: affichePlayer,

        intro1: function () {
            affichePlayer = false;
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
            //Définition des textes
            style = { font: "20px Arial", fill: "#000000", align: "center" };
            text[1] = PhaserGame.game.add.text(2*PhaserGame.game.world.width / 3, PhaserGame.game.world.height / 3, "Mais cet équilibre n'était que précaire", style);
            text[1].alpha = 0;
            text[1].anchor.set(0.5);
            

            //Tween entrée BG
            tween[0] = PhaserGame.game.add.tween(this.BG_good).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None);
            tween[1] = PhaserGame.game.add.tween(this.BG_good).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None);
            tween[1].delay(6000);
            tween[1].onComplete.add(this.intro3, this);
            tween[0].chain(tween[1]);  
            tween[0].start();

            //Tween entrée texte
            tween[2] = PhaserGame.game.add.tween(text[1]).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None);
            tween[3] = PhaserGame.game.add.tween(text[1]).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None);
            tween[2].delay(2000);
            tween[3].delay(2000);            
            tween[2].chain(tween[3]);
            tween[2].start();
        },

        setEmmiters: function () {
            emitter[0] = PhaserGame.game.add.emitter(PhaserGame.game.world.centerX, 0, 400);

            emitter[0].width = PhaserGame.game.world.width;
            //emitter[0].angle = 30;

            emitter[0].makeParticles('rain');

            emitter[0].minParticleScale = 0.1;
            emitter[0].maxParticleScale = 0.8;

            emitter[0].setYSpeed(300, 500);
            emitter[0].setXSpeed(-5, 5);

            emitter[0].minRotation = 0;
            emitter[0].maxRotation = 0;

            emitter[1] = PhaserGame.game.add.emitter(PhaserGame.game.world.width/4, 500, 200);

            emitter[1].makeParticles('lumiere');

            emitter[1].setRotation(0, 0);
            emitter[1].setAlpha(0.3, 0.8);
            //emitter[1].setScale(0.1, 0.7);
            emitter[1].gravity = -200;

            emitter[2] = PhaserGame.game.add.emitter(3*PhaserGame.game.world.width / 4, 400, 200);

            emitter[2].makeParticles('lumiere');

            emitter[2].setRotation(0, 0);
            emitter[2].setAlpha(0.3, 0.8);
            //emitter[2].setScale(0.3, 0.6);
            emitter[2].gravity = -400;
        },

        intro3: function () {
            //Texte
            style = { font: "20px Arial", fill: "#ffffff", align: "center" };
            text[0] = PhaserGame.game.add.text(PhaserGame.game.world.width / 2, PhaserGame.game.world.height / 2, "Et un jour...", style);
            text[0].alpha = 0;
            text[0].anchor.set(0.5);

            //Tween
            tween[0] = PhaserGame.game.add.tween(text[0]).to({ alpha: 1 }, 4000, Phaser.Easing.Linear.None);
            tween[1] = PhaserGame.game.add.tween(text[0]).to({ alpha: 0 }, 4000, Phaser.Easing.Linear.None);
            tween[1].delay(2000);
            tween[1].onComplete.add(this.intro4, this);
            tween[0].chain(tween[1]);
            tween[0].start();
        },

        intro4: function () {
 
            //Réapparition du BG good
            this.BG_good.alpha = 1;

            //Flash Eclair
            this.flash();

            //Création des particules
            this.setEmmiters();

            //Début de la pluie
            emitter[0].start(false, 1600, 1, 0);
            fx_pluie = PhaserGame.game.add.audio('son_pluie');
            fx_pluie.play();

            //Changement du monde et activation des emetteurs lumières et fin de la pluie
            tween[0] = PhaserGame.game.add.tween(this.BG_bad).to({ alpha: 1 }, 8000, Phaser.Easing.Linear.None);
            tween[0].onComplete.add(this.intro5, this);
            tween[1] = PhaserGame.game.add.tween(emitter[0]).to({ maxParticleScale: 0 }, 8000, Phaser.Easing.Linear.None);
            tween[1].onComplete.add(function () { emitter[0].destroy() }, this);
            tween[1].start();
            fx_pluie.fadeTo(10000, 0);
            emitter[1].start(false, 5000, 100);
            tween[0].start();
            PhaserGame.game.time.events.add(1000, function () { emitter[2].start(false, 5000, 100); }, this);
        },

        intro5: function () {
            //Arret de emmeteurs lumière
            emitter[1].on = false;
            emitter[2].on = false;

            //Texte
            style = { font: "20px Arial", fill: "#000000", align: "center" };
            text[0] = PhaserGame.game.add.text(PhaserGame.game.world.width / 1.5, PhaserGame.game.world.height / 4, "La lumière disparut du monde....", style);
            text[0].alpha = 0;
            text[0].anchor.set(0.5);
            text[1] = PhaserGame.game.add.text(PhaserGame.game.world.width / 1.5, PhaserGame.game.world.height / 4, "Mais tout espoir n'était pas perdu", style);
            text[1].alpha = 0;
            text[1].anchor.set(0.5);

            //Apparition du texte
            tween[0] = PhaserGame.game.add.tween(text[0]).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None);
            tween[1] = PhaserGame.game.add.tween(text[0]).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None);
            tween[1].delay(2000);
            tween[2] = PhaserGame.game.add.tween(text[1]).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None);
            tween[3] = PhaserGame.game.add.tween(text[1]).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None);
            tween[3].delay(2000);
            tween[3].onComplete.add(this.intro6, this);
            tween[0].chain(tween[1], tween[2], tween[3]);
            tween[0].start();


        },

        intro6: function () {

            affichePlayer = true;

            //Définition du texte
            style = { font: "20px Arial", fill: "#000000", align: "center" };
            text[0] = PhaserGame.game.add.text(PhaserGame.game.world.width / 1.5, PhaserGame.game.world.height / 4, "Aide nous...", style);
            text[0].alpha = 0;
            text[0].anchor.set(0.5);

            //Apparition héros
            this.flash();

            tween[2] = PhaserGame.game.add.tween(player.sprite).to({ alpha: 1 }, 5000, Phaser.Easing.Linear.None);
            tween[2].start();
            player.sprite.y = 0;

            //Apparition petite boule avec texte
            PhaserGame.game.time.events.add(6000, function () { tween[0].start(); }, this);

            tween[0] = PhaserGame.game.add.tween(text[0]).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None);
            tween[1] = PhaserGame.game.add.tween(text[0]).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None);
            tween[1].delay(1500);
            tween[0].chain(tween[1]);
            tween[1].onComplete.add(this.intro7, this);

        },

        intro7: function () {
            player.sprite.frame = player.sprite.color.value * 9 + 0;
            PhaserGame.game.time.events.add(500, function () { player.sprite.frame = player.sprite.color.value * 9 + 5; }, this);
            PhaserGame.game.time.events.add(1000, function () { player.sprite.frame = player.sprite.color.value * 9 + 0; }, this);
            PhaserGame.game.time.events.add(1500, function () { player.sprite.frame = player.sprite.color.value * 9 + 5; }, this);
            PhaserGame.game.time.events.add(2000, function () { this.intro8();}, this);
            
        },

        intro8 : function(){
            player.sprite.body.velocity.x = 75;
            player.sprite.animations.play('right' + player.sprite.color.name);
            PhaserGame.game.time.events.add(2000, function () {
                player.sprite.body.velocity.x = 0;
                player.sprite.animations.stop();
                player.sprite.frame = player.sprite.color.value * 9 + 5;
                this.intro9();
            }, this);
            
        },

        intro9: function() {

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

            //Bruit
            fx_eclair = PhaserGame.game.add.audio('son_eclair');
            fx_eclair.play();

            //Animation de flash
            var tween1 = PhaserGame.game.add.tween(rectangle).to({ alpha: 1 }, 50, Phaser.Easing.Linear.None);
            var tween1_bis = PhaserGame.game.add.tween(rectangle).to({ alpha: 1 }, 50, Phaser.Easing.Linear.None);
            var tween2 = PhaserGame.game.add.tween(rectangle).to({ alpha: 0 }, 50, Phaser.Easing.Linear.None);
            var tween3 = PhaserGame.game.add.tween(rectangle).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None);
            tween1.chain(tween2, tween1_bis, tween3);
            tween1.start();
        }
    };
});