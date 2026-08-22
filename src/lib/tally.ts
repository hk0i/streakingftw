export type ResultType = 'win' | 'loss' | 'tie';

export interface Result {
	type: ResultType;
	at: string;
}

export interface Session {
	version: number;
	startedAt: string;
	results: Result[];
	template: string;
}

export interface Tally {
	wins: number;
	losses: number;
	ties: number;
	total: number;
}

const STORAGE_KEY = 'wintracker:session';
const CURRENT_VERSION = 1;
const DEFAULT_TEMPLATE = '{wins}W {losses}L {ties}T';

function emptySession(): Session {
	return {
		version: CURRENT_VERSION,
		startedAt: new Date().toISOString(),
		results: [],
		template: DEFAULT_TEMPLATE
	};
}

// Phase 1 only ever writes version 1, so this is a no-op passthrough today.
// A future schema bump adds a branch here rather than changing the read/write call sites.
function migrate(raw: Session): Session {
	return raw;
}

export function loadSession(): Session {
	const raw = localStorage.getItem(STORAGE_KEY);
	if (!raw) return emptySession();
	try {
		return migrate(JSON.parse(raw) as Session);
	} catch {
		return emptySession();
	}
}

function saveSession(session: Session): void {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function deriveTally(results: Result[]): Tally {
	const tally: Tally = { wins: 0, losses: 0, ties: 0, total: 0 };
	for (const result of results) {
		tally.total++;
		if (result.type === 'win') tally.wins++;
		else if (result.type === 'loss') tally.losses++;
		else if (result.type === 'tie') tally.ties++;
	}
	return tally;
}

export function addResult(type: ResultType): Session {
	const session = loadSession();
	if (session.results.length === 0) {
		session.startedAt = new Date().toISOString();
	}
	session.results.push({ type, at: new Date().toISOString() });
	saveSession(session);
	return session;
}

export function undo(): Session {
	const session = loadSession();
	session.results.pop();
	saveSession(session);
	return session;
}

export function newSession(): Session {
	const session = emptySession();
	saveSession(session);
	return session;
}
