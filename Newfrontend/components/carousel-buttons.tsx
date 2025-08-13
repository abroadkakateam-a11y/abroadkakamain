import { useCallback } from 'react'

type ButtonProps = {
  onClick: () => void
  disabled?: boolean
}

export function DotButton(props: { selected: boolean } & ButtonProps) {
  const { onClick, selected } = props

  return (
    <button
      className={`w-3 h-3 rounded-full transition-colors ${selected ? 'bg-[#00A3D3]' : 'bg-white/50'}`}
      type="button"
      onClick={onClick}
    />
  )
}

export function PrevButton(props: ButtonProps) {
  const { onClick, disabled } = props

  return (
    <button
      className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-white disabled:opacity-30"
      onClick={onClick}
      disabled={disabled}
      aria-label="Previous image"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  )
}

export function NextButton(props: ButtonProps) {
  const { onClick, disabled } = props

  return (
    <button
      className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-white disabled:opacity-30"
      onClick={onClick}
      disabled={disabled}
      aria-label="Next image"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  )
}