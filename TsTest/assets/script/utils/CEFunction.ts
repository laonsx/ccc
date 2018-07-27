/**
 * 对Function进行封装
 * 1` 包含this指针
 * 2` 包含Disable变量,用于底层函数进行Callback之前的检测
 */
class CEFunction {

	public callback: Function;
	public thisArg: any;
	public isDisable: boolean;

	public static getNewOne(_callback: Function, _thisArg: any): CEFunction {
		var newOne: CEFunction = new CEFunction();
		newOne.callback = _callback;
		newOne.thisArg = _thisArg;
		newOne.isDisable = false;
		return newOne;
	}

	public constructor() {
	}

	public tryToCallback(_arg?: any): void {
		if (!this.isDisable) {
			this.callback.call(this.thisArg, _arg);
		}
	}


}