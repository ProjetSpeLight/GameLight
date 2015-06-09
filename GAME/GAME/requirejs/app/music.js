define(['app/phasergame','app/objects/time'], function (PhaserGame,time) {

    return {
        
        music: null,
        //info if the sound is in pause 
        pause: false,
        preload: function () {
            PhaserGame.game.load.audio('musicTheme', 'assets/audio/musicTheme.ogg');
            PhaserGame.game.load.audio('photonFire', 'assets/audio/photonFire.ogg')
        },

        create: function () {
            this.music = PhaserGame.game.add.audio('musicTheme', 1, true);
            if (!this.music.isPlaying) {
                this.music.play();
                this.pause=false;
            }
        },
        
        stopMusic: function () {
            this.music.stop();
        },
        
        mute: function () {
            this.music.stop();
        },
        
        // @function updtade
        /// allow the music to loop on every browser ( chrome need this especially)
        update: function () {
            
            if (!this.pause) {
                //we check if it is not the first loop 
            // to avoid a useless restart 
                if ((time.time-time.timebegin )!=0 ){
                    // For this moment, the only music we have lasts 17 sec
                    // so we check if the time is equal to k*17 sec
                    /* To improve : add a information when we 
                       choose the level with the time of the music for
                       this level */
                    if (((time.timebegin-time.time) % 17 )==0) {
                        
                        this.stopMusic();
                        this.music.play();
                       
                    }
                   
                }
            }
        }
    }

});






