import "./Pill.css";

export default function Pill({ label, active, color, onClick }) {
  return (
    <button
      className={`pill ${active ? "pill--active" : ""}`}
      onClick={onClick}
      style={{
        borderColor:    active ? color : undefined,
        backgroundColor: active ? `${color}22` : undefined,
        color:          active ? color : undefined,
      }}
    >
      {label}
    </button>
  );
}
