// Delete confirmation dialog. Rendered by App when a destructive action is
// requested; `action` = { title, message, ids }.
export default function ConfirmDialog({ action, onCancel, onConfirm }) {
  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div
        className="confirm-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div id="confirm-dialog-title" className="confirm-title">
          {action.title}
        </div>
        <div className="confirm-message">{action.message}</div>
        <div className="confirm-actions">
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
