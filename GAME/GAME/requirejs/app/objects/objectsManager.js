// This module gathers the objects related to reflexion of the game to centralize some actions
define(['phaser',
        'app/phasergame',
        'app/objects/mirror',
        'app/objects/filter',
        'app/objects/button',
        'app/objects/switch',
        'app/objects/platforms'],
function (Phaser,
          PhaserGame,
          mirror,
          filter,
          button,
          switchObject,
          platforms) {


    var EnumModule = {
        MIRROR: { idGroup: 0, refGroup: mirror.group },
        FILTER: { idGroup: 1, refGroup: filter.group },
        BUTTON: { idGroup: 2, refGroup: button.group },
        SWITCH: { idGroup: 3, refGroup: switchObject.group },
        PLATFORM: {idGroup: 4, refGroup: platforms.group}
    }



    return {

        EnumModule: EnumModule,


        createObjects: function (data) {
            mirror.createObjectsGroup(data.mirrors);
            switchObject.createObjectsGroup(data.switch, this);



        },

        updateObjects: function () {
            mirror.updateObject();
            filter.updateObject();
            button.updateObject();
            switchObject.updateObject();
        },

        getElementGroup: function (idGroup) {
            EnumModule.MIRROR.refGroup = mirror.group;
            EnumModule.PLATFORM.refGroup = platforms.group;

            for (var id in EnumModule) {
                if (EnumModule[id].idGroup == idGroup) {
                    return EnumModule[id];
                }
            }
            return null;
        },

        /// @function getObject
        /// Returns the object corresponding to the id "idObject" within the group of id "idGroup"
        /// @return the object
        /// @param {Number} the id of the group of which the object should belong to
        /// @param {Number} the id of the object within the group
        getObject: function (idGroup, idObject) {
            var element = this.getElementGroup(idGroup);
            for (var i = 0 ; i < element.refGroup.children.length ; i++) {
                if (element.refGroup.children[i].id == idObject) {
                    return element.refGroup.children[i];
                }
            }
            return null;
        }
    }

});




