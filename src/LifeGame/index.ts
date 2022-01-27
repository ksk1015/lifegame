import { Cells } from './Cells'
import { nextCells } from './nextCells'
import { clearCells } from './clearCells'
import { randomCells } from './randomCells'

export class LifeGame {
  private _cells: Cells

  constructor(cols = 0, rows = 0) {
    this._cells = new Cells(cols, rows)
  }

  // サイズ変更
  setSize(cols: number, rows: number) {
    this._cells = new Cells(cols, rows)
    return this
  }
  set cols(cols: number) {
    this.setSize(cols, this.rows)
  }
  set rows(rows: number) {
    this.setSize(this.cols, rows)
  }

  get cols() {
    return this._cells.cols
  }
  get rows() {
    return this._cells.rows
  }
  get length() {
    return this._cells.length
  }

  // x,yのセルの状態を取得
  getCell(x: number, y: number) {
    return this._cells.data[x + y * this.cols]
  }

  // 全てのセルの状態を取得
  forEachCells(callback: (x: number, y: number, state: number) => void) {
    const { cols, rows, data } = this._cells
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        callback(x, y, data[x + y * cols])
      }
    }
  }

  // x,yのセルに対して変更
  setCell(x: number, y: number, state: 0 | 1) {
    this._cells.data[x + y * this.cols] = state
    return this
  }
  touchCell(x: number, y: number) {
    this.setCell(x, y, 1)
    return this
  }
  killCell(x: number, y: number) {
    this.setCell(x, y, 0)
    return this
  }
  toggleCell(x: number, y: number) {
    this.setCell(x, y, this.getCell(x, y) ? 0 : 1)
    return this
  }

  // 複数のx,yのセルに対して変更
  setCells(coords: [number, number][], state: 0 | 1) {
    const { cols, data } = this._cells
    for (let i = 0; i < coords.length; i++) {
      const [x, y] = coords[i]
      this.setCell(x, y, state)
    }
    return this
  }
  touchCells(coords: [number, number][]) {
    this.setCells(coords, 1)
    return this
  }
  killCells(coords: [number, number][]) {
    this.setCells(coords, 0)
    return this
  }

  touchPlane(plane: (1 | 0)[][], dx = 0, dy = 0) {
    for (let y = 0; y < plane.length; y++) {
      for (let x = 0; x < plane[y].length; x++) {
        this.setCell(x + dx, y + dy, plane[y][x])
      }
    }
    return this
  }

  clear() {
    clearCells(this._cells)
    return this
  }

  random(rate: number = 0.2) {
    randomCells(this._cells, rate)
    return this
  }

  next() {
    nextCells(this._cells)
    return this
  }

  // 再生・停止
  private _playId: number = 0
  public playInterval = 200
  get isPlaying() {
    return !!this._playId
  }
  play() {
    if (this.isPlaying) {
      return
    }
    const loop = () => {
      this._playId = self.setTimeout(() => {
        this.next()
        loop()
      }, this.playInterval)
    }
    loop()
  }
  pause() {
    if (!this.isPlaying) {
      return
    }
    clearTimeout(this._playId)
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
