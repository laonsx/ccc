class CECache {
	private static mCacheDic: any = {};

	public constructor() {
	}

	public static popFromCache(_cacheKey: string): any {
		if (this.isContain(_cacheKey)) {
			return this.mCacheDic[_cacheKey].pop();
		} else {
			return null;
		}
	}

	public static pushToCache(_cacheKey: string, _target: any): void {
		let cachePool: Array<any>;
		if (this.mCacheDic[_cacheKey] == null) {
			cachePool = new Array<any>();
		} else {
			cachePool = this.mCacheDic[_cacheKey];
		}
		cachePool.push(_target);
	}

	public static isContain(_cacheKey: string): boolean {
		if (this.mCacheDic[_cacheKey] != null) {
			return this.mCacheDic[_cacheKey].length > 0;
		} else {
			return false;
		}
	}

}