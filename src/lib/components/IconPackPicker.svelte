<script lang="ts">
	import type { IconOption, IconPack } from '$lib/icon-packs/types';

	let {
		pack,
		roleId,
		rankId,
		onchange
	}: {
		pack: IconPack;
		roleId?: string;
		rankId?: string;
		onchange: (patch: { roleId?: string; rankId?: string }) => void;
	} = $props();

	function selectRole(option: IconOption) {
		onchange({ roleId: roleId === option.id ? undefined : option.id, rankId });
	}

	function selectRank(option: IconOption) {
		onchange({ roleId, rankId: rankId === option.id ? undefined : option.id });
	}
</script>

<div class="icon-picker">
	<div class="icon-group">
		{#each pack.roles as role (role.id)}
			<button
				type="button"
				class="icon-option role"
				class:selected={roleId === role.id}
				aria-pressed={roleId === role.id}
				aria-label={role.label}
				title={role.label}
				onclick={() => selectRole(role)}
			>
				<img src={role.src} alt={role.label} />
			</button>
		{/each}
	</div>
	<div class="icon-group">
		{#each pack.ranks as rank (rank.id)}
			<button
				type="button"
				class="icon-option rank"
				class:selected={rankId === rank.id}
				aria-pressed={rankId === rank.id}
				aria-label={rank.label}
				title={rank.label}
				onclick={() => selectRank(rank)}
			>
				<img src={rank.src} alt={rank.label} />
			</button>
		{/each}
	</div>
</div>

<style>
	.icon-picker {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.icon-group {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem;
	}

	.icon-option {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		padding: 0.25rem;
		border-radius: 50%;
		border: 2px solid transparent;
		cursor: pointer;
		box-sizing: border-box;
	}

	.icon-option img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	/* Role icons are solid black artwork, so they need a light chip to read against
	   the dark panel background; rank badges are already full-color/visible. */
	.icon-option.role {
		background: #e8edf2;
	}

	.icon-option.rank {
		background: #1a212b;
	}

	.icon-option.selected {
		border-color: #fcaf3e;
	}
</style>
