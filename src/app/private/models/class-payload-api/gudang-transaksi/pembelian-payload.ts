export class fakturPayload {
    id_pembelian: string | null | undefined
    id_supplier: string | null | undefined
    nomor_faktur: string | null | undefined
    tgl_faktur: string | null | undefined
    tgl_diterima: string | null | undefined
    pembayaran: string | null | undefined
    jatuh_tempo: string | null | undefined
    ppn: string | null | undefined
    ppn_nilai: string | null | undefined
    detail: Array<obatPayload>
    alat_kesehatan: Array<AlatKesehatanPayload>
}

export class obatPayload {
    id_obat: string | null | undefined
    satuan: string | null | undefined
    satuan_qty: string | null | undefined
    satuan_harga: string | null | undefined
    jenis_diskon: string | null | undefined
    diskon_value: string | null | undefined
    tanggal_ed: string | null | undefined
    no_batch: string | null | undefined
    keterangan: string | null | undefined
}

export class AlatKesehatanPayload {
    id_alat_kesehatan: string | null | undefined
    satuan: string | null | undefined
    satuan_qty: string | null | undefined
    satuan_harga: string | null | undefined
    jenis_diskon: string | null | undefined
    diskon_value: string | null | undefined
    tanggal_ed: string | null | undefined
    no_batch: string | null | undefined
    keterangan: string | null | undefined
}

