import { useCallback, useState } from 'preact/hooks'
import { useViewportSize } from './useViewportSize'
import { useLifeGame } from './useLifeGame'
import { StyleForm } from './StyleForm'
import style from './App.module.css'

type LifeGameStyle = {
  cellSize: number
  gutter: number
  baseColor: string
  cellColor: string
}

const defaultStyle = {
  cellSize: 5,
  gutter: 1,
  baseColor: '#000000',
  cellColor: '#008000',
}

export function App() {
  const { width, height } = useViewportSize()
  const { lifeGame, LifeGameView } = useLifeGame()

  const [lifeGameStyle, setLifeGameStyle] =
    useState<LifeGameStyle>(defaultStyle)
  const handleChangeStyle = useCallback(
    (style: { [key: string]: string | number }) => {
      setLifeGameStyle((lifeGameStyle) => {
        return Object.assign({}, lifeGameStyle, style)
      })
    },
    []
  )
  return (
    <div class={style.root}>
      <LifeGameView width={width} height={height} {...lifeGameStyle} />
      <div class={style.controller}>
        <button onClick={() => lifeGame.togglePlay()}>Play/Pause</button>
        <button onClick={() => lifeGame.next()}>Next</button>
        <button onClick={() => lifeGame.random()}>Random</button>
      </div>
      <div class={style.styleForm}>
        <StyleForm {...lifeGameStyle} onChange={handleChangeStyle} />
      </div>
    </div>
  )
}
