import { useState } from 'react';

// Unmatched emails data - matching the 12 unmatched emails shown in stats
const UNMATCHED_EMAILS = [
  {
    id: 'u1',
    sender: 'AliExpress <SERVICES01@ALIEXPRESS.COM>',
    subject: 'הזמנה מושלמת! ההזמנה שלך נשלחה',
    date: 'Jul 9, 2026',
    confidence: 0
  },
  {
    id: 'u2',
    sender: 'Amazon <noreply@amazon.com>',
    subject: 'Your Amazon order has shipped',
    date: 'Jul 8, 2026',
    confidence: 0
  },
  {
    id: 'u3',
    sender: 'Netflix <no-reply@netflix.com>',
    subject: 'Your Netflix subscription has been renewed',
    date: 'Jul 8, 2026',
    confidence: 0
  },
  {
    id: 'u4',
    sender: 'Spotify <no-reply@spotify.com>',
    subject: 'Your Spotify Premium subscription is active',
    date: 'Jul 7, 2026',
    confidence: 0
  },
  {
    id: 'u5',
    sender: 'PayPal <service@paypal.com>',
    subject: 'Payment received from John Doe',
    date: 'Jul 7, 2026',
    confidence: 0
  },
  {
    id: 'u6',
    sender: 'Uber <noreply@uber.com>',
    subject: 'Your ride was completed',
    date: 'Jul 6, 2026',
    confidence: 0
  },
  {
    id: 'u7',
    sender: 'Airbnb <no-reply@airbnb.com>',
    subject: 'Your stay in New York is confirmed',
    date: 'Jul 6, 2026',
    confidence: 0
  },
  {
    id: 'u8',
    sender: 'Walmart <noreply@walmart.com>',
    subject: 'Your order has been shipped',
    date: 'Jul 5, 2026',
    confidence: 0
  },
  {
    id: 'u9',
    sender: 'Target <noreply@target.com>',
    subject: 'Your Target order is ready for pickup',
    date: 'Jul 4, 2026',
    confidence: 0
  },
  {
    id: 'u10',
    sender: 'Best Buy <noreply@bestbuy.com>',
    subject: 'Your Best Buy order has shipped',
    date: 'Jul 4, 2026',
    confidence: 0
  },
  {
    id: 'u11',
    sender: 'eBay <noreply@ebay.com>',
    subject: 'Your eBay purchase has been shipped',
    date: 'Jul 3, 2026',
    confidence: 0
  },
  {
    id: 'u12',
    sender: 'Google <no-reply@google.com>',
    subject: 'Your Google Drive storage is full',
    date: 'Jul 2, 2026',
    confidence: 0
  }
];

const LABEL_GROUPS = [
  { id: '001', name: 'Family' },
  { id: '002', name: 'Bills and Invoice' },
  { id: '003', name: 'Work' },
  { id: '005', name: 'Insurance' },
  { id: '007', name: 'Friends' },
  { id: '100', name: 'General' },
];

function UnmatchedEmailsPanel() {
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  
  // Filter emails based on selected filter
  const filteredEmails = selectedFilter
    ? UNMATCHED_EMAILS.filter(email => 
        email.subject.toLowerCase().includes(selectedFilter.toLowerCase()) ||
        email.sender.toLowerCase().includes(selectedFilter.toLowerCase())
      )
    : UNMATCHED_EMAILS;

  // Toggle individual email selection
  const toggleEmailSelection = (emailId) => {
    setSelectedEmails(prev => 
      prev.includes(emailId)
        ? prev.filter(id => id !== emailId)
        : [...prev, emailId]
    );
  };

  // Toggle select all
  const toggleSelectAll = () => {
    if (selectedEmails.length === filteredEmails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(filteredEmails.map(email => email.id));
    }
  };

  // Delete selected emails
  const deleteSelectedEmails = () => {
    const emailsToDelete = UNMATCHED_EMAILS.filter(email => selectedEmails.includes(email.id));
    // In a real implementation, this would call an API
    console.log('Deleting selected emails:', emailsToDelete);
    setSelectedEmails([]);
  };

  // Delete all unmatched emails
  const deleteAllUnmatchedEmails = () => {
    // In a real implementation, this would call an API
    console.log('Deleting all unmatched emails');
    setSelectedEmails([]);
  };

  // Apply filter
  const handleFilterApply = () => {
    // In a real implementation, this would update the filter state
    console.log('Applying filter:', selectedFilter);
  };

  // Get count of selected emails
  const getSelectedCount = () => selectedEmails.length;

  return (
    <>
      {/* Header with controls only - no select all checkbox */}
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
        {/* Filter controls and action buttons */}
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
              onClick={handleFilterApply}
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
              onClick={deleteAllUnmatchedEmails}
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
            
            {getSelectedCount() > 0 && (
              <button 
                className="btn btn-danger"
                onClick={deleteSelectedEmails}
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
                Delete {getSelectedCount()} Selected
              </button>
            )}
            
            {getSelectedCount() === 0 && (
              <button 
                className="btn btn-danger"
                disabled={true}
                style={{
                  backgroundColor: '#444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '10px 16px',
                  fontSize: '12px',
                  cursor: 'not-allowed',
                  height: 'auto'
                }}
              >
                Delete Selected
              </button>
            )}
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

      {/* Email list with separate black background and matching styles */}
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
        {/* Select All checkbox positioned above individual email checkboxes */}
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
              checked={getSelectedCount() > 0 && getSelectedCount() === filteredEmails.length}
              onChange={toggleSelectAll}
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
          
          {getSelectedCount() > 0 && (
            <span className="matched-group-selection-count" style={{
              color: '#8ec8ff',
              fontSize: '12px',
              fontWeight: 'normal',
              marginLeft: '16px'
            }}>
              {getSelectedCount()} Selected
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
                  checked={selectedEmails.includes(email.id)}
                  onChange={() => toggleEmailSelection(email.id)}
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
            No unmatched emails match your filter
          </div>
        )}
      </div>
    </>
  );
}

export default UnmatchedEmailsPanel;