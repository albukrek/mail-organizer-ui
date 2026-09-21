import { Mail, Trash2, Check } from 'lucide-react';
import { LABEL_GROUPS } from '../data/mockEmails.js';

// Email Management Toolbar (V1: icons + static "MATCHED EMAILS" section label).
// Pure presentational — all actions come in as props from App.
export default function Toolbar({
  selectedCount,
  onScrollMatched,
  onRequestDeleteSelected,
  onApproveSelected,
  onApproveAll,
  label,
  onLabelChange,
  onApply,
}) {
  return (
    <div className="toolbar-container">
      <div className="toolbar-group">
        {/* V1: static "MATCHED EMAILS" label with envelope icon
            (still scrolls to the matched panel on click — behavior preserved) */}
        <button
          type="button"
          className="toolbar-section-label"
          onClick={onScrollMatched}
          title="Scroll to matched emails"
        >
          <Mail size={16} />
          <span>Matched Emails</span>
        </button>
        <button
          type="button"
          className="btn btn-danger toolbar-btn"
          onClick={onRequestDeleteSelected}
          disabled={selectedCount === 0}
        >
          <Trash2 size={14} />
          <span>Delete Selected</span>
        </button>
        <button
          type="button"
          className="btn toolbar-btn"
          onClick={onApproveSelected}
          disabled={selectedCount === 0}
        >
          <Check size={14} />
          <span>Approve Selected</span>
        </button>
        <button type="button" className="btn toolbar-btn" onClick={onApproveAll}>
          <Check size={14} />
          <span>Approve All</span>
        </button>
      </div>
      <div className="toolbar-separator"></div>
      <div className="toolbar-group">
        <select
          className="toolbar-dropdown"
          value={label}
          onChange={(e) => onLabelChange(e.target.value)}
          aria-label="Select Label Group"
        >
          <option value="">Select Label Group</option>
          {LABEL_GROUPS.map(group => (
            <option key={group.id} value={group.id}>
              {group.id} - {group.name.toUpperCase()}
            </option>
          ))}
        </select>
        <button type="button" className="btn toolbar-btn" onClick={onApply}>
          Apply
        </button>
      </div>
    </div>
  );
}
