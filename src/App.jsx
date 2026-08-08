import { useState } from 'react';
import gmailLogo from '/gmail_logo.png';

const TOTAL_EMAILS = 13;
const MATCHED = 1;
const UNMATCHED = 12;

const LABEL_GROUPS = [
  { id: '001', name: 'Family', count: 1 },
  { id: '002', name: 'Bills and Invoice', count: 1 },
  { id: '003', name: 'Work', count: 1 },
  { id: '005', name: 'Insurance', count: 1 },
  { id: '007', name: 'Friends', count: 1 },
  { id: '100', name: 'General', count: 1 },
];

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <div className="header-left">
          <img
            src={gmailLogo}
            alt="Gmail"
            className="gmail-logo"
          />
          <a
            className="open-gmail-link"
            href="https://mail.google.com/"
            target="_blank"
            rel="noreferrer"
          >
            Open Gmail ↗
          </a>
        </div>
        <div className="header-right">
          <h1>My Mail Organizer</h1>
          <div className="subtitle">Smart Gmail inbox organizer</div>
        </div>
      </div>

      {/* Load Data Toggle */}
      {!loaded && (
        <div className="ready-status">
          <span>Ready to start</span>
          <button className="btn" onClick={() => setLoaded(true)}>
            Load Data
          </button>
        </div>
      )}

      {/* Status Bar */}
      {loaded && (
        <>
          <div className="status-bar">
            <span className="status-text">
              Loaded {TOTAL_EMAILS} emails — {MATCHED} matched, {UNMATCHED} unmatched
            </span>
            <button className="btn" onClick={() => setLoaded(false)}>
              Load Data
            </button>
          </div>

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
              <div className="stat-num">{TOTAL_EMAILS}</div>
              <div className="stat-label">Total Emails</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">{MATCHED}</div>
              <div className="stat-label">Matched</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">{UNMATCHED}</div>
              <div className="stat-label">Unmatched</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">{LABEL_GROUPS.length}</div>
              <div className="stat-label">Label Groups</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
