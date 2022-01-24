import { useLayoutEffect } from 'preact/hooks'
import { useViewportSize } from './useViewportSize'
import { LifeGame } from './LifeGame'
import { LifeGameCanvas } from './LifeGameCanvas'

const lifeGame = new LifeGame(1, 1)
const cellSize = 5
const gutter = 1

export function App() {
  console.log('App')
  const { width, height } = useViewportSize()
  useLayoutEffect(() => {
    const isInitial = lifeGame.length === 1
    const cols = Math.floor((width - gutter) / (cellSize + gutter))
    const rows = Math.floor((height - gutter) / (cellSize + gutter))
    lifeGame.setSize(cols, rows)
    if (isInitial) {
      lifeGame.random()
      lifeGame.play()
    }
  }, [width, height])
  return (
    <div style="position: absolute; left: 0; top: 0; width: 100%; height: 100%">
      <LifeGameCanvas
        lifeGame={lifeGame}
        cellSize={cellSize}
        gutter={gutter}
        style="width: 100%; height: 100%"
      />
      <div style="position: absolute; bottom: 5px; right: 5px">
        <button onClick={() => lifeGame.togglePlay()}>Play/Pause</button>
        <button onClick={() => lifeGame.next()}>Next</button>
        <button onClick={() => lifeGame.random()}>Random</button>
        {/* <button onClick={() => lifeGame.clear()}>CLEAR</button> */}
        <button
          onClick={() => {
            lifeGame.clear()
            lifeGame.createFromMatrix(
              [
                [0, 1, 0],
                [0, 0, 1],
                [1, 1, 1],
              ],
              5,
              5
            )
          }}
        >
          Glider
        </button>
      </div>
    </div>
  )
}
