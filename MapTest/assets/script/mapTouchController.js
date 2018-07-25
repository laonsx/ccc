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
        container:{
            type:cc.Node,
            default:null
        }
    },

    onLoad: function () {

        this.container.on(cc.Node.EventType.TOUCH_MOVE,function(event){

            cc.log("............move")
            var touches = event.getTouches();
            if (touches.length == 1){

                var touch = touches[0]

                var delta = touch.getDelta()



                cc.log("...",touch.getPreviousLocation(),touch.getLocation(),touch.getDelta(),touch.getStartLocation())
            }

            if (touches.length >= 2) {
                var touch1 = touches[0], touch2 = touches[1];
                var delta1 = touch1.getDelta(), delta2 = touch2.getDelta();
                var touchPoint1 = parent.convertToNodeSpaceAR(touch1.getLocation());
                var touchPoint2 = parent.convertToNodeSpaceAR(touch2.getLocation());
                //缩放
                var distance = cc.pSub(touchPoint1, touchPoint2);
                var delta = cc.pSub(delta1, delta2);
                var scale = 1;
                if (Math.abs(distance.x) > Math.abs(distance.y)) {
                    scale = (distance.x + delta.x) / distance.x * self.target.scale;
                }
                else {
                    scale = (distance.y + delta.y) / distance.y * self.target.scale;
                }
                self.target.scale = scale < 0.1 ? 0.1 : scale;
            }

        },this.container)
    }
});
