class CENotificationFacade {

	private static mInstance: CENotificationFacade;

	public static get instance(): CENotificationFacade {
		if (this.mInstance == null) {
			this.mInstance = new CENotificationFacade();
		}
		return this.mInstance;
	}

	private mAllActiveNotificationDic: any;

	public constructor() {
		this.mAllActiveNotificationDic = {};
	}


	public register(_notification: string, _callBack: CEFunction): void {

		let callBackHolderVector: Array<CEFunction>;
		if (this.mAllActiveNotificationDic[_notification] == null) {
			callBackHolderVector = new Array<CEFunction>();
			this.mAllActiveNotificationDic[_notification] = callBackHolderVector;
		}
		else {
			callBackHolderVector = this.mAllActiveNotificationDic[_notification];
		}

		//检测是否已经存在
		for (let i: number = 0, len: number = callBackHolderVector.length; i < len; i++) {
			let ceFun: CEFunction = callBackHolderVector[i];
			if (ceFun == _callBack) {
				console.warn("CENotificationFacade->register found same listener want register for : %s   ignore", _notification);
				return;
			}
		}
		callBackHolderVector.push(_callBack);
	}

	public unRegister(_notification: string, _callBack: CEFunction): void {
		if (this.mAllActiveNotificationDic[_notification] != null && _callBack != null) {
			var callBackHolderVector: Array<CEFunction> = this.mAllActiveNotificationDic[_notification];
			var result: boolean = CEGenerateUtils.removeElementFromArrayOrVector(_callBack, callBackHolderVector);
			if (result) {
				if (callBackHolderVector.length == 0) {
					this.mAllActiveNotificationDic[_notification] = null;
					delete this.mAllActiveNotificationDic[_notification];
				}
			} else {
				console.warn("CENotificationFacade->unRegister try to remove listener for %s but not found that callback", _notification);
			}
		}
	}

	public sendNotification(_notification: string, _notificationArg: Object = null): void {
		var callBackHolderVector: Array<CEFunction> = this.mAllActiveNotificationDic[_notification];
		if (callBackHolderVector != null) {
			var tempVector: Array<CEFunction> = new Array<CEFunction>();

			//首先要将所有函数潜拷贝到一个临时Vector里面
			//1·先拷贝一份是怕在发送期间调用了unRegister方法,删除了callback,导致for each函数少loop
			//2·采用函数内new对象是防止在sendNotification期间的回调函数又导致触发了sendNotification,产生了递归
			let i: number = 0;
			let len: number = callBackHolderVector.length;
			for (i = 0; i < len; i++) {
				tempVector.push(callBackHolderVector[i]);
			}

			for (i = 0; i < len; i++) {
				let ceFun: CEFunction = tempVector[i];
				if (ceFun.callback.length == 1) {
					ceFun.tryToCallback(_notificationArg);
				} else if (ceFun.callback.length == 0) {
					ceFun.tryToCallback();
				} else {
					console.warn("CENotificationFacade->sendNotification try to callback %d , but the function parameter not 0 or 1", _notification);
				}
			}
			tempVector = null;
		}
	}

}
