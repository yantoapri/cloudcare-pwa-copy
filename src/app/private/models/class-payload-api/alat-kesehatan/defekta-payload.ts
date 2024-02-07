export class defektaAlatPayload {
    id_supplier: string
    alat_kesehatan: Array<AlatPayload>
}
export class AlatPayload {
    id_alat_kesehatan: string
    satuan: string
    satuan_qty: string
    satuan_harga: string
    jenis_diskon: string
    diskon_value: string
}

