import { useState } from 'react';
import { LABEL_GROUPS } from '../data/mockEmails.js';
import './UnmatchedEmailsPanel.css';

// Unmatched Emails Panel — prop-driven (data + selection owned by App.jsx).
// Phase 3 (item 11): all styling now lives in UnmatchedEmailsPanel.css
// (previously inline). Behavior and visuals are unchanged.
// React-standards pass: LABEL_GROUPS now imported from the single data
// module instead of a local duplicate copy.

function UnmatchedEmailsPanel({
  emails,                  // unmatched emails (array)
  selectedIds,             // array of selected email ids (global)
  onToggleEmail,           // (id) => void
  onSetVisibleSelection,   // (visibleIds, allVisibleSelected) => void
  onDeleteSelected,        // () => void (App shows confirm dialog)
  onDeleteAll,             // () => void (App shows confirm dialog)
}) {
  const [selectedFilter, setSelectedFilter] = useState('');

  // Filter (unchanged behavior per decision D2: live text filter on subject/sender)
  const filteredEmails = selectedFilter
    ? emails.filter(email =>
        email.subject.toLowerCase().includes(selectedFilter.toLowerCase()) ||
        email.sender.toLowerCase().includes(selectedFilter.toLowerCase())
      )
    : emails;

  const selectedCount = selectedIds.filter(id => emails.some(e => e.id === id)).length;
  const allVisibleSelected =
    filteredEmails.length > 0 && filteredEmails.every(e => selectedIds.includes(e.id));

  return (
    <>
      {/* Panel title (V3) — count is live, updates as emails are deleted */}
      <div className="unmatched-panel-title">
        <span className="unmatched-panel-title-text">Unmatched Emails</span>
        <span className="unmatched-panel-title-count"> ({emails.length})</span>
      </div>

      {/* Header with controls */}
      <div className="unmatched-panel-header">
        <div className="unmatched-panel-header-row">
          <div className="unmatched-panel-header-left">
            <select
              className="unmatched-panel-filter"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="">Select Label Group</option>
              {LABEL_GROUPS.map(group => (
                <option key={group.id} value={group.name}>{group.name}</option>
              ))}
            </select>
            <button className="unmatched-panel-apply-btn">
              Apply
            </button>
          </div>

          <div className="unmatched-panel-header-right">
            <button
              className="btn btn-danger unmatched-panel-delete-btn"
              onClick={onDeleteAll}
              disabled={emails.length === 0}
              style={{ cursor: 'pointer' }}
            >
              Delete All
            </button>

            <button
              className="btn btn-danger unmatched-panel-delete-btn"
              onClick={onDeleteSelected}
              disabled={selectedCount === 0}
              style={selectedCount === 0 ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
            >
              Delete Selected
            </button>
          </div>
        </div>
      </div>

      {/* Clear visual separator line */}
      <div className="unmatched-panel-separator"></div>

      {/* Email list */}
      <div className="unmatched-panel-list">
        {/* Select All checkbox row */}
        <div className="unmatched-panel-select-all-row">
          <div className="unmatched-panel-checkbox-cell">
            <input
              type="checkbox"
              className="unmatched-panel-checkbox"
              checked={allVisibleSelected}
              onChange={() => onSetVisibleSelection(filteredEmails.map(e => e.id), allVisibleSelected)}
            />
          </div>
          <span className="unmatched-panel-select-all-label">Select All</span>

          {selectedCount > 0 && (
            <span className="unmatched-panel-selected-count">
              {selectedCount} Selected
            </span>
          )}
        </div>

        {filteredEmails.length > 0 ? (
          filteredEmails.map(email => (
            <div key={email.id} className="unmatched-panel-item">
              {/* Checkbox column - aligned with Select All */}
              <div className="unmatched-panel-item-checkbox-cell">
                <input
                  type="checkbox"
                  className="unmatched-panel-checkbox"
                  checked={selectedIds.includes(email.id)}
                  onChange={() => onToggleEmail(email.id)}
                />
              </div>

              {/* Sender column */}
              <span className="unmatched-panel-sender" dir="auto">
                {email.sender}
              </span>

              {/* Subject column */}
              <span className="unmatched-panel-subject" dir="auto">
                {email.subject}
              </span>

              {/* Confidence column - 0% for unmatched (G6), Low color per legend (<50%) */}
              <span className="unmatched-panel-confidence">
                {email.confidence}%
              </span>

              {/* Date column - positioned at the far right corner of the container */}
              <span className="unmatched-panel-date">
                {email.date}
              </span>
            </div>
          ))
        ) : (
          <div className="unmatched-panel-empty">
            {selectedFilter ? 'No unmatched emails match your filter' : 'No unmatched emails'}
          </div>
        )}
      </div>
    </>
  );
}

export default UnmatchedEmailsPanel;
