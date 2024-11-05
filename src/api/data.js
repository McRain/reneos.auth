import Data from '../data.js'

export default {
	"/api/read": (req, res,data) => Data.GetData(data.id),
	"/api/write": (req, res) => {
		const { id, ...values } = req.body
		if (!id)
			return {}
		return Data.SetData(id, values)
	}
}