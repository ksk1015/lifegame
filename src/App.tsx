import { useLayoutEffect, useState } from 'preact/hooks'
import { useViewportSize } from './useViewportSize'
import { useLifeGame } from './useLifeGame'

export function App() {
  console.log('App')
  const { width, height } = useViewportSize()
  const { lifeGame, LifeGameView } = useLifeGame()
  return (
    <div>
      <LifeGameView width={width} height={height} cellSize={5} gutter={1} />
      <div style="position: absolute; bottom: 5px; right: 5px; display: flex; gap: 5px;">
        <button onClick={() => lifeGame.togglePlay()}>Play/Pause</button>
        <button onClick={() => lifeGame.next()}>Next</button>
        <button onClick={() => lifeGame.random()}>Random</button>
      </div>
    </div>
  )
}
