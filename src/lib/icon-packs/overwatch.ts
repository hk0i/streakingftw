import tank from '$lib/assets/icon-packs/overwatch/roles/tank.svg';
import damage from '$lib/assets/icon-packs/overwatch/roles/damage.svg';
import support from '$lib/assets/icon-packs/overwatch/roles/support.svg';
import flex from '$lib/assets/icon-packs/overwatch/roles/flex.svg';

import bronze from '$lib/assets/icon-packs/overwatch/ranks/bronze.webp';
import silver from '$lib/assets/icon-packs/overwatch/ranks/silver.webp';
import gold from '$lib/assets/icon-packs/overwatch/ranks/gold.webp';
import platinum from '$lib/assets/icon-packs/overwatch/ranks/platinum.webp';
import emerald from '$lib/assets/icon-packs/overwatch/ranks/emerald.webp';
import diamond from '$lib/assets/icon-packs/overwatch/ranks/diamond.webp';
import master from '$lib/assets/icon-packs/overwatch/ranks/master.webp';
import grandmaster from '$lib/assets/icon-packs/overwatch/ranks/grandmaster.webp';
import champion from '$lib/assets/icon-packs/overwatch/ranks/champion.webp';

import type { IconPack } from './types';

// The wing-style badge Blizzard has used since launch and still uses today —
// this is the live, current style, not a legacy one. See OVERWATCH_2_PACK
// (overwatch2.ts) for the separate, no-longer-current gem-style badges from
// Overwatch 2's 2022 launch.
export const OVERWATCH_PACK: IconPack = {
	id: 'overwatch',
	name: 'Overwatch',
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
		// No sourceable wing-style Emerald asset yet (it's a very new
		// division). Borrowing the Overwatch 2 pack's gem-style Emerald here
		// — rather than leaving the rank unselectable — means this pack
		// doesn't cost a user their Emerald badge while a matching wing badge
		// is unavailable. Swap for a real wing-style asset if one turns up.
		{ id: 'emerald', label: 'Emerald', src: emerald },
		{ id: 'diamond', label: 'Diamond', src: diamond },
		{ id: 'master', label: 'Master', src: master },
		{ id: 'grandmaster', label: 'Grandmaster', src: grandmaster },
		{ id: 'champion', label: 'Champion', src: champion }
	]
};
