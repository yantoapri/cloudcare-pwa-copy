export class DataObatPayload {
  id_obat : string | null | undefined
  nama_obat : string | null | undefined
  komposisi : string | null | undefined
  kemasan_terkecil: string | null | undefined
  kemasan_terkecil_singkatan: string | null | undefined
  stok: number | null | undefined
  harga_jual: number | null | undefined
  harga_beli: number | null | undefined
  obat_kemasan : Array<ObatKemasan>
  batch:any
  expired_date:string | null | undefined
  no_sertifikat:number | null | undefined
}

export class ObatKemasan {
  id_obat_kemasan : string | null | undefined
  nama_kemasan : string | null | undefined
  nama_kemasan_singkatan : string | null | undefined
  target_kemasan : string | null | undefined
  target_qty : number | null | undefined
  kemasan_level : number | null | undefined
}
