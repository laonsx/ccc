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
        disPlayNode:{
            type:cc.Node,
            default:null,
        },
        add:0.1
    },

     onLoad : function () {

         this.disPlayNode.on(cc.Node.EventType.TOUCH_START, function (event) {
            cc.log("touch_start.....",event)
         }, this.disPlayNode);
         this.disPlayNode.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
             cc.log("touch_move....",event)
         }, this.disPlayNode);
         this.disPlayNode.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
             cc.log("touch_cancel...",event)
         }, this.disPlayNode);
         this.disPlayNode.on(cc.Node.EventType.TOUCH_END, function (event) {
             cc.log("touch_end....",event)
         }, this.disPlayNode);
     },

    changeSize: function () {

        this.disPlayNode.scaleX+=this.add
        this.disPlayNode.scaleY+=this.add
    }
});
