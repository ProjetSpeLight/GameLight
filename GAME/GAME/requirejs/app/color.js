define([], function () {

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

    function subFilterColor(playerColor, color) {
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
                    return color;
                }
                if (color == ColorEnum.MAGENTA) {
                    return color;
                }
                break;

            case ColorEnum.YELLOW:
                if (color == ColorEnum.GREEN || color == ColorEnum.RED) {
                    return color;
                }
                if (color == ColorEnum.YELLOW) {
                    return color;
                }
                break;

            case ColorEnum.CYAN:
                if (color == ColorEnum.GREEN || color == ColorEnum.BLUE) {
                    return color;
                }
                if (color == ColorEnum.CYAN) {
                    return color;
                }
                break;

            case ColorEnum.WHITE:
                return color;
                break;
        }
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

