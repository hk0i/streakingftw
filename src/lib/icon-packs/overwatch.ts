import tank from '$lib/assets/icon-packs/overwatch/roles/tank.svg';
import damage from '$lib/assets/icon-packs/overwatch/roles/damage.svg';
import support from '$lib/assets/icon-packs/overwatch/roles/support.svg';

import bronze from '$lib/assets/icon-packs/overwatch/ranks/bronze.webp';
import silver from '$lib/assets/icon-packs/overwatch/ranks/silver.webp';
import gold from '$lib/assets/icon-packs/overwatch/ranks/gold.webp';
import platinum from '$lib/assets/icon-packs/overwatch/ranks/platinum.webp';
import diamond from '$lib/assets/icon-packs/overwatch/ranks/diamond.webp';
import master from '$lib/assets/icon-packs/overwatch/ranks/master.webp';
import grandmaster from '$lib/assets/icon-packs/overwatch/ranks/grandmaster.webp';
import champion from '$lib/assets/icon-packs/overwatch/ranks/champion.webp';

import type { IconPack } from './types';

export const OVERWATCH_PACK: IconPack = {
	id: 'overwatch',
	name: 'Overwatch',
	roles: [
		{ id: 'tank', label: 'Tank', src: tank },
		{ id: 'damage', label: 'Damage', src: damage },
		{ id: 'support', label: 'Support', src: support }
	],
	ranks: [
		{ id: 'bronze', label: 'Bronze', src: bronze },
		{ id: 'silver', label: 'Silver', src: silver },
		{ id: 'gold', label: 'Gold', src: gold },
		{ id: 'platinum', label: 'Platinum', src: platinum },
		{ id: 'diamond', label: 'Diamond', src: diamond },
		{ id: 'master', label: 'Master', src: master },
		{ id: 'grandmaster', label: 'Grandmaster', src: grandmaster },
		{ id: 'champion', label: 'Champion', src: champion }
	]
};
