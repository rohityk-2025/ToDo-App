import "./SyncBadge.css";

const STATUS_MAP = {
  idle:    { color: "#666",    text: "Sheet sync ready" },
  syncing: { color: "#f59e0b", text: "Syncing…" },
  ok:      { color: "#10b981", text: "Saved to Sheet ✓" },
  offline: { color: "#6366f1", text: "Demo mode (no Sheet URL)" },
  error:   { color: "#ef4444", text: "Sync failed" },
};

export default function SyncBadge({ status }) {
  const s = STATUS_MAP[status] || STATUS_MAP.idle;
  return (
    <div className="sync-badge" style={{ color: s.color }}>
      <span
        className={`sync-dot ${status === "syncing" ? "sync-dot--pulse" : ""}`}
        style={{ background: s.color, boxShadow: status === "syncing" ? `0 0 6px ${s.color}` : "none" }}
      />
      {s.text}
    </div>
  );
}
