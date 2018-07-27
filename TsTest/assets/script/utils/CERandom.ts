class CERandom {
	public constructor() {
	}


	//获取一个随机的布尔值
	public static get ranBoolean(): boolean {
		return this.ranInteger(2) == 1 ? true : false;
	}

	//获取一个正负波动值
	public static get ranWave(): number {
		return this.ranInteger(2) * 2 - 1;
	}

	//获取一个随机的范围整数值
	public static ranInteger(num: number): number {
		return Math.floor(this.ranNumber(num));
	}

	//获取一个随机的范围Number值
	public static ranNumber(num: number): number {
		return Math.random() * num;
	}

	//在一个范围内获取一个随机值，返回结果范围：num1 <= num < num2
	public static ranRange(num1: number, num2: number, isInt: boolean = true): number {
		var num: number = this.ranNumber(num2 - num1) + num1;
		if (isInt) {
			num = Math.floor(num);
		}
		return num;
	}

	/**
	 * 在百分之多少的几率下做某件事
	 * 比如 在20%的几率下作xxx：randomPercentDo(20) && xxxx
	 *
	 * @param _percent 百分比几率
	 * @return
	 *
	 */
	public static ranPercentDo(_percent: number): boolean {
		var num: number = this.ranRange(0, 101);
		if (num <= _percent) {
			return true;
		}
		else {
			return false;
		}
	}

	/**
	 * 从数组或者Vector中随机选择一个元素,(并不删除该元素)
	 */
	public static ranElementIn(_array: any): any {
		if (_array.length == 0) { return null; }
		return _array[this.ranRange(0, _array.length)];
	}
	// 随机打乱数组
	public static shuffle(array: any): any {
		let l: number = array.length;
		for (let it: number = 0; it < l; it++) {
			var r: number = this.ranInteger(l);
			var tmp: Object = array[it];
			array[it] = array[r];
			array[r] = tmp;
		}
		return array;
	}

	//在多个范围获取随机值
	public static rangeArgs(...argArray: any[]): any {
		let shuffleArray: any = this.shuffle(argArray);
		return shuffleArray.pop();
	}

	public static ranString(_length: number): string {
		let possible: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		let result: string = "";
		for (let i: number = 0; i < _length; i++) {
			result += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return result;
	}

	//获取一个随机的颜色值
	public static color(red: string = "0-255", green: string = "0-255", blue: string = "0-255"): number {
		return Number("0x" + this.transform(this.randomRange(this.explain(red, false))) +
			this.transform(this.randomRange(this.explain(green, false))) +
			this.transform(this.randomRange(this.explain(blue, false))));
	}

	//获取随机范围
	private static randomRange(ar: Array<any>): number {
		let tmpAr: Array<any> = new Array<any>();
		let length: number = ar.length;
		if (length % 2 != 0 || length == 0) {
			throw new Error("参数错误！无法获取指定范围！");
		}
		//将所有可能出现的随机数存入数组，然后进行随机
		for (let i: number = 0; i < length / 2; i++) {
			let i1: number = ar[i * 2];
			let i2: number = ar[i * 2 + 1];
			if (i1 > i2) {
				let tmp: number = i1;
				i1 = i2;
				i2 = tmp;
			}
			for (i1; i1 < i2; i1++)
				tmpAr.push(i1);
		}
		let num: number = tmpAr[this.ranInteger(tmpAr.length)];
		tmpAr = null;
		ar = null;
		return num;
	}

	//将10进制的RGB色转换为2位的16进制
	private static transform(num: number): string {
		var reStr: string = num.toString(16);
		if (reStr.length != 2)
			reStr = "0" + reStr;
		return reStr;
	}

	//字符串解析
	private static explain(str: string, isCodeAt: boolean = true): Array<any> {
		let argAr: Array<any> = new Array<any>();
		let tmpAr: Array<any> = str.split(",");
		for (let i: number = 0; i < tmpAr.length; i++) {
			var ar: Array<any> = tmpAr[i].split("-");
			if (ar.length == 2) {
				let arPush0: string = ar[0];
				let arPush1: string = ar[1];
				if (isCodeAt) {
					arPush0 = arPush0.charCodeAt(0).toString();
					arPush1 = arPush1.charCodeAt(0).toString();
				}
				//此处如果不加1，将不会随机ar[1]所表示字符，因此需要加上1，随机范围才是对的
				argAr.push(this.ranNumber(Number(arPush0)), this.ranNumber(Number(arPush1)) + 1);
			}
			else if (ar.length == 1) {
				var arPush: string = ar[0];
				if (isCodeAt) {
					arPush = arPush.charCodeAt(0).toString();
				}
				//如果范围是1-2，那么整型随机必定是1，因此拿出第一个参数后，把范围定在参数+1，则就是让该参数参加随机
				argAr.push(Number(arPush), Number(arPush) + 1);
			}
			ar = null;
		}
		tmpAr = null;
		return argAr;
	}


}