import "./Checkbox.css";

export default function Checkbox({ checked, onChange }) {
  return (
    <button
      className={`checkbox ${checked ? "checkbox--checked" : ""}`}
      onClick={onChange}
      aria-label={checked ? "Mark incomplete" : "Mark complete"}
    >
      {checked && (
        <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
          <path d="M1 4L4 7.5L10 1" stroke="white" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}
