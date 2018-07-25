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
             //this.mIsDuringTouch = true;
             //this.mLastPosX = e.stageX;
             //this.mLastPosY = e.stageY;
             //this.mStartPoint = this.mDTO.gameContainerRoot.globalToLocal(e.stageX, e.stageY, this.mStartPoint);

             this.isDuringTouch = true


         }, this.disPlayNode);
         this.disPlayNode.on(cc.Node.EventType.TOUCH_MOVE, function (event) {


         }, this.disPlayNode);
         this.disPlayNode.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {


         }, this.disPlayNode);
         this.disPlayNode.on(cc.Node.EventType.TOUCH_END, function (event) {


         }, this.disPlayNode);
     },

    changeSize: function () {

        this.disPlayNode.scaleX+=this.add
        this.disPlayNode.scaleY+=this.add
    }
});
/**
 class BigCitySubTouchProxyManger extends BigCitySubLogicBasic {

	private mIsDuringTouch: boolean;
	private mIsDuringPinch: boolean;

	private mStartPoint: egret.Point;
	private mEndPoint: egret.Point;

	private mLastPosX: number;
	private mLastPosY: number;

	private mDTO: BigCitySceneDTO;

	private mTempPoint: egret.Point;
	private mTouchCoverShape: egret.Shape;


	public initialize(_dto: BigCitySceneDTO): void {
		this.mDTO = _dto;

		this.mTouchCoverShape = new egret.Shape();
		this.mTouchCoverShape.graphics.beginFill(0x4b64a0, 0);
		this.mTouchCoverShape.graphics.drawRect(0, 0, Game.STAGE.stageWidth, Game.STAGE.stageHeight);
		this.mTouchCoverShape.graphics.endFill();
		this.mDTO.touchContainer.addChild(this.mTouchCoverShape);
		Game.STAGE.addEventListener(egret.Event.RESIZE, this.onScreenResize, this);

		this.AddTouchListener();
		this.AddPinchListener();
		this.syncFrontTouchableContainer();
	}
	public dispose(): void {
		super.dispose();
		Game.STAGE.removeEventListener(egret.Event.RESIZE, this.onScreenResize, this);
		GestureManager.removeAll(this.mDTO.touchContainer);
		this.RemoveTouchListener();
	}

	private onScreenResize(): void {
		this.mTouchCoverShape.graphics.clear();
		this.mTouchCoverShape.graphics.beginFill(0x4b64a0, 0);
		this.mTouchCoverShape.graphics.drawRect(0, 0, Game.STAGE.stageWidth, Game.STAGE.stageHeight);
		this.mTouchCoverShape.graphics.endFill();
	}



	//======================
	//== TouchEvent
	//======================
	private AddTouchListener(): void {
		this.mDTO.touchContainer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchStart, this);
		this.mDTO.touchContainer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.OnTouchMove, this);
		this.mDTO.touchContainer.addEventListener(egret.TouchEvent.TOUCH_END, this.OnTouchEnd, this);
	}
	private RemoveTouchListener(): void {
		this.mDTO.touchContainer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchStart, this);
		this.mDTO.touchContainer.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.OnTouchMove, this);
		this.mDTO.touchContainer.removeEventListener(egret.TouchEvent.TOUCH_END, this.OnTouchEnd, this);
	}
	private OnTouchStart(e: egret.TouchEvent): void {
		this.mIsDuringTouch = true;
		this.mLastPosX = e.stageX;
		this.mLastPosY = e.stageY;
		this.mStartPoint = this.mDTO.gameContainerRoot.globalToLocal(e.stageX, e.stageY, this.mStartPoint);
	}
	private OnTouchMove(e: egret.TouchEvent): void {
		if (this.mIsDuringTouch && !this.mIsDuringPinch) {
			this.mDTO.gameContainerRoot.x += BigCitySceneConfig.DEFAULT_MOVE_SPEED * (e.stageX - this.mLastPosX);
			this.mDTO.gameContainerRoot.y += BigCitySceneConfig.DEFAULT_MOVE_SPEED * (e.stageY - this.mLastPosY);

			this.syncFrontTouchableContainer();

			this.mLastPosX = e.stageX;
			this.mLastPosY = e.stageY;
		}
	}
	private OnTouchEnd(e: egret.TouchEvent): void {
		if (!this.mIsDuringPinch) {
			this.mEndPoint = this.mDTO.gameContainerRoot.globalToLocal(e.stageX, e.stageY, this.mEndPoint);
			//点击和抬起之间小于一定像素值才认为是点击
			if (egret.Point.distance(this.mStartPoint, this.mEndPoint) <= 30) {
				this.mTempPoint = CEIsoMath.world2Iso(this.mEndPoint.x, this.mEndPoint.y, this.mTempPoint);
				this.mDTO.logicFacade.onTapOnScene(this.mTempPoint.x, this.mTempPoint.y, this.mEndPoint.x, this.mEndPoint.y);
			}
		}

		this.mIsDuringTouch = false;
		this.mIsDuringPinch = false;
	}
	//=======================
	//== PitchEvent
	//========================
	private AddPinchListener(): void {
		var config = {};
		config[GestureType.PINCH] = {};
		config[GestureType.PINCH][GestureState.CHANGED] = this.onPitchAtScreen.bind(this);
		config[GestureType.PINCH][GestureState.RECOGNIZED] = this.onPitchStart.bind(this);
		config[GestureType.PINCH][GestureState.ENDED] = this.onPitchCancel.bind(this);
		config[GestureType.PINCH][GestureState.CANCELLED] = this.onPitchCancel.bind(this);
		config[GestureType.PINCH][GestureState.FAILED] = this.onPitchCancel.bind(this);

		config[GestureType.DOUBLE_TAP] = {};
		config[GestureType.DOUBLE_TAP][GestureState.RECOGNIZED] = () => {
			CENotificationFacade.instance.sendNotification(MainSceneConfig.NOTIFY_UI_RUN_TV, "本市第一座建筑竣工！ - - 记者 老郭");
		};

		GestureManager.add(this.mDTO.touchContainer, config, false);
	}
	private onPitchCancel(e: GestureEvent): void {
		this.mIsDuringPinch = false;
	}
	private onPitchStart(e: GestureEvent): void {
		this.mIsDuringPinch = true;
	}
	private onPitchAtScreen(e: GestureEvent): void {
		if (this.mIsDuringPinch) {
			let oldLocal: egret.Point = this.mDTO.gameContainerRoot.globalToLocal(e.localLocation.x, e.localLocation.y);

			if (e.dScale < 1) {
				if (this.mDTO.gameContainerRoot.scaleX >= BigCitySceneConfig.GAME_MIN_SCALE_NUM) {
					this.mDTO.gameContainerRoot.scaleX -= 0.02;
					this.mDTO.gameContainerRoot.scaleY -= 0.02;
				}
			} else if (e.dScale > 1) {
				if (this.mDTO.gameContainerRoot.scaleX <= BigCitySceneConfig.GAME_MAX_SCALE_NUM) {
					this.mDTO.gameContainerRoot.scaleX += 0.02;
					this.mDTO.gameContainerRoot.scaleY += 0.02;
				}
			}

			let nowP: egret.Point = this.mDTO.gameContainerRoot.localToGlobal(oldLocal.x, oldLocal.y);
			this.mDTO.gameContainerRoot.x -= nowP.x - e.localLocation.x;
			this.mDTO.gameContainerRoot.y -= nowP.y - e.localLocation.y;

			this.syncFrontTouchableContainer();
		}
	}

	private syncFrontTouchableContainer(): void {
		this.mDTO.gameFrontTouchableContainer.scaleX = this.mDTO.gameContainerRoot.scaleX;
		this.mDTO.gameFrontTouchableContainer.scaleY = this.mDTO.gameContainerRoot.scaleY;
		this.mDTO.gameFrontTouchableContainer.x = this.mDTO.gameContainerRoot.x;
		this.mDTO.gameFrontTouchableContainer.y = this.mDTO.gameContainerRoot.y;
	}
}
 */

/**
 var self = this;
 // cc.eventManager.addListener({
        //     event: cc.EventListener.TOUCH_ALL_AT_ONCE,
        //     onTouchesBegan: function(touch, event) {
        //         if(touch.length === 1){
        //             self.touch1.string = "X = " + touch[0].getLocation().x.toFixed(2) + "---------------Y = " + touch[0].getLocation().y.toFixed(2);

        //         }else{
        //             self.touch1.string = "X = " + touch[0].getLocation().x.toFixed(2) + "---------------Y = " + touch[0].getLocation().y.toFixed(2);
        //             self.touch2.string = "X = " + touch[1].getLocation().x.toFixed(2) + "---------------Y = " + touch[1].getLocation().y.toFixed(2);
        //         }

        //         self.log.string = touch[0].getID();

        //         return true;
        //     },
        //     onTouchesMoved: function(touch, event) {

        //     },
        //     onTouchesEnded: function(touch, event) {

        //     }
        // }, self.node)

 if (!cc.sys.isMobile) {
            return;
        }
 cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan: function (touches, event) {
                return true;
            },
            onTouchesMoved: function (touches, event) {
                if (touches.length >= 2) {
                    var touch1 = touches[0], touch2 = touches[1];

                    self.touch1.string = "X = " + touch1.getLocation().x.toFixed(2) + "---Y = " + touch1.getLocation().y.toFixed(2);
                    self.touch2.string = "X = " + touch2.getLocation().x.toFixed(2) + "---Y = " + touch2.getLocation().y.toFixed(2);
                    // var delta1 = touch1.getDelta(), delta2 = touch2.getDelta();
                    // var touchPoint1 = parent.convertToNodeSpaceAR(touch1.getLocation());
                    // var touchPoint2 = parent.convertToNodeSpaceAR(touch2.getLocation());
                    // //缩放
                    // var distance = touchPoint1.sub(touchPoint2);
                    // var delta = delta1.sub(delta2);
                    // var scale = 1;
                    // if (Math.abs(distance.x) > Math.abs(distance.y)) {
                    //     scale = (distance.x + delta.x) / distance.x * self.target.scale;
                    // }
                    // else {
                    //     scale = (distance.y + delta.y) / distance.y * self.target.scale;
                    // }
                    // self.target.scale = scale < 0.5 ? 0.5 : scale;
                }
            }
        }, self.node);

 },

 */