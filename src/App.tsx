import { useLayoutEffect, useState } from 'preact/hooks'
import { useViewportSize } from './useViewportSize'
import { LifeGame } from './LifeGame'
import { LifeGameCanvas } from './LifeGameCanvas'

const lifeGame = new LifeGame(1, 1)
const cellSize = 5
const gutter = 1

const useLifeGameSize = () => {
  const viewportSize = useViewportSize()
  const cols = Math.ceil((viewportSize.width - gutter) / (cellSize + gutter))
  const rows = Math.ceil((viewportSize.height - gutter) / (cellSize + gutter))
  const width = gutter + cols * (cellSize + gutter)
  const height = gutter + rows * (cellSize + gutter)
  return { cols, rows, width, height }
}

export function App() {
  console.log('App')
  const { cols, rows, width, height } = useLifeGameSize()
  // const [fps, setFps] = useState(0)
  useLayoutEffect(() => {
    lifeGame.setSize(cols, rows).random().play()
  }, [cols, rows])
  return (
    <div>
      <LifeGameCanvas
        lifeGame={lifeGame}
        cellSize={cellSize}
        gutter={gutter}
        style={`width: ${width}px; height: ${height}px`}
        // updateFps={setFps}
      />
      <div style="position: absolute; bottom: 5px; right: 5px; display: flex; gap: 5px;">
        {/* <span style="color: #fff">{Math.round(fps)}</span> */}
        <button onClick={() => lifeGame.togglePlay()}>Play/Pause</button>
        <button onClick={() => lifeGame.next()}>Next</button>
        <button onClick={() => lifeGame.random()}>Random</button>
        <button
          onClick={() => {
            // prettier-ignore
            lifeGame.clear().touchPlane([
              [0,1,0],
              [0,0,1],
              [1,1,1],
            ], 5, 5)
          }}
        >
          Glider
        </button>
      </div>
    </div>
  )
}
