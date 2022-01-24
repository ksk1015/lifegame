export class LifeGame {
  private _cols: number
  private _rows: number
  private _cells: Uint8Array
  private _onChange: () => void = () => {}
  private _playId: number = 0
  constructor(cols: number, rows: number) {
    this._cols = cols
    this._rows = rows
    this._cells = this.createCells()
  }
  private createCells(length = this.length): Uint8Array {
    return new Uint8Array(length)
  }
  private setCells(cells: Uint8Array) {
    this._cells = cells
    this._onChange()
  }
  setSize(cols: number, rows: number) {
    const cells = this.createCells(cols * rows)
    // 現状のcellsを反映させたい
    this._cols = cols
    this._rows = rows
    this.setCells(cells)
  }
  get cols() {
    return this._cols
  }
  set cols(cols: number) {
    this.setSize(cols, this.rows)
  }
  get rows() {
    return this._rows
  }
  set rows(rows: number) {
    this.setSize(this.cols, rows)
  }
  get length() {
    return this._cols * this._rows
  }
  get liveLength() {
    return this._cells.reduce((sum, cell) => sum + cell)
  }
  get deadLength() {
    return this.length - this.liveLength
  }
  set onChange(callback: () => void) {
    this._onChange = callback
  }
  get isPlaying() {
    return !!this._playId
  }
  coord2index(x: number, y: number) {
    const index = x + y * this.cols
    return typeof this._cells[index] !== 'undefined' ? index : -1
  }
  cellsForEach(callback: (x: number, y: number, isLive: boolean) => void) {
    for (let y = 0; y < this._rows; y++) {
      for (let x = 0; x < this._cols; x++) {
        callback(x, y, !!this._cells[x + y * this._cols])
      }
    }
  }
  next() {
    const { cols, rows, _cells } = this
    const nextCells = this.createCells()
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let live = 0
        if (y - 1 >= 0) {
          live += x - 1 >= 0 ? _cells[x - 1 + (y - 1) * cols] : 0
          live += _cells[x + (y - 1) * cols]
          live += x + 1 < cols ? _cells[x + 1 + (y - 1) * cols] : 0
        }
        live += x - 1 >= 0 ? _cells[x - 1 + y * cols] : 0
        live += x + 1 < cols ? _cells[x + 1 + y * cols] : 0
        if (y + 1 < rows) {
          live += x - 1 >= 0 ? _cells[x - 1 + (y + 1) * cols] : 0
          live += _cells[x + (y + 1) * cols]
          live += x + 1 < cols ? _cells[x + 1 + (y + 1) * cols] : 0
        }
        nextCells[x + y * cols] =
          live === 3 || (live === 2 && _cells[x + y * cols]) ? 1 : 0
      }
    }
    this._cells = nextCells
    this._onChange()
  }
  clear() {
    for (let i = 0, len = this._cells.length; i < len; i++) {
      this._cells[i] = 0
    }
    this._onChange()
  }
  random(rate: number = 0.2) {
    for (let i = 0, len = this._cells.length; i < len; i++) {
      this._cells[i] = Math.random() < rate ? 1 : 0
    }
    this._onChange()
  }
  getCell(x: number, y: number) {
    const index = this.coord2index(x, y)
    return this._cells[index]
  }
  setCell(x: number, y: number, state: 0 | 1) {
    const index = this.coord2index(x, y)
    if (index >= 0) {
      this._cells[index] = state
      this._onChange()
    }
  }
  touchCell(x: number, y: number) {
    this.setCell(x, y, 1)
  }
  killCell(x: number, y: number) {
    this.setCell(x, y, 0)
  }
  toggleCell(x: number, y: number) {
    const state = this.getCell(x, y)
    this.setCell(x, y, state ? 0 : 1)
  }
  touchCells(coords: [number, number][]) {
    for (let i = 0; i < coords.length; i++) {
      const [x, y] = coords[i]
      const index = this.coord2index(x, y)
      if (index >= 0) {
        this._cells[index] = 1
      }
    }
    this._onChange()
  }
  createFromMatrix(matrix: (1 | 0)[][], dx = 0, dy = 0) {
    const coords: [number, number][] = []
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x]) {
          coords.push([x + dx, y + dy])
        }
      }
    }
    this.touchCells(coords)
  }
  play() {
    if (this.isPlaying) {
      return
    }
    this._playId = window.setInterval(() => {
      this.next()
    }, 200)
  }
  pause() {
    if (!this.isPlaying) {
      return
    }
    clearInterval(this._playId)
    this._playId = 0
  }
  togglePlay() {
    if (this.isPlaying) {
      this.pause()
    } else {
      this.play()
    }
  }
}
