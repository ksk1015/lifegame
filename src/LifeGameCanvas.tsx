import { memo } from 'preact/compat'
import { useCallback } from 'preact/hooks'
import { Canvas } from './Canvas'
import { LifeGame } from './LifeGame'

type LifeGameCanvasProps = {
  lifeGame: LifeGame
  cellSize?: number
  gutter?: number
  style?: JSX.CSSProperties | string
}

const draw = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  lifeGame: LifeGame,
  cellSize: number,
  gutter: number
) => {
  const width = lifeGame.cols * (cellSize + gutter) + gutter
  const height = lifeGame.rows * (cellSize + gutter) + gutter
  canvas.width = width
  canvas.height = height
  ctx.fillStyle = 'gray'
  ctx.fillRect(0, 0, width, height)
  ctx.fillStyle = 'green'
  lifeGame.cellsForEach((cellX, cellY, isLive) => {
    if (isLive) {
      const x = gutter + cellX * (cellSize + gutter)
      const y = gutter + cellY * (cellSize + gutter)
      ctx.fillRect(x, y, cellSize, cellSize)
    }
  })
}

export const LifeGameCanvas = memo(
  ({ lifeGame, cellSize = 4, gutter = 1, style = {} }: LifeGameCanvasProps) => {
    console.log('LifeGameCanvas')
    const onMount = useCallback(
      (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
        lifeGame.onChange = () => {
          console.log('onChange')
          draw(canvas, ctx, lifeGame, cellSize, gutter)
        }
        draw(canvas, ctx, lifeGame, cellSize, gutter)
      },
      [cellSize]
    )
    const onUnmount = useCallback(() => {
      lifeGame.onChange = () => {}
    }, [])
    return <Canvas onMount={onMount} onUnmount={onUnmount} style={style} />
  }
)
