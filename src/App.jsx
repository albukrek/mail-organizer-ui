import { useState, useRef } from 'react';
import gmailLogo from '/gmail_logo.png';
import UnmatchedEmailsPanel from './components/UnmatchedEmailsPanel.jsx';
import { LABEL_GROUPS, MOCK_EMAILS } from './data/mockEmails.js';

// Confidence color per the legend: High ≥80, Medium 50-79, Low <50
const confidenceColor = (pct) =>
  pct >= 80 ? '#8a9a6a' : pct >= 50 ? '#c8a05a' : '#b02a20';

function App() {
  const [loaded, setLoaded] = useState(false);

  // Single source of truth for all emails (matched + unmatched)
  const [emails, setEmails] = useState(MOCK_EMAILS);

  // Global selection: array of email ids (spans both panels + toolbar actions)
  const [selectedIds, setSelectedIds] = useState([]);

  // Emails the user approved (visual state for the demo)
  const [approvedIds, setApprovedIds] = useState([]);

  // State for group expansion/collapse
  const [expandedGroups, setExpandedGroups] = useState({});

  // Toolbar label-group dropdown
  const [toolbarLabel, setToolbarLabel] = useState('');

  // Confirmation dialog: null | { title, message, ids }
  const [confirmAction, setConfirmAction] = useState(null);

  // Transient status message (auto-clears; a new flash cancels the previous timer)
  const [statusFlash, setStatusFlash] = useState('');
  const flashTimer = useRef(null);
  const flash = (msg) => {
    setStatusFlash(msg);
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setStatusFlash(''), 3000);
  };

  const matchedEmails = emails.filter(e => e.kind === 'matched');
  const unmatchedEmails = emails.filter(e => e.kind === 'unmatched');

  // Groups derived from actual data — only groups with emails are rendered (G9)
  const groupsWithEmails = LABEL_GROUPS
    .map(g => ({ ...g, emails: matchedEmails.filter(e => e.labelGroup === g.id) }))
    .filter(g => g.emails.length > 0);

  // --- Selection helpers ---
  const toggleEmail = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAllInGroup = (group) => {
    const ids = group.emails.map(e => e.id);
    const allSelected = ids.every(id => selectedIds.includes(id));
    setSelectedIds(prev =>
      allSelected ? prev.filter(id => !ids.includes(id)) : [...prev, ...ids.filter(id => !prev.includes(id))]
    );
  };

  // Unmatched panel "Select All" — operates on currently visible (filtered) rows (G5)
  const setUnmatchedVisibleSelection = (visibleIds, allVisibleSelected) => {
    setSelectedIds(prev =>
      allVisibleSelected
        ? prev.filter(id => !visibleIds.includes(id))
        : [...prev, ...visibleIds.filter(id => !prev.includes(id))]
    );
  };

  // --- Group expansion ---
  const toggleGroup = (groupId) => {
    setExpandedGroups(prev => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  // --- Actions ---
  const scrollMatchedPanel = () => {
    document.getElementById('matched-emails-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const requestDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    setConfirmAction({
      title: 'Delete selected emails?',
      message: `${selectedIds.length} email${selectedIds.length !== 1 ? 's' : ''} will be deleted. This cannot be undone.`,
      ids: selectedIds,
    });
  };

  // Panel-scoped: only the selected UNMATCHED emails (per section 8 spec:
  // "Delete Selected removes only selected unmatched emails").
  const requestDeleteUnmatchedSelected = () => {
    const ids = unmatchedEmails.filter(e => selectedIds.includes(e.id)).map(e => e.id);
    if (ids.length === 0) return;
    setConfirmAction({
      title: 'Delete selected unmatched emails?',
      message: `${ids.length} unmatched email${ids.length !== 1 ? 's' : ''} will be deleted. This cannot be undone.`,
      ids,
    });
  };

  const requestDeleteAllUnmatched = () => {
    if (unmatchedEmails.length === 0) return;
    setConfirmAction({
      title: 'Delete all unmatched emails?',
      message: `${unmatchedEmails.length} unmatched email${unmatchedEmails.length !== 1 ? 's' : ''} will be deleted. This cannot be undone.`,
      ids: unmatchedEmails.map(e => e.id),
    });
  };

  const confirmDelete = () => {
    if (!confirmAction) return;
    const ids = confirmAction.ids;
    setEmails(prev => prev.filter(e => !ids.includes(e.id)));
    setSelectedIds(prev => prev.filter(id => !ids.includes(id)));
    setApprovedIds(prev => prev.filter(id => !ids.includes(id)));
    setConfirmAction(null);
    flash(`${ids.length} email${ids.length !== 1 ? 's' : ''} deleted`);
  };

  const approve = (ids) => {
    if (ids.length === 0) {
      flash('No emails selected');
      return;
    }
    setApprovedIds(prev => [...prev, ...ids.filter(id => !prev.includes(id))]);
    flash(`${ids.length} email${ids.length !== 1 ? 's' : ''} approved`);
  };

  const applyLabel = () => {
    if (!toolbarLabel) {
      flash('Select a label group first');
      return;
    }
    if (selectedIds.length === 0) {
      flash('Select emails first');
      return;
    }
    const groupName = LABEL_GROUPS.find(g => g.id === toolbarLabel)?.name || toolbarLabel;
    setEmails(prev =>
      prev.map(e =>
        selectedIds.includes(e.id)
          ? { ...e, labelGroup: toolbarLabel, kind: 'matched' }
          : e
      )
    );
    setToolbarLabel('');
    flash(`Label ${groupName} applied to ${selectedIds.length} email${selectedIds.length !== 1 ? 's' : ''}`);
  };

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
              {statusFlash
                ? statusFlash
                : `Loaded ${emails.length} emails — ${matchedEmails.length} matched, ${unmatchedEmails.length} unmatched`}
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
              <div className="stat-num">{emails.length}</div>
              <div className="stat-label">Total Emails</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">{matchedEmails.length}</div>
              <div className="stat-label">Matched</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">{unmatchedEmails.length}</div>
              <div className="stat-label">Unmatched</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">{LABEL_GROUPS.length}</div>
              <div className="stat-label">Label Groups</div>
            </div>
          </div>
        </>
      )}

      {/* Email Management Toolbar */}
      {loaded && (
        <div className="toolbar-container">
          <div className="toolbar-group">
            <button className="btn toolbar-btn" onClick={scrollMatchedPanel}>Matched Emails</button>
            <button
              className="btn btn-danger toolbar-btn"
              onClick={requestDeleteSelected}
              disabled={selectedIds.length === 0}
              style={selectedIds.length === 0 ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
            >
              Delete Selected
            </button>
            <button
              className="btn toolbar-btn"
              onClick={() => approve(selectedIds)}
              disabled={selectedIds.length === 0}
              style={selectedIds.length === 0 ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
            >
              Approve Selected
            </button>
            <button className="btn toolbar-btn" onClick={() => approve(emails.map(e => e.id))}>Approve All</button>
          </div>
          <div className="toolbar-separator"></div>
          <div className="toolbar-group">
            <select
              className="toolbar-dropdown"
              value={toolbarLabel}
              onChange={(e) => setToolbarLabel(e.target.value)}
            >
              <option value="">Select Label Group</option>
              <option value="001">001 - FAMILY</option>
              <option value="002">002 - BILLS AND INVOICE</option>
              <option value="003">003 - WORK</option>
              <option value="005">005 - INSURANCE</option>
              <option value="007">007 - FRIENDS</option>
              <option value="100">100 - GENERAL</option>
            </select>
            <button className="btn toolbar-btn" onClick={applyLabel}>Apply</button>
          </div>
        </div>
      )}

      {/* Matched Emails Panel - only show if loaded */}
      {loaded && (
        <div className="matched-emails-container" id="matched-emails-panel">
          {groupsWithEmails.length > 0 ? (
            groupsWithEmails.map(group => (
              <div key={group.id} className="matched-group">
                {/* Group Header */}
                <div
                  className="matched-group-header"
                  onClick={() => toggleGroup(group.id)}
                >
                  {/* Left group: checkbox, ID, and name */}
                  <div className="matched-group-left">
                    <input
                      type="checkbox"
                      className="matched-group-select-all"
                      checked={group.emails.every(e => selectedIds.includes(e.id))}
                      onClick={(e) => e.stopPropagation()}
                      onChange={() => toggleSelectAllInGroup(group)}
                    />
                    <span className="matched-group-id">{group.id}</span>
                    <span className="matched-group-name">{group.name}</span>
                  </div>

                  {/* Right group: counts and triangle indicator */}
                  <div className="matched-group-right">
                    <span className="matched-group-count">{group.emails.length} email{group.emails.length !== 1 ? 's' : ''}</span>
                    <span className="matched-group-selection-count">{group.emails.filter(e => selectedIds.includes(e.id)).length} SELECTED</span>
                    <span className={`matched-group-triangle ${expandedGroups[group.id] ? 'expanded' : ''}`}>▼</span>
                  </div>
                </div>

                {/* Email Items - only show if group is expanded */}
                {expandedGroups[group.id] && (
                  <>
                    {group.emails.map(email => (
                      <div key={email.id} className="matched-email-item">
                        <input
                          type="checkbox"
                          className="matched-email-checkbox"
                          checked={selectedIds.includes(email.id)}
                          onClick={(e) => e.stopPropagation()}
                          onChange={() => toggleEmail(email.id)}
                        />
                        <span className="matched-email-sender">{email.sender}</span>
                        <span className="matched-email-subject">{email.subject}</span>
                        <div className="matched-email-progress">
                          <div
                            className="matched-email-progress-bar"
                            style={{ width: `${email.confidence}%`, backgroundColor: confidenceColor(email.confidence) }}
                          ></div>
                        </div>
                        <span className="matched-email-progress-label">{email.confidence}%</span>
                        {approvedIds.includes(email.id) && (
                          <span style={{ color: '#b7d7a8', fontSize: '11px', marginRight: '16px', whiteSpace: 'nowrap' }}>✓ APPROVED</span>
                        )}
                        <span className="matched-email-date">{email.date}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="matched-empty-group">No matched emails</div>
          )}
        </div>
      )}

      {/* Unmatched Emails Panel */}
      {loaded && (
        <div className="unmatched-emails-container" style={{ marginTop: '30px' }}>
          <UnmatchedEmailsPanel
            emails={unmatchedEmails}
            selectedIds={selectedIds}
            onToggleEmail={toggleEmail}
            onSetVisibleSelection={setUnmatchedVisibleSelection}
            onDeleteSelected={requestDeleteUnmatchedSelected}
            onDeleteAll={requestDeleteAllUnmatched}
          />
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {confirmAction && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
          }}
          onClick={() => setConfirmAction(null)}
        >
          <div
            style={{
              backgroundColor: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: '8px',
              padding: '24px',
              maxWidth: '420px',
              width: '90%',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.7)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ color: '#fff', fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
              {confirmAction.title}
            </div>
            <div style={{ color: '#aaa', fontSize: '13px', marginBottom: '20px' }}>
              {confirmAction.message}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="btn" onClick={() => setConfirmAction(null)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
