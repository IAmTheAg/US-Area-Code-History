import './YearSlider.css';

export const YEAR_MIN = 1947;
export const YEAR_MAX = 2026;

interface Props {
  year: number;
  onChange: (year: number) => void;
  disabled?: boolean;
}

export default function YearSlider({ year, onChange, disabled = false }: Props) {
  return (
    <div className={`yearslider${disabled ? ' disabled' : ''}`}>
      <span className="yearslider-bound">{YEAR_MIN}</span>
      <input
        type="range"
        min={YEAR_MIN}
        max={YEAR_MAX}
        step={1}
        value={year}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Year"
      />
      <span className="yearslider-bound">{YEAR_MAX}</span>
      <span className="yearslider-year">{year}</span>
    </div>
  );
}
