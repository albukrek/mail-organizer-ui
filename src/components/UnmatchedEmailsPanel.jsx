import { useState } from 'react';

// Unmatched Emails Panel — prop-driven (data + selection owned by App.jsx).
// Visual layout unchanged from the verified version; only the data source
// and the delete actions are now wired to real state.

const LABEL_GROUPS = [
  { id: '001', name: 'Family' },
  { id: '002', name: 'Bills and Invoice' },
  { id: '003', name: 'Work' },
  { id: '005', name: 'Insurance' },
  { id: '007', name: 'Friends' },
  { id: '100', name: 'General' },
];

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
      {/* Header with controls */}
      <div className="unmatched-emails-header" style={{
        backgroundColor: '#0a0a0a',
        padding: '12px 16px',
        borderBottom: '1px solid #333',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        borderRadius: '6px 6px 0 0',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
        width: '100%',
        maxWidth: '100%'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          width: '100%'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flex: 1
          }}>
            <select
              className="toolbar-dropdown"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              style={{
                backgroundColor: '#1a1a1a',
                color: '#fff',
                border: '1px solid #333',
                borderRadius: '4px',
                padding: '8px 12px',
                fontSize: '12px',
                minWidth: '200px',
                maxWidth: '250px',
                height: 'auto'
              }}
            >
              <option value="">Select Label Group</option>
              {LABEL_GROUPS.map(group => (
                <option key={group.id} value={group.name}>{group.name}</option>
              ))}
            </select>
            <button
              className="btn toolbar-btn"
              style={{
                backgroundColor: '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '8px 16px',
                fontSize: '12px',
                cursor: 'pointer',
                height: 'auto'
              }}
            >
              Apply
            </button>
          </div>

          <div style={{
            display: 'flex',
            gap: '12px'
          }}>
            <button
              className="btn btn-danger"
              onClick={onDeleteAll}
              disabled={emails.length === 0}
              style={{
                backgroundColor: '#b02a20',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '10px 16px',
                fontSize: '12px',
                cursor: 'pointer',
                height: 'auto'
              }}
            >
              Delete All
            </button>

            <button
              className="btn btn-danger"
              onClick={onDeleteSelected}
              disabled={selectedCount === 0}
              style={{
                border: 'none',
                borderRadius: '4px',
                padding: '10px 16px',
                fontSize: '12px',
                height: 'auto',
                opacity: selectedCount === 0 ? 0.5 : 1,
                cursor: selectedCount === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              Delete Selected
            </button>
          </div>
        </div>
      </div>

      {/* Clear visual separator line */}
      <div style={{
        height: '1px',
        backgroundColor: '#333',
        margin: '0 16px',
        marginTop: '10px',
        marginBottom: '10px'
      }}></div>

      {/* Email list */}
      <div className="unmatched-emails-list" style={{
        backgroundColor: '#0a0a0a',
        padding: '12px 16px',
        maxHeight: '400px',
        overflowY: 'auto',
        borderRadius: '0 0 6px 6px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
        width: '100%',
        maxWidth: '100%'
      }}>
        {/* Select All checkbox row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 0',
          borderBottom: '1px solid #222',
          marginBottom: '10px'
        }}>
          <div style={{
            width: '16px',
            height: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <input
              type="checkbox"
              className="matched-group-select-all"
              checked={allVisibleSelected}
              onChange={() => onSetVisibleSelection(filteredEmails.map(e => e.id), allVisibleSelected)}
              style={{
                width: '12px',
                height: '12px',
                margin: '0',
                padding: '0'
              }}
            />
          </div>
          <span className="matched-group-name" style={{
            color: '#fff',
            fontSize: '12px',
            fontWeight: 'normal',
            marginLeft: '4px'
          }}>Select All</span>

          {selectedCount > 0 && (
            <span className="matched-group-selection-count" style={{
              color: '#8ec8ff',
              fontSize: '12px',
              fontWeight: 'normal',
              marginLeft: '16px'
            }}>
              {selectedCount} Selected
            </span>
          )}
        </div>

        {filteredEmails.length > 0 ? (
          filteredEmails.map(email => (
            <div key={email.id} className="matched-email-item" style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
              borderBottom: '1px solid #222',
              width: '100%'
            }}>
              {/* Checkbox column - aligned with Select All */}
              <div style={{
                width: '16px',
                height: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '8px'
              }}>
                <input
                  type="checkbox"
                  className="matched-email-checkbox"
                  checked={selectedIds.includes(email.id)}
                  onChange={() => onToggleEmail(email.id)}
                  style={{
                    width: '12px',
                    height: '12px',
                    margin: '0',
                    padding: '0'
                  }}
                />
              </div>

              {/* Sender column - fixed width */}
              <span className="matched-email-sender" style={{
                color: '#8ec8ff',
                fontSize: '12px',
                fontWeight: 'normal',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                minWidth: '180px',
                maxWidth: '180px',
                marginRight: '10px'
              }}>
                {email.sender}
              </span>

              {/* Subject column - fixed width */}
              <span className="matched-email-subject" style={{
                color: '#fff',
                fontSize: '12px',
                fontWeight: 'normal',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                minWidth: '220px',
                maxWidth: '220px'
              }}>
                {email.subject}
              </span>

              {/* Date column - positioned at the far right corner of the container */}
              <span className="matched-email-date" style={{
                color: '#aaa',
                fontSize: '12px',
                fontWeight: 'normal',
                marginLeft: 'auto',
                minWidth: '100px',
                maxWidth: '100px'
              }}>
                {email.date}
              </span>
            </div>
          ))
        ) : (
          <div className="unmatched-emails-empty" style={{
            color: '#aaa',
            fontSize: '12px',
            textAlign: 'center',
            padding: '20px'
          }}>
            {selectedFilter ? 'No unmatched emails match your filter' : 'No unmatched emails'}
          </div>
        )}
      </div>
    </>
  );
}

export default UnmatchedEmailsPanel;
