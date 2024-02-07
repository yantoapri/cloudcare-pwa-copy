export class User {
	nama: string | null | undefined
	key: string | null | undefined
	token: string | null | undefined
	id: number | null | undefined
	img: string | null | undefined
	username: string | null | undefined
	password: string | null | undefined
	fullname: string | null | undefined
	repo: Array<Repo>
	role: Role;
	plant: any | null | undefined
	menu_right: any | null | undefined
	menu: Array<any>
	sessi_id:string | null | undefined
	sessi_time:number | null | undefined
}

export enum Role {
	All = 'All',
	Admin = 'Admin',
	Demo = 'Demo',
	Doctor = 'Doctor',
	Patient = 'Patient',
}

export interface Repo {
	id_repo: number | null
	key_repo: string | null | undefined
	nama_repo: string | null | undefined
	url_repo: string | null | undefined
}
