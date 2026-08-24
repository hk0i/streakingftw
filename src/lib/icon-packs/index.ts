import type { Profile } from '../tally';
import type { IconOption, IconPack } from './types';
import { OVERWATCH_PACK } from './overwatch';

export type { IconOption, IconPack };

export const ICON_PACKS: IconPack[] = [OVERWATCH_PACK];

export function getPack(id: string): IconPack | undefined {
	return ICON_PACKS.find((pack) => pack.id === id);
}

export function resolveProfileIcons(profile: Profile): { role?: IconOption; rank?: IconOption } {
	const pack = profile.iconPackId ? getPack(profile.iconPackId) : undefined;
	if (!pack) return {};
	return {
		role: profile.roleId ? pack.roles.find((r) => r.id === profile.roleId) : undefined,
		rank: profile.rankId ? pack.ranks.find((r) => r.id === profile.rankId) : undefined
	};
}
