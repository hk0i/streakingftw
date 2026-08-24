import { resolve } from '$app/paths';

export type ResultType = 'win' | 'loss' | 'tie';

export type ProfileIcons = {
	iconPackId?: string; // e.g. "overwatch"
	roleId?: string; // e.g. "tank" | "damage" | "support"
	rankId?: string; // e.g. "gold"
};

export type Profile = {
	id: string;
	name: string;
	template?: string; // undefined = use Session.template
} & ProfileIcons;

export interface Result {
	type: ResultType;
	at: string;
	profileId?: string; // undefined = generic/no-profile bucket
}

export interface Session {
	version: number;
	startedAt: string;
	results: Result[];
	template: string;
	profiles: Profile[];
	activeProfileId: string | null; // null = generic
}

export interface Tally {
	wins: number;
	losses: number;
	ties: number;
	total: number;
}

export const STORAGE_KEY = 'wintracker:session';
const CURRENT_VERSION = 3;
const DEFAULT_TEMPLATE = '{wins}W {losses}L {ties}T';

function emptySession(): Session {
	return {
		version: CURRENT_VERSION,
		startedAt: new Date().toISOString(),
		results: [],
		template: DEFAULT_TEMPLATE,
		profiles: [],
		activeProfileId: null
	};
}

function migrate(raw: any): Session {
	if (raw.version === 1) {
		return { ...raw, version: 2, profiles: [], activeProfileId: null };
	}
	if (raw.version === 2) {
		return { ...raw, version: 3 };
	}
	return raw as Session;
}

export function loadSession(): Session {
	const raw = localStorage.getItem(STORAGE_KEY);
	if (!raw) return emptySession();
	try {
		return migrate(JSON.parse(raw));
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
		if (result.type === 'win') tally.wins++;
		else if (result.type === 'loss') tally.losses++;
		else if (result.type === 'tie') tally.ties++;
		else {
			console.warn(`deriveTally: skipping result with unknown type "${result.type}"`, result);
			continue;
		}
		tally.total++;
	}
	return tally;
}

export function addResult(type: ResultType): Session {
	const session = loadSession();
	if (session.results.length === 0) {
		session.startedAt = new Date().toISOString();
	}
	session.results.push({
		type,
		at: new Date().toISOString(),
		profileId: session.activeProfileId ?? undefined
	});
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
	const previous = loadSession();
	const session: Session = {
		...emptySession(),
		profiles: previous.profiles,
		activeProfileId: previous.activeProfileId
	};
	saveSession(session);
	return session;
}

export function setTemplate(template: string): Session {
	const session = loadSession();
	session.template = template;
	saveSession(session);
	return session;
}

export function addProfile(name: string): Session {
	const trimmed = name.trim();
	const session = loadSession();
	if (!trimmed) return session;
	session.profiles.push({ id: crypto.randomUUID(), name: trimmed });
	saveSession(session);
	return session;
}

export function renameProfile(id: string, name: string): Session {
	const trimmed = name.trim();
	const session = loadSession();
	if (!trimmed) return session;
	const profile = session.profiles.find((p) => p.id === id);
	if (!profile) return session;
	profile.name = trimmed;
	saveSession(session);
	return session;
}

export function deleteProfile(id: string): Session {
	const session = loadSession();
	session.profiles = session.profiles.filter((p) => p.id !== id);
	if (session.activeProfileId === id) {
		session.activeProfileId = null;
	}
	saveSession(session);
	return session;
}

export function setActiveProfile(id: string | null): Session {
	const session = loadSession();
	session.activeProfileId = id;
	saveSession(session);
	return session;
}

export function setProfileTemplateOverride(id: string, template: string | undefined): Session {
	const session = loadSession();
	const profile = session.profiles.find((p) => p.id === id);
	if (!profile) return session;
	profile.template = template;
	saveSession(session);
	return session;
}

export function setProfileIcons(id: string, patch: ProfileIcons): Session {
	const session = loadSession();
	const profile = session.profiles.find((p) => p.id === id);
	if (!profile) return session;
	profile.iconPackId = patch.iconPackId;
	profile.roleId = patch.roleId;
	profile.rankId = patch.rankId;
	saveSession(session);
	return session;
}

export function buildOverlayUrl(profileIds: string[]): string {
	const url = new URL(resolve('/overlay'), window.location.origin);
	if (profileIds.length > 0) {
		url.searchParams.set('profile', profileIds.join(','));
	}
	return url.toString();
}
