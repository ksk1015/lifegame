import { memo } from 'preact/compat'
import { useEffect, useRef } from 'preact/hooks'

type CanvasElementProps = Omit<JSX.IntrinsicElements['canvas'], 'ref'>

type OnUnmount = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
) => void

type OnMount = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
) => OnUnmount | void

export type CanvasProps = CanvasElementProps & {
  onMount?: OnMount
  onUnmount?: OnMount
}

export const Canvas = memo((props: CanvasProps) => {
  console.log('Canvas')
  const { onMount, onUnmount, ...canvasProps } = props
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    const context = canvas?.getContext('2d')
    if (canvas && context) {
      console.log('CanvasOnMount')
      const returnedOnUnmount = onMount ? onMount(canvas, context) : null
      return () => {
        console.log('CanvasOnUnMount')
        returnedOnUnmount && returnedOnUnmount(canvas, context)
        onUnmount && onUnmount(canvas, context)
      }
    }
  }, [])
  return <canvas ref={ref} {...canvasProps} />
})
