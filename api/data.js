import Data from '../data.js'

export default {
	"/data/read": async (req, res) => {
		const { id } = req.body
		if (!id)
			return
		const result = await Data.GetData(id)
		return {
			data: result
		}
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