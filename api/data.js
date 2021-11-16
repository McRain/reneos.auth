import Data from '../data.js'

export default {
	"/api/read": async (req, res,data) => {
		return await Data.GetData(data.id)
	},
	"/api/write": async (req, res) => {
		const { id, ...values } = req.body
		if (!id)
			return {}
		return await Data.SetData(id, values)
	}
}