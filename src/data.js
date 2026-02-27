class Data {
	static #data = new Map()
	static #intervals = new Map()
	static RemoveData(key) {
		if (this.#intervals.has(key)) {
			clearTimeout(this.#intervals.get(key))
			this.#intervals.delete(key)
		}
		this.#data.delete(key)
	}

	static SetData(key, values, expires = 86400000) {
		const existing = this.#data.get(key) || {}

		this.#data.set(key, { ...existing, ...values })

		if (this.#intervals.has(key)) {
			clearTimeout(this.#intervals.get(key))
		}

		this.#intervals.set(key, setTimeout(() => {
			this.RemoveData(key)
		}, expires))

		return values
	}

	static GetData(key) {
		return this.#data.get(key) || {}
	}

	static ClearAll() {
		for (const timeout of this.#intervals.values()) {
			clearTimeout(timeout)
		}
		this.#data.clear()
		this.#intervals.clear()
	}
}

export default Data