import { Cells } from './Cells'

export const clearCells = (cells: Cells) => {
  const { length, data } = cells
  for (let i = 0; i < length; i++) {
    data[i] = 0
  }
}
