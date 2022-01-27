import { Cells } from './Cells'

export const randomCells = (cells: Cells, rate: number) => {
  const { length, data } = cells
  for (let i = 0; i < length; i++) {
    data[i] = Math.random() < rate ? 1 : 0
  }
}
