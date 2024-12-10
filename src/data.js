const _data = {}

class Data{
	static RemoveData(key){
		if(!_data[key])
		{
			return
		}
		delete _data[key]
	}
	static SetData(key,values,expires=86400000){
		const dn = Date.now()
		if(!_data[key])
		{
			_data[key] = {
				data:{},
				update:dn,
				timeout:setTimeout(()=>{
					Data.RemoveData(key)
				},expires)
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
		return _data[key].data || {}
	}
}

export default Data