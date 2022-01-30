import { useMemo, useRef, useEffect } from 'preact/hooks'
import { memo } from 'preact/compat'
import { LifeGame } from './LifeGame'

type Props = {
  width: number
  height: number
  cellSize?: number
  gutter?: number
  baseColor?: string
  cellColor?: string
}

const calcColsRows = (
  width: number,
  height: number,
  cellSize: number,
  gutter: number
) => {
  const cols = Math.ceil((width - gutter) / (cellSize + gutter))
  const rows = Math.ceil((height - gutter) / (cellSize + gutter))
  return {
    cols,
    rows,
  }
}

const drawLifeGame = (
  lifeGame: LifeGame,
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  cellSize: number,
  gutter: number,
  baseColor: string,
  cellColor: string
) => {
  ctx.fillStyle = baseColor
  ctx.fillRect(0, 0, width, height)
  ctx.fillStyle = cellColor
  lifeGame.getEachCell((cellX, cellY, state) => {
    if (state) {
      const x = gutter + cellX * (cellSize + gutter)
      const y = gutter + cellY * (cellSize + gutter)
      ctx.fillRect(x, y, cellSize, cellSize)
    }
  })
}

export const useLifeGame = () => {
  return useMemo(() => {
    const lifeGame = new LifeGame(0, 0)
    const LifeGameView = memo(
      ({
        width,
        height,
        cellSize = 5,
        gutter = 1,
        baseColor = 'black',
        cellColor = 'green',
      }: Props) => {
        const canvasRef = useRef<HTMLCanvasElement>(null)

        // update size
        useEffect(() => {
          const { cols, rows } = calcColsRows(width, height, cellSize, gutter)
          lifeGame.setSize(cols, rows).random().play()
        }, [width, height, cellSize, gutter])

        // update draw
        useEffect(() => {
          const canvas = canvasRef.current
          const ctx = canvas?.getContext('2d')
          if (!ctx) return

          let requestId = 0
          const loop = () => {
            requestId = requestAnimationFrame(() => {
              drawLifeGame(
                lifeGame,
                ctx,
                width,
                height,
                cellSize,
                gutter,
                baseColor,
                cellColor
              )
              loop()
            })
          }
          loop()

          return () => {
            if (requestId) {
              cancelAnimationFrame(requestId)
            }
          }
        }, [canvasRef, width, height, cellSize, gutter, baseColor, cellColor])

        return (
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            style={`width: ${width}px; height: ${height}px`}
          />
        )
      }
    )

    return {
      lifeGame,
      LifeGameView,
    }
  }, [])
}
