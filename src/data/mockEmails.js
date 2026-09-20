// Mock data for the Mail Organizer UI prototype.
// Single source of truth for all demo emails. When this UI is merged into
// the production app, this module is the one file that gets replaced by a
// real data fetch (see "Merge Notes" in the Obsidian plan).

export const LABEL_GROUPS = [
  { id: '001', name: 'Family' },
  { id: '002', name: 'Bills and Invoice' },
  { id: '003', name: 'Work' },
  { id: '005', name: 'Insurance' },
  { id: '007', name: 'Friends' },
  { id: '100', name: 'General' },
];

// 1 matched email — consistent with the stats row (13 total, 1 matched, 12 unmatched).
// Data per the approved reference (group 001 FAMILY, Edo ALBUKREK, 80% confidence).
const MATCHED_EMAILS = [
  {
    id: 'm1',
    kind: 'matched',
    sender: 'Edo ALBUKREK',
    subject: 'Test Email 2 - Work Project Update',
    date: 'Jul 9, 2026',
    confidence: 80,
    labelGroup: '001',
  },
];

// 12 unmatched emails (same data the panel already used).
const UNMATCHED_EMAILS = [
  {
    id: 'u1',
    kind: 'unmatched',
    sender: 'AliExpress <SERVICES01@ALIEXPRESS.COM>',
    subject: 'הזמנה מושלמת! ההזמנה שלך נשלחה',
    date: 'Jul 9, 2026',
    confidence: 0,
    labelGroup: null,
  },
  {
    id: 'u2',
    kind: 'unmatched',
    sender: 'Amazon <noreply@amazon.com>',
    subject: 'Your Amazon order has shipped',
    date: 'Jul 8, 2026',
    confidence: 0,
    labelGroup: null,
  },
  {
    id: 'u3',
    kind: 'unmatched',
    sender: 'Netflix <no-reply@netflix.com>',
    subject: 'Your Netflix subscription has been renewed',
    date: 'Jul 8, 2026',
    confidence: 0,
    labelGroup: null,
  },
  {
    id: 'u4',
    kind: 'unmatched',
    sender: 'Spotify <no-reply@spotify.com>',
    subject: 'Your Spotify Premium subscription is active',
    date: 'Jul 7, 2026',
    confidence: 0,
    labelGroup: null,
  },
  {
    id: 'u5',
    kind: 'unmatched',
    sender: 'PayPal <service@paypal.com>',
    subject: 'Payment received from John Doe',
    date: 'Jul 7, 2026',
    confidence: 0,
    labelGroup: null,
  },
  {
    id: 'u6',
    kind: 'unmatched',
    sender: 'Uber <noreply@uber.com>',
    subject: 'Your ride was completed',
    date: 'Jul 6, 2026',
    confidence: 0,
    labelGroup: null,
  },
  {
    id: 'u7',
    kind: 'unmatched',
    sender: 'Airbnb <no-reply@airbnb.com>',
    subject: 'Your stay in New York is confirmed',
    date: 'Jul 6, 2026',
    confidence: 0,
    labelGroup: null,
  },
  {
    id: 'u8',
    kind: 'unmatched',
    sender: 'Walmart <noreply@walmart.com>',
    subject: 'Your order has been shipped',
    date: 'Jul 5, 2026',
    confidence: 0,
    labelGroup: null,
  },
  {
    id: 'u9',
    kind: 'unmatched',
    sender: 'Target <noreply@target.com>',
    subject: 'Your Target order is ready for pickup',
    date: 'Jul 4, 2026',
    confidence: 0,
    labelGroup: null,
  },
  {
    id: 'u10',
    kind: 'unmatched',
    sender: 'Best Buy <noreply@bestbuy.com>',
    subject: 'Your Best Buy order has shipped',
    date: 'Jul 4, 2026',
    confidence: 0,
    labelGroup: null,
  },
  {
    id: 'u11',
    kind: 'unmatched',
    sender: 'eBay <noreply@ebay.com>',
    subject: 'Your eBay purchase has been shipped',
    date: 'Jul 3, 2026',
    confidence: 0,
    labelGroup: null,
  },
  {
    id: 'u12',
    kind: 'unmatched',
    sender: 'Google <no-reply@google.com>',
    subject: 'Your Google Drive storage is full',
    date: 'Jul 2, 2026',
    confidence: 0,
    labelGroup: null,
  },
];

export const MOCK_EMAILS = [...MATCHED_EMAILS, ...UNMATCHED_EMAILS];
