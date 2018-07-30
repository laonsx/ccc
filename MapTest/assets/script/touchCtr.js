// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        cameraNode : cc.Node,
        camera:cc.Camera
    },

    onLoad: function () {

        var self = this

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {

            cc.log("............move",this.name)
            let touches = event.getTouches()
            if (touches.length == 1) {

                let touch = touches[0]

                let delta = touch.getDelta()

                if (delta) {

                    // let cameraNode = cc.find("camera")
                    // cameraNode.x -= delta.x
                    // cameraNode.y -= delta.y
                    self.cameraNode.x -=delta.x
                    self.cameraNode.y -=delta.y
                }



            }

            if (touches.length >= 2) {
                let touch1 = touches[0], touch2 = touches[1];
                let delta1 = touch1.getDelta(), delta2 = touch2.getDelta();
                let touchPoint1 = touch1.getLocation();
                let touchPoint2 = touch2.getLocation();
                //缩放
                let distance = cc.pSub(touchPoint1, touchPoint2);
                let delta = cc.pSub(delta1, delta2);
                let zoomRatio = 1;
                if (Math.abs(distance.x) > Math.abs(distance.y)) {
                    zoomRatio = (distance.x + delta.x) / distance.x * self.camera.zoomRatio;
                }
                else {
                    zoomRatio = (distance.y + delta.y) / distance.y * self.camera.zoomRatio;
                }
                self.camera.zoomRatio = zoomRatio < 0.1 ? 0.1 : zoomRatio;
            }

        }, this.node)
    },

    changeSize:function (type) {

        if (type ===0){


        }
        if (type ===1){


        }
    },
})