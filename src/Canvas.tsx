import { memo } from 'preact/compat'
import { useEffect, useRef } from 'preact/hooks'

type CanvasElementProps = Omit<JSX.IntrinsicElements['canvas'], 'ref'>

export type CanvasProps = CanvasElementProps & {
  onMount?: (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) => void
  onUnmount?: (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) => void
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
      onMount && onMount(canvas, context)
      return () => {
        console.log('CanvasOnUnMount')
        onUnmount && onUnmount(canvas, context)
      }
    }
  }, [])
  return <canvas ref={ref} {...canvasProps} />
})
