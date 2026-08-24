export interface IconOption {
	id: string;
	label: string;
	src: string;
}

export interface IconPack {
	id: string;
	name: string;
	roles: IconOption[];
	ranks: IconOption[];
}
