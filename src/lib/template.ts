import type { Tally } from './tally';

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

export function render(template: string, tokens: Record<string, string | number>): string {
	return template.replace(/\{(\w+)\}/g, (match, name: string) =>
		name in tokens ? String(tokens[name]) : match
	);
}
