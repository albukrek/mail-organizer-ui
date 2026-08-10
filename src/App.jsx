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
  
  // State for group expansion/collapse
  const [expandedGroups, setExpandedGroups] = useState({});
  
  // State for email selection within groups
  const [selectedEmails, setSelectedEmails] = useState({});

  // Toggle group expansion/collapse
  const toggleGroup = (groupId) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };
  
  // Toggle individual email selection
  const toggleEmailSelection = (groupId, emailIndex) => {
    setSelectedEmails(prev => {
      const groupSelections = prev[groupId] || [];
      const newSelections = groupSelections.includes(emailIndex)
        ? groupSelections.filter(i => i !== emailIndex)
        : [...groupSelections, emailIndex];
      
      return {
        ...prev,
        [groupId]: newSelections
      };
    });
  };
  
  // Toggle select all in group
  const toggleSelectAllInGroup = (groupId) => {
    const group = LABEL_GROUPS.find(g => g.id === groupId);
    if (!group) return;
    
    // If all emails are selected, deselect all
    const currentSelections = selectedEmails[groupId] || [];
    if (currentSelections.length === group.count) {
      setSelectedEmails(prev => {
        const newSelections = { ...prev };
        delete newSelections[groupId];
        return newSelections;
      });
    } else {
      // Select all emails in group
      const allIndices = Array.from({ length: group.count }, (_, i) => i);
      setSelectedEmails(prev => ({
        ...prev,
        [groupId]: allIndices
      }));
    }
  };
  
  // Get count of selected emails in a group
  const getSelectedCount = (groupId) => {
    return selectedEmails[groupId]?.length || 0;
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

      {/* Email Management Toolbar */}
      {loaded && (
        <div className="toolbar-container">
          <div className="toolbar-group">
            <button className="btn toolbar-btn">Matched Emails</button>
            <button className="btn btn-danger toolbar-btn">Delete Selected</button>
            <button className="btn toolbar-btn">Approve Selected</button>
            <button className="btn toolbar-btn">Approve All</button>
          </div>
          <div className="toolbar-separator"></div>
          <div className="toolbar-group">
            <select className="toolbar-dropdown">
              <option value="">Select Label Group</option>
              <option value="001">001 - FAMILY</option>
              <option value="002">002 - BILLS AND INVOICE</option>
              <option value="003">003 - WORK</option>
              <option value="005">005 - INSURANCE</option>
              <option value="007">007 - FRIENDS</option>
              <option value="100">100 - GENERAL</option>
            </select>
            <button className="btn toolbar-btn">Apply</button>
          </div>
        </div>
      )}

      {/* Matched Emails Panel - only show if loaded */}
      {loaded && (
        <div className="matched-emails-container">
          {LABEL_GROUPS.map(group => (
            <div key={group.id} className="matched-group">
              {/* Group Header */}
              <div 
                className="matched-group-header" 
                onClick={() => toggleGroup(group.id)}
              >
                <input 
                  type="checkbox" 
                  className="matched-group-select-all"
                  checked={getSelectedCount(group.id) === group.count && group.count > 0}
                  onChange={() => toggleSelectAllInGroup(group.id)}
                  disabled={group.count === 0}
                />
                <span className="matched-group-id">{group.id}</span>
                <span className="matched-group-name">{group.name}</span>
                <span className="matched-group-count">{group.count} email{group.count !== 1 ? 's' : ''}</span>
                <span className="matched-group-selection-count">{getSelectedCount(group.id)} SELECTED</span>
                <span className={`matched-group-triangle ${expandedGroups[group.id] ? 'expanded' : ''}`}>▼</span>
              </div>
              
              {/* Email Items - only show if group is expanded */}
              {expandedGroups[group.id] && group.count > 0 && (
                <>
                  {Array.from({ length: group.count }, (_, i) => (
                    <div key={`${group.id}-email-${i}`} className="matched-email-item">
                      <input 
                        type="checkbox" 
                        className="matched-email-checkbox"
                        checked={getSelectedCount(group.id) > 0 && selectedEmails[group.id]?.includes(i)}
                        onChange={() => toggleEmailSelection(group.id, i)}
                      />
                      <span className="matched-email-sender">Edo ALBUKREK</span>
                      <span className="matched-email-subject">Test Email {i + 1} - {group.name} Project Update</span>
                      <div className="matched-email-progress">
                        <div className="matched-email-progress-bar" style={{ width: '80%' }}></div>
                      </div>
                      <span className="matched-email-progress-label">80%</span>
                      <span className="matched-email-date">Jul 9, 2026</span>
                    </div>
                  ))}
                </>
              )}
              
              {/* Empty group placeholder (not shown since we filter out groups with 0 count) */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
