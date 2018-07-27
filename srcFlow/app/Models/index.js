// @flow

export type ModelType = {
  updated_at?: Date,
  created_at?: Date,
}

// const dataS = Symbol("data")

class Model {
  _data: {}

  constructor(d: {}) {
    this._data = this.defaultData
    if (d) this.data = d
  }

  get defaultData() {
    return {}
  }

  get data() {
    return this._data
  }

  set data(d: {}) {
    Object.keys(this._data).forEach((key) => {
      if (d[key]) {
        this._data[key] = d[key]
      }
    })
  }

  clearify() {
    const d = this._data
    return Object.keys(d).reduce((sum, key) => {
      if (d[key]) {
        sum[key] = d[key]
      }
      return sum
    }, {})
  }

  toJSON() {
    return this._data
  }
}

export default Model
