define(['phaser', 'app/phasergame', 'app/player'], function (Phaser, PhaserGame, player) {

    // Declaration of the enumeration representing the color of the player
    var ColorEnum = {
        BLACK: { value: 0, name: 'Black', code: 'B' },
        RED: { value: 1, name: 'Red', code: 'R' },
        BLUE: { value: 3, name: 'Blue', code: 'Bl' },
        GREEN: { value: 2, name: 'Green', code: 'G' },
        YELLOW: { value: 4, name: 'Yellow', code: 'Y' },
        CYAN: { value: 5, name: 'Cyan', code: 'C' },
        MAGENTA: { value: 6, name: 'Magenta', code: 'M' },
        WHITE: { value: 7, name: 'White', code: 'W' }
    }

    function changeFirstAndSecondColor(color,player){
         switch (color) {
                        case ColorEnum.BLACK:
                            player.firstAddColor=ColorEnum.BLACK;
                            player.secondAddColor=ColorEnum.BLACK;
                            player.numberColor=0;
                            break;

                        case ColorEnum.RED:
                        case ColorEnum.BLUE:
                        case ColorEnum.GREEN:
                            player.firstAddColor=color;
                            player.secondAddColor=ColorEnum.BLACK;
                            player.numberColor=1;
                            break;  

                        case ColorEnum.YELLOW:
                            if(player.firstAddColor==ColorEnum.BLUE){
                                if(player.secondAddColor==ColorEnum.GREEN){
                                    player.firstAddColor=player.secondAddColor;
                                    player.secondAddColor=ColorEnum.RED; 
                                } else {
                                    player.firstAddColor=player.secondAddColor;
                                    player.secondAddColor=ColorEnum.GREEN;    
                                }
                            }
                            if(player.secondAddColor==ColorEnum.BLUE){
                                if(player.firstAddColor==ColorEnum.GREEN){
                                    player.secondAddColor=ColorEnum.RED; 
                                } else {
                                    player.secondAddColor=ColorEnum.GREEN;    
                                }
                            }
                            player.numberColor=2;
                            break;
                        case ColorEnum.CYAN:
                            if(player.firstAddColor==ColorEnum.RED){
                                if(player.secondAddColor==ColorEnum.GREEN){
                                    player.firstAddColor=player.secondAddColor;
                                    player.secondAddColor=ColorEnum.BLUE; 
                                } else {
                                    player.firstAddColor=player.secondAddColor;
                                    player.secondAddColor=ColorEnum.GREEN;    
                                }
                            }
                            if(player.secondAddColor==ColorEnum.RED){
                                if(player.firstAddColor==ColorEnum.GREEN){
                                    player.secondAddColor=ColorEnum.BLUE; 
                                } else {
                                    player.secondAddColor=ColorEnum.GREEN;    
                                }
                            }
                            player.numberColor=2;
                            break;
                        case ColorEnum.MAGENTA:
                            if(player.firstAddColor==ColorEnum.GREEN){
                                if(player.secondAddColor==ColorEnum.RED){
                                    player.firstAddColor=player.secondAddColor;
                                    player.secondAddColor=ColorEnum.BLUE; 
                                } else {
                                    player.firstAddColor=player.secondAddColor;
                                    player.secondAddColor=ColorEnum.RED;    
                                }
                            }
                            if(player.secondAddColor==ColorEnum.GREEN){
                                if(player.firstAddColor==ColorEnum.RED){
                                    player.secondAddColor=ColorEnum.BLUE; 
                                } else {
                                    player.secondAddColor=ColorEnum.RED;    
                                }
                            }
                            player.numberColor=2;
                            break;
                    }
    }
    

    function subAdditiveColorMagenta(color1, color2) {
        return color1.name == 'Red' && color2.name == 'Blue';
    }

    function subAdditiveColorYellow(color1, color2) {
        return color1.name == 'Red' && color2.name == 'Green';
    }

    function subAdditiveColorCyan(color1, color2) {
        return color1.name == 'Blue' && color2.name == 'Green';
    }


    function additiveColor(oldColor, newColor) {
        if (subAdditiveColorMagenta(oldColor, newColor) || subAdditiveColorMagenta(newColor, oldColor)) {
            return ColorEnum.MAGENTA;
        }

        if (subAdditiveColorCyan(oldColor, newColor) || subAdditiveColorCyan(newColor, oldColor)) {
            return ColorEnum.CYAN;
        }

        if (subAdditiveColorYellow(oldColor, newColor) || subAdditiveColorYellow(newColor, oldColor)) {
            return ColorEnum.YELLOW;
        }

        if ((oldColor.name == 'Magenta' && newColor.name == 'Green') || (oldColor.name == 'Yellow' && newColor.name == 'Blue') || (oldColor.name == 'Cyan' && newColor.name == 'Red')) {
            return ColorEnum.WHITE;
        }

        if (oldColor.name == 'Magenta' || oldColor.name == 'Cyan' || oldColor.name == 'Yellow' || oldColor.name == 'White') {
            return oldColor;
        }

        return newColor;
    }

    /// @function subFilterColor
    /// Returns the color obtained when the light of color "playerColor" passes through a optical filter of color "color"
    /// @return Element of the enumeration ColorEnum representing the filtered color
    /// @param {Object} Element of the enumeration ColorEnum representing the initial color
    /// @param {Object} Element of the enumeration ColorEnum representing the filter color
    /// Assumes that the intial color is correctly defined
    function subFilterColor(playerColor, color,player) {
        
        if (color == null) {
            return null;
        }

        switch (playerColor) {
            case ColorEnum.RED:
            case ColorEnum.BLUE:
            case ColorEnum.GREEN:
                if (playerColor == color) {
                    return color;
                }
                break;

            case ColorEnum.MAGENTA:
                if (color == ColorEnum.RED || color == ColorEnum.BLUE) {
                    player.firstAddColor=color;
                    player.secondAddColor=ColorEnum.BLACK;
                    player.numberColor=1;                    
                    return color;
                }
                if (color == ColorEnum.MAGENTA) {
                    return color;
                }
                break;

            case ColorEnum.YELLOW:
                if (color == ColorEnum.GREEN || color == ColorEnum.RED) {
                    player.firstAddColor=color;
                    player.secondAddColor=ColorEnum.BLACK;
                    player.numberColor=1;
                    return color;
                }
                if (color == ColorEnum.YELLOW) {
                    return color;
                }
                break;

            case ColorEnum.CYAN:
                if (color == ColorEnum.GREEN || color == ColorEnum.BLUE) {
                    player.firstAddColor=color;
                    player.secondAddColor=ColorEnum.BLACK;
                    player.numberColor=1;
                    return color;
                }
                if (color == ColorEnum.CYAN) {
                    return color;
                }
                break;

            case ColorEnum.WHITE:
                changeFirstAndSecondColor(color,player);
                return color;
                break;
        }
       
        player.firstAddColor=ColorEnum.BLACK;
        player.secondAddColor=ColorEnum.BLACK;
        player.numberColor=0;
        return ColorEnum.BLACK;

    }

    /// @function getColor
    /// Return the object of the enumeration corresponding to the string in argument, null if the string does not represent a color name
    /// @param {String} the color name
    function getColor(colorName) {
        for (var id in ColorEnum) {
            if (ColorEnum[id].name == colorName) {
                return ColorEnum[id];
            }
        }
        return null;
    }

    return {
        ColorEnum: ColorEnum,
        additiveColor: additiveColor,
        subFilterColor: subFilterColor,
        getColor: getColor
    }
});

