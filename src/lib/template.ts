import type { Profile, Tally } from './tally';
import { resolveProfileIcons } from './icon-packs';

/**
 * Presentation layer over Tally. Starts as a pass-through of the four Tally fields;
 * a future token like `winrate` is added here as a formatted value (e.g. "66%"),
 * without changing deriveTally or Tally itself.
 */
export function toTokens(tally: Tally): Record<string, string | number> {
	return {
		wins: tally.wins,
		losses: tally.losses,
		ties: tally.ties,
		total: tally.total,
		profile_name: '',
		rank: ''
	};
}

export function toProfileTokens(tally: Tally, profile: Profile): Record<string, string | number> {
	return {
		...toTokens(tally),
		profile_name: profile.name,
		rank: resolveProfileIcons(profile).rank?.label ?? ''
	};
}

export function render(template: string, tokens: Record<string, string | number>): string {
	return template
		.replace(/\{(\w+)\}/g, (match, name: string) => (name in tokens ? String(tokens[name]) : match))
		.trim();
}

export type TokenKey = 'wins' | 'losses' | 'ties' | 'total' | 'profile_name' | 'rank';

export interface TokenReference {
	token: string;
	key: TokenKey;
}

export const TOKEN_REFERENCE: TokenReference[] = [
	{ token: '{wins}', key: 'wins' },
	{ token: '{losses}', key: 'losses' },
	{ token: '{ties}', key: 'ties' },
	{ token: '{total}', key: 'total' },
	{ token: '{profile_name}', key: 'profile_name' },
	{ token: '{rank}', key: 'rank' }
];
