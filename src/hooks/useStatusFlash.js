import { useCallback, useEffect, useRef, useState } from 'react';

// Transient status message with auto-clear. A new flash cancels the previous
// timer; the pending timer is cleared on unmount so it never fires after
// the component that owns it is gone.
export function useStatusFlash(durationMs = 3000) {
  const [message, setMessage] = useState('');
  const timer = useRef(null);

  const flash = useCallback((msg) => {
    setMessage(msg);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(''), durationMs);
  }, [durationMs]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  return [message, flash];
}
