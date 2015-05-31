define([], function () {

    function createAction(data) {
        return;
    }

    function actionMoveObject(args) {
        args.target.body.x += args.x;
        args.target.body.y += args.y;
    }

    function actionDeleteObject(args) {

    }

    function actionCreateObject(args) {

    }

    function actionChangeMirrorOrientation(args) {

    }

    function actionChangeObjectColor(args) {

    }
   

    return {
        createAction: createAction,
        actionMoveObject: actionMoveObject,
        actionDeleteObject: actionDeleteObject,
        actionCreateObject: actionCreateObject,
        actionChangeMirrorOrientation: actionChangeMirrorOrientation,
        actionChangeObjectColor: actionChangeObjectColor
    }

});




