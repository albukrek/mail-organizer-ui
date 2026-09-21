import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// App styles load here (NOT in App.jsx) so the CSS cascade order matches the
// original: index.css (theme) -> app.css (app styles) -> component CSS.
// This keeps `.unmatched-panel-delete-btn` (in UnmatchedEmailsPanel.css) winning
// over `.btn` for padding, exactly as before the C2 split.
import './styles/app.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
