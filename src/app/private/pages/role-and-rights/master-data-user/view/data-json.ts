export interface interfaceLevel {
  id_level: number;
  nama_level : string;
}
export interface intefaceRole {
  nama_role : string;
  id_level : number;
}
export const DATA_LEVEL : interfaceLevel[] = [

  {
    id_level: 1,
    nama_level : 'SAP Cloudcare'
  },
  {
    id_level: 2,
    nama_level : 'Staf Cloudcare'
  },
  {
    id_level: 3,
    nama_level : 'Owner'
  },
  {
    id_level: 4,
    nama_level : 'Admin'
  },
  {
    id_level: 5,
    nama_level : 'Staf'
  },
  {
    id_level: 6,
    nama_level : 'Customer'
  },
]

export const DATA_ROLE : intefaceRole[] = [
  {
    nama_role : 'Super Admin Cloudcare',
    id_level: 1
  },
  {
    nama_role : 'Staf Admin Cloudcare',
    id_level: 2
  },
  {
    nama_role : 'Owner Klinik',
    id_level: 3
  },
  {
    nama_role : 'Admin Klinik',
    id_level:  4
  },
  {
    nama_role : 'Resepsionis',
    id_level: 5
  },
  {
    nama_role : 'Perawat',
    id_level: 5
  },
  {
    nama_role : 'Dokter',
    id_level: 5
  },
  {
    nama_role : 'Farmasi',
    id_level: 5
  },
  {
    nama_role : 'Gudang',
    id_level: 5
  },
  {
    nama_role : 'Fisioterapi',
    id_level: 5
  },
  {
    nama_role : 'Customer',
    id_level: 6
  },
]
