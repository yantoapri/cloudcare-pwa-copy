export class returPayload{
    id_penjualan: string | null | undefined
    retur_tujuan: string | null | undefined
    alasan_retur: string | null | undefined
    obat: Array<returObat>
    alat_kesehatan: Array<returAlat>
}
export class returObat{
    id_penjualan_detail: string | null | undefined
    satuan_qty: string | null | undefined
}
export class returAlat{
    id_penjualan_alat_kesehatan:string | null | undefined
    satuan_qty: string | null | undefined
}

export class returResep{
    id_penjualan_resep: string | null | undefined
    retur_tujuan: string | null | undefined
    alasan_retur: string | null | undefined
    obat:Array<returResepObat>
}

export class returResepObat{
    id_penjualan_resep_detail:string | null | undefined
    satuan_qty:string | null | undefined
}