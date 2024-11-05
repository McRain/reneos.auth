const _data = {}

class Data{
	static SetData(key,values){
		const dn = Date.now()
		if(!_data[key])
		{
			_data[key] = {
				data:{},
				update:dn
			}
		}
		const v  = _data[key]
		v.data = {...v.data,...values}
		v.update = dn
		return values
	}

	/**
	 * Return data by KEY or empty 
	 * @param {*} key 
	 * @returns 
	 */
	static GetData(key){
		return _data[key] || {}
	}
}

export default Data