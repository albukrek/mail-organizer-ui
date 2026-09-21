// Stats row: confidence legend + four stat cards.
// Pure presentational — all counts come in as props from App.
export default function StatsRow({ total, matched, unmatched, labelGroups }) {
  return (
    <div className="stats-row">
      <div className="legend-card">
        <div className="legend-row">
          <span>High (≥80%)</span>
          <span className="legend-swatch swatch-high" />
        </div>
        <div className="legend-row">
          <span>Medium (50-79%)</span>
          <span className="legend-swatch swatch-medium" />
        </div>
        <div className="legend-row">
          <span>Low (&lt;50%)</span>
          <span className="legend-swatch swatch-low" />
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-num">{total}</div>
        <div className="stat-label">Total Emails</div>
      </div>
      <div className="stat-card">
        <div className="stat-num">{matched}</div>
        <div className="stat-label">Matched</div>
      </div>
      <div className="stat-card">
        <div className="stat-num">{unmatched}</div>
        <div className="stat-label">Unmatched</div>
      </div>
      <div className="stat-card">
        <div className="stat-num">{labelGroups}</div>
        <div className="stat-label">Label Groups</div>
      </div>
    </div>
  );
}
