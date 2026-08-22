import { STORAGE_KEY, loadSession, type Session } from './tally';

/**
 * Subscribes to cross-view session changes via the native `storage` event —
 * fires in other tabs/views on the same origin when `wintracker:session` is written,
 * never in the tab that wrote it.
 * Returns an unsubscribe function.
 */
export function onSessionChange(callback: (session: Session) => void): () => void {
	function handleStorage(event: StorageEvent): void {
		if (event.key !== null && event.key !== STORAGE_KEY) return;
		callback(loadSession());
	}
	window.addEventListener('storage', handleStorage);
	return () => window.removeEventListener('storage', handleStorage);
}
