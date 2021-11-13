import Data from '../data.js'

export default {
	"/data/read": async (req, res,data) => {
		return await Data.GetData(data.id)
	},
	"/data/write": async (req, res) => {
		const { id, ...values } = req.body
		if (!id)
			return {
				data: null
			}
		return {
			data: await Data.SetData(id, values)
		}
	}
}