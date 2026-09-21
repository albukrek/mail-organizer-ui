import { useState } from 'react';
import gmailLogo from '/gmail_logo.png';
import StatsRow from './components/StatsRow.jsx';
import Toolbar from './components/Toolbar.jsx';
import MatchedEmailsPanel from './components/MatchedEmailsPanel.jsx';
import UnmatchedEmailsPanel from './components/UnmatchedEmailsPanel.jsx';
import ConfirmDialog from './components/ConfirmDialog.jsx';
import { useStatusFlash } from './hooks/useStatusFlash.js';
import { LABEL_GROUPS, MOCK_EMAILS } from './data/mockEmails.js';

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

  // Transient status message (auto-clears; timer cleaned up on unmount)
  const [statusFlash, flash] = useStatusFlash();

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
          <button type="button" className="btn" onClick={() => setLoaded(true)}>
            Load Data
          </button>
        </div>
      )}

      {loaded && (
        <>
          {/* Status Bar */}
          <div className="status-bar">
            <span className="status-text">
              {statusFlash
                ? statusFlash
                : `Loaded ${emails.length} emails — ${matchedEmails.length} matched, ${unmatchedEmails.length} unmatched`}
            </span>
            <button type="button" className="btn" onClick={() => setLoaded(false)}>
              Load Data
            </button>
          </div>

          <StatsRow
            total={emails.length}
            matched={matchedEmails.length}
            unmatched={unmatchedEmails.length}
            labelGroups={LABEL_GROUPS.length}
          />

          {/* Email Management Toolbar */}
          <Toolbar
            selectedCount={selectedIds.length}
            onScrollMatched={scrollMatchedPanel}
            onRequestDeleteSelected={requestDeleteSelected}
            onApproveSelected={() => approve(selectedIds)}
            onApproveAll={() => approve(emails.map(e => e.id))}
            label={toolbarLabel}
            onLabelChange={setToolbarLabel}
            onApply={applyLabel}
          />

          {/* Matched Emails Panel */}
          <MatchedEmailsPanel
            groups={groupsWithEmails}
            expandedGroups={expandedGroups}
            onToggleGroup={toggleGroup}
            selectedIds={selectedIds}
            onToggleEmail={toggleEmail}
            onToggleSelectAllInGroup={toggleSelectAllInGroup}
            approvedIds={approvedIds}
          />

          {/* Unmatched Emails Panel */}
          <div className="unmatched-emails-container">
            <UnmatchedEmailsPanel
              emails={unmatchedEmails}
              selectedIds={selectedIds}
              onToggleEmail={toggleEmail}
              onSetVisibleSelection={setUnmatchedVisibleSelection}
              onDeleteSelected={requestDeleteUnmatchedSelected}
              onDeleteAll={requestDeleteAllUnmatched}
            />
          </div>
        </>
      )}

      {/* Delete Confirmation Dialog */}
      {confirmAction && (
        <ConfirmDialog
          action={confirmAction}
          onCancel={() => setConfirmAction(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}

export default App;
