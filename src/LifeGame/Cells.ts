export class Cells {
  private _cols: number
  private _rows: number
  private _data: Uint8Array
  constructor(cols = 0, rows = 0) {
    this._cols = cols
    this._rows = rows
    this._data = new Uint8Array(cols * rows)
  }

  setSize(cols: number, rows: number) {
    const data = new Uint8Array(cols * rows)
    // const xMax = Math.min(cols, this.cols)
    // const yMax = Math.min(rows, this.rows)
    // for (let y = 0; y < yMax; y++) {
    //   for (let x = 0; x < xMax; x++) {
    //     if (this.data[x + y * this.cols]) {
    //       data[x + y * cols] = 1
    //     }
    //   }
    // }
    this._cols = cols
    this._rows = rows
    this._data = data
  }
  set cols(cols: number) {
    this._cols = cols
  }
  set rows(rows: number) {
    this._rows = rows
  }

  get cols() {
    return this._cols
  }
  get rows() {
    return this._rows
  }
  get length() {
    return this._data.length
  }
  get data() {
    return this._data
  }
}
