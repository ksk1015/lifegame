import { memo } from 'preact/compat'
import { useCallback } from 'preact/hooks'
import { Canvas } from './Canvas'
import { LifeGame } from './LifeGame'

type LifeGameCanvasProps = {
  lifeGame: LifeGame
  cellSize?: number
  gutter?: number
  style?: JSX.CSSProperties | string
  updateFps?: (fps: number) => void
}

const updateSize = () => {}

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
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, width, height)
  ctx.fillStyle = 'green'
  lifeGame.forEachCells((cellX, cellY, state) => {
    if (state) {
      const x = gutter + cellX * (cellSize + gutter)
      const y = gutter + cellY * (cellSize + gutter)
      ctx.fillRect(x, y, cellSize, cellSize)
    }
  })
}

export const LifeGameCanvas = memo(
  ({
    lifeGame,
    cellSize = 5,
    gutter = 1,
    style = {},
    updateFps = (fps: number) => {},
  }: LifeGameCanvasProps) => {
    console.log('LifeGameCanvas')
    const onMount = useCallback(
      (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
        let requestID = 0
        const loop = () => {
          const t0 = performance.now()
          requestID = requestAnimationFrame(() => {
            draw(canvas, ctx, lifeGame, cellSize, gutter)
            const t1 = performance.now()
            updateFps(1000 / (t1 - t0))
            loop()
          })
        }
        loop()
        return () => {
          cancelAnimationFrame(requestID)
        }
      },
      []
    )
    return <Canvas onMount={onMount} style={style} />
  }
)
