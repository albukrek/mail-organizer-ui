// Matched Emails Panel (V2: separate rounded cards per group + pill badges).
// Pure presentational — data, selection, and expansion state come from App.
export default function MatchedEmailsPanel({
  groups,               // groups with emails (derived in App; empty groups excluded)
  expandedGroups,       // { [groupId]: boolean }
  onToggleGroup,        // (groupId) => void
  selectedIds,          // array of selected email ids (global)
  onToggleEmail,        // (id) => void
  onToggleSelectAllInGroup, // (group) => void
  approvedIds,          // array of approved email ids
}) {
  return (
    <div className="matched-emails-container" id="matched-emails-panel">
      {groups.length > 0 ? (
        groups.map(group => (
          <div key={group.id} className="matched-group">
            {/* Group header — a real button so it is keyboard-operable (B5).
                Inner elements are spans (button content must be phrasing). */}
            <button
              type="button"
              className="matched-group-header"
              onClick={() => onToggleGroup(group.id)}
              aria-expanded={!!expandedGroups[group.id]}
            >
              <span className="matched-group-left">
                <span className="matched-group-id">{group.id}</span>
                <span className="matched-group-name">{group.name}</span>
              </span>
              <span className="matched-group-right">
                <span className="matched-group-count">
                  {group.emails.length} email{group.emails.length !== 1 ? 's' : ''}
                </span>
                <span className={`matched-group-triangle ${expandedGroups[group.id] ? 'expanded' : ''}`}>▼</span>
                <span className="matched-group-selection-count">
                  {group.emails.filter(e => selectedIds.includes(e.id)).length} SELECTED
                </span>
              </span>
            </button>

            {/* Expanded content: select-all sub-row + email items */}
            {expandedGroups[group.id] && (
              <>
                {/* V2: "Select all in this group" sub-row */}
                <div className="matched-group-select-all-row">
                  <input
                    type="checkbox"
                    className="matched-group-select-all"
                    checked={group.emails.every(e => selectedIds.includes(e.id))}
                    onChange={() => onToggleSelectAllInGroup(group)}
                  />
                  <span className="matched-group-select-all-label">Select all in this group</span>
                </div>

                {group.emails.map(email => (
                  <div key={email.id} className="matched-email-item">
                    <input
                      type="checkbox"
                      className="matched-email-checkbox"
                      checked={selectedIds.includes(email.id)}
                      onClick={(e) => e.stopPropagation()}
                      onChange={() => onToggleEmail(email.id)}
                    />
                    <span className="matched-email-sender" dir="auto">{email.sender}</span>
                    <span className="matched-email-subject" dir="auto">{email.subject}</span>
                    <span className="matched-email-confidence-pill">{email.confidence}%</span>
                    {approvedIds.includes(email.id) && (
                      <span className="matched-email-approved">✓ APPROVED</span>
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
  );
}
