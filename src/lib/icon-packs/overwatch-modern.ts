import tank from '$lib/assets/icon-packs/overwatch/roles/tank.svg';
import damage from '$lib/assets/icon-packs/overwatch/roles/damage.svg';
import support from '$lib/assets/icon-packs/overwatch/roles/support.svg';
import flex from '$lib/assets/icon-packs/overwatch/roles/flex.svg';

import bronze from '$lib/assets/icon-packs/overwatch-modern/ranks/bronze.webp';
import silver from '$lib/assets/icon-packs/overwatch-modern/ranks/silver.webp';
import gold from '$lib/assets/icon-packs/overwatch-modern/ranks/gold.webp';
import platinum from '$lib/assets/icon-packs/overwatch-modern/ranks/platinum.webp';
import emerald from '$lib/assets/icon-packs/overwatch-modern/ranks/emerald.webp';
import diamond from '$lib/assets/icon-packs/overwatch-modern/ranks/diamond.webp';
import master from '$lib/assets/icon-packs/overwatch-modern/ranks/master.webp';
import grandmaster from '$lib/assets/icon-packs/overwatch-modern/ranks/grandmaster.webp';
import champion from '$lib/assets/icon-packs/overwatch-modern/ranks/champion.webp';

import type { IconPack } from './types';

// Champion has no gem-style badge of its own — Blizzard never redrew it past
// Grandmaster, so the game itself still shows the classic wing badge for it.
// Reusing that asset here isn't a placeholder; it's what's actually current.
export const OVERWATCH_MODERN_PACK: IconPack = {
	id: 'overwatch-modern',
	name: 'Overwatch (Current)',
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
