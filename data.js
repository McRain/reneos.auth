const _data = new Map()

class Data{
	static SetData(key,values){
		const v = _data.has(key)?_data.get(key):{  }
		const data = {
			...v,
			...values
		}
		_data.set(key,data)
		return data
	}

	/**
	 * Return data by KEY or KEY
	 * @param {*} key 
	 * @returns 
	 */
	static GetData(key){
		return _data.has(key)?_data.get(key):key
	}
}

export default Data