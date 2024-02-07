export class ReturGudang{
    "id_pembelian": string | null | undefined
    "alasan_retur": string | null | undefined
    "obat": Array<Obat>
    "alat_kesehatan":Array<Alat>
}

export class Obat{
    "id_pembelian_detail": string | null | undefined
    "satuan_qty": string | null | undefined
}

export class Alat{
    "id_pembelian_alat_kesehatan": string | null | undefined
    "satuan_qty": string | null | undefined
}