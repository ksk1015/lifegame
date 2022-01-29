export class LifeGame {
  private _cols: number
  private _rows: number
  private _data: Uint8Array
  private _tempData: Uint8Array

  constructor(cols: number, rows: number) {
    this._cols = cols
    this._rows = rows
    this._data = new Uint8Array(cols * rows)
    this._tempData = new Uint8Array(cols * rows)
  }

  get cols() {
    return this._cols
  }
  get rows() {
    return this._rows
  }
  get length() {
    return this.cols * this.rows
  }

  setSize(cols: number, rows: number) {
    this._cols = cols
    this._rows = rows
    this._data = new Uint8Array(cols * rows)
    this._tempData = new Uint8Array(cols * rows)
    return this
  }
  setCols(cols: number) {
    return this.setSize(cols, this.rows)
  }
  setRows(rows: number) {
    return this.setSize(this.cols, rows)
  }

  // セルがいるかどうか
  hasCell(x: number, y: number) {
    return (
      Number.isInteger(x) &&
      x >= 0 &&
      x < this.cols &&
      Number.isInteger(y) &&
      y >= 0 &&
      y < this.rows
    )
  }

  // セルの状態の設定・取得
  setCell(x: number, y: number, state: 0 | 1) {
    if (this.hasCell(x, y)) {
      this._data[x + y * this.cols] = state
    }
    return this
  }
  getCell(x: number, y: number) {
    if (this.hasCell(x, y)) {
      return this._data[x + y * this.cols] ? 1 : 0
    }
    return 0
  }

  // 全てのセルの状態を取得
  getEachCell(callback: (x: number, y: number, state: 0 | 1) => void) {
    const { cols, rows, _data } = this
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        callback(x, y, _data[x + y * cols] ? 1 : 0)
      }
    }
  }

  // 全てのセルを無に
  clear() {
    const { length, _data } = this
    for (let i = 0; i < length; i++) {
      _data[i] = 0
    }
    return this
  }

  // 全てのセルをランダムに生or死
  random(rate = 0.2) {
    const { length, _data } = this
    for (let i = 0; i < length; i++) {
      _data[i] = Math.random() < rate ? 1 : 0
    }
    return this
  }

  // 次の世代に進む
  next() {
    const { cols, length, _tempData, _data } = this
    for (let i = 0; i < length; i++) {
      let cnt = 0
      if (i % cols > 0) {
        _data[i - cols - 1] && ++cnt
        _data[i - 1] && ++cnt
        _data[i + cols - 1] && ++cnt
      }
      if (i % cols < cols - 1) {
        _data[i - cols + 1] && ++cnt
        _data[i + 1] && ++cnt
        _data[i + cols + 1] && ++cnt
      }
      _data[i - cols] && ++cnt
      _data[i + cols] && ++cnt
      _tempData[i] = cnt === 3 || (cnt === 2 && _data[i]) ? 1 : 0
    }
    for (let i = 0; i < length; i++) {
      this._data[i] = _tempData[i]
    }
    return this
  }

  // 再生・停止
  public playInterval = 200
  private _playId: number = 0
  private _playLoop() {
    this.next()
    this._playId = self.setTimeout(() => {
      this._playLoop()
    }, this.playInterval)
  }
  get isPlaying() {
    return !!this._playId
  }
  play() {
    if (!this.isPlaying) {
      this._playLoop()
    }
    return this
  }
  pause() {
    if (this.isPlaying) {
      clearTimeout(this._playId)
      this._playId = 0
    }
    return this
  }
  togglePlay() {
    return this.isPlaying ? this.pause() : this.play()
  }
}
