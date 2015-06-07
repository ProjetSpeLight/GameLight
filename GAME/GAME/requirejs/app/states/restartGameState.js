define([], function () {

    function RestartGameState(game) { };

    RestartGameState.prototype = {
        create: function () {
            this.state.start('Game');
        }
    };

    return RestartGameState;
});
