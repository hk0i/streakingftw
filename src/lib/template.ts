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
		total: tally.total
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
	return template.replace(/\{(\w+)\}/g, (match, name: string) =>
		name in tokens ? String(tokens[name]) : match
	);
}

export interface TokenReference {
	token: string;
	meaning: string;
}

export const TOKEN_REFERENCE: TokenReference[] = [
	{ token: '{wins}', meaning: 'Win count' },
	{ token: '{losses}', meaning: 'Loss count' },
	{ token: '{ties}', meaning: 'Tie count' },
	{ token: '{total}', meaning: 'Total games (wins + losses + ties)' },
	{ token: '{profile_name}', meaning: "Profile's name (only meaningful inside a profile's own template)" },
	{
		token: '{rank}',
		meaning: "Profile's selected rank badge label (e.g. \"Gold\"), empty if none selected"
	}
];
