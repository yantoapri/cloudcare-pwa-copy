export class AddObatPayload {
    id_obat: string | null | undefined
    satuan: string | null | undefined
    satuan_qty: string | null | undefined
    jenis_diskon: string | null | undefined
    diskon_value: string | null | undefined
}
export class AddAlatPayload {
    id_alat_kesehatan: string | null | undefined
    satuan: string | null | undefined
    satuan_qty: string | null | undefined
    jenis_diskon: string | null | undefined
    diskon_value: string | null | undefined
}
export class PenjualanPayload {
    jenis_pembayaran: string | null | undefined
    id_metode_bayar: string | null | undefined
    jumlah_pembayaran: number | null | undefined
}