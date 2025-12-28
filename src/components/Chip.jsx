import './Chip.css'

function Chip({ text, onClick, isSelected = false }) {
  return (
    <button
      className={`chip ${isSelected ? 'chip--selected' : ''}`}
      onClick={onClick}
      type="button"
    >
      {text}
    </button>
  )
}

export default Chip

