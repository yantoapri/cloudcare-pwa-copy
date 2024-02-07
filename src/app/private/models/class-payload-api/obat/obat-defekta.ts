export class defektaObatPayload {
    id_supplier: string
    obat: Array<obatPayload>
}
export class obatPayload {
    id_obat: string
    satuan: string
    satuan_qty: string
    satuan_harga: string
    jenis_diskon: string
    diskon_value: string
}