import { Cells } from './Cells'

let tempData = new Uint8Array(1)

export const nextCells = (cells: Cells) => {
  const { cols, rows, length, data } = cells
  if (tempData.length !== length) {
    tempData = new Uint8Array(length)
  }
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let liveCount = 0
      if (y - 1 >= 0) {
        liveCount += x - 1 >= 0 ? data[x - 1 + (y - 1) * cols] : 0
        liveCount += data[x + (y - 1) * cols]
        liveCount += x + 1 < cols ? data[x + 1 + (y - 1) * cols] : 0
      }
      liveCount += x - 1 >= 0 ? data[x - 1 + y * cols] : 0
      liveCount += x + 1 < cols ? data[x + 1 + y * cols] : 0
      if (y + 1 < rows) {
        liveCount += x - 1 >= 0 ? data[x - 1 + (y + 1) * cols] : 0
        liveCount += data[x + (y + 1) * cols]
        liveCount += x + 1 < cols ? data[x + 1 + (y + 1) * cols] : 0
      }
      tempData[x + y * cols] =
        liveCount === 3 || (liveCount === 2 && data[x + y * cols]) ? 1 : 0
    }
  }
  for (let i = 0; i < length; i++) {
    data[i] = tempData[i]
  }
}
