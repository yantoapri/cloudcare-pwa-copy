export class AlatKesehatanPayload {
    id_alat_kesehatan: string | null | undefined
    nama_alat_kesehatan: string | null | undefined
    kemasan_terkecil: string | null | undefined
    kemasan_terkecil_singkatan: string | null | undefined
    komposisi:string | null | undefined
    stok: number | null | undefined
    harga_jual: number | null | undefined
    harga_beli: number | null | undefined
    alat_kesehatan_kemasan: Array<KemasanPayload>
    batch:any
}

export class KemasanPayload {
    id_alat_kesehatan_kemasan:string | null | undefined
    nama_kemasan: string | null | undefined
    nama_kemasan_singkatan: string | null | undefined
    target_kemasan: string | null | undefined
    target_qty: number
    kemasan_level: number
}