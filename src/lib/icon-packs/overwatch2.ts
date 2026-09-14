import tank from '$lib/assets/icon-packs/overwatch/roles/tank.svg';
import damage from '$lib/assets/icon-packs/overwatch/roles/damage.svg';
import support from '$lib/assets/icon-packs/overwatch/roles/support.svg';
import flex from '$lib/assets/icon-packs/overwatch/roles/flex.svg';

import bronze from '$lib/assets/icon-packs/overwatch2/ranks/bronze.webp';
import silver from '$lib/assets/icon-packs/overwatch2/ranks/silver.webp';
import gold from '$lib/assets/icon-packs/overwatch2/ranks/gold.webp';
import platinum from '$lib/assets/icon-packs/overwatch2/ranks/platinum.webp';
import emerald from '$lib/assets/icon-packs/overwatch2/ranks/emerald.webp';
import diamond from '$lib/assets/icon-packs/overwatch2/ranks/diamond.webp';
import master from '$lib/assets/icon-packs/overwatch2/ranks/master.webp';
import grandmaster from '$lib/assets/icon-packs/overwatch2/ranks/grandmaster.webp';
import champion from '$lib/assets/icon-packs/overwatch2/ranks/champion.webp';

import type { IconPack } from './types';

// This is the chunky faceted-gem badge style from Overwatch 2's 2022 launch —
// a distinct, no-longer-current art direction, not today's live look (that's
// the wing-style OVERWATCH_PACK; see the comment there). Kept as its own pack
// for players who want that specific era's badges.
//
// Champion has no gem-style badge of its own — Blizzard never redrew it — so
// this reuses the wing-style Champion asset from OVERWATCH_PACK.
export const OVERWATCH_2_PACK: IconPack = {
	id: 'overwatch2',
	name: 'Overwatch 2',
	roles: [
		{ id: 'tank', label: 'Tank', src: tank },
		{ id: 'damage', label: 'Damage', src: damage },
		{ id: 'support', label: 'Support', src: support },
		{ id: 'flex', label: 'Flex', src: flex }
	],
	ranks: [
		{ id: 'bronze', label: 'Bronze', src: bronze },
		{ id: 'silver', label: 'Silver', src: silver },
		{ id: 'gold', label: 'Gold', src: gold },
		{ id: 'platinum', label: 'Platinum', src: platinum },
		{ id: 'emerald', label: 'Emerald', src: emerald },
		{ id: 'diamond', label: 'Diamond', src: diamond },
		{ id: 'master', label: 'Master', src: master },
		{ id: 'grandmaster', label: 'Grandmaster', src: grandmaster },
		{ id: 'champion', label: 'Champion', src: champion }
	]
};
