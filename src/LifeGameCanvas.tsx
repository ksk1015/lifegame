import { memo } from 'preact/compat'
import { useCallback } from 'preact/hooks'
import { Canvas } from './Canvas'
import { LifeGame } from './LifeGame'

type LifeGameCanvasProps = {
  lifeGame: LifeGame
  cellSize?: number
  style?: JSX.CSSProperties | string
}

const draw = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  lifeGame: LifeGame,
  cellSize: number
) => {
  canvas.width = lifeGame.cols * cellSize
  canvas.height = lifeGame.rows * cellSize
  ctx.fillStyle = 'gray'
  ctx.fillRect(0, 0, lifeGame.cols * cellSize, lifeGame.rows * cellSize)
  ctx.fillStyle = 'green'
  lifeGame.cellsForEach((x, y, isLive) => {
    if (isLive) {
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
    }
  })
}

export const LifeGameCanvas = memo(
  ({ lifeGame, cellSize = 1, style = {} }: LifeGameCanvasProps) => {
    console.log('LifeGameCanvas')
    const onMount = useCallback(
      (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
        lifeGame.onChange = () => {
          console.log('onChange')
          draw(canvas, ctx, lifeGame, cellSize)
        }
        draw(canvas, ctx, lifeGame, cellSize)
      },
      [cellSize]
    )
    const onUnmount = useCallback(() => {
      lifeGame.onChange = () => {}
    }, [])
    return <Canvas onMount={onMount} onUnmount={onUnmount} style={style} />
  }
)
