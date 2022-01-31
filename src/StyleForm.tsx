import { JSX } from 'preact'
import { useCallback } from 'preact/hooks'
import style from './StyleForm.module.css'

type LifeGameStyle = {
  cellSize: number
  gutter: number
  baseColor: string
  cellColor: string
}

type Props = LifeGameStyle & {
  onChange: (style: { [key: string]: string | number }) => void
  onClose?: () => void
}

export const StyleForm = ({ onChange, onClose, ...props }: Props) => {
  const handleChange = useCallback((e: JSX.TargetedEvent) => {
    if (e.target && e.target instanceof HTMLInputElement) {
      const { name, value } = e.target
      const style: { [key: string]: string | number } = {}
      style[name] =
        name === 'cellSize' || name === 'gutter' ? parseInt(value) : value
      onChange(style)
    }
  }, [])
  return (
    <div className={style.root}>
      {/* <button onClick={onClose}>X</button> */}
      <dl>
        <dt>Cell size</dt>
        <dd>
          <input
            type="number"
            min="1"
            max="100"
            step="1"
            name="cellSize"
            value={props.cellSize}
            onChange={handleChange}
          />
        </dd>
        <dt>Gutter</dt>
        <dd>
          <input
            type="number"
            min="0"
            max="100"
            step="1"
            name="gutter"
            value={props.gutter}
            onChange={handleChange}
          />
        </dd>
        <dt>Base color</dt>
        <dd>
          <input
            type="color"
            name="baseColor"
            value={props.baseColor}
            onChange={handleChange}
          />
        </dd>
        <dt>Cell color</dt>
        <dd>
          <input
            type="color"
            name="cellColor"
            value={props.cellColor}
            onChange={handleChange}
          />
        </dd>
      </dl>
    </div>
  )
}
