export class historyStokOpnamePayload {
    tanggal: string
    total: string
}
export class StokOpnameAlatPayload {
    id_alat_kesehatan:string | null | undefined
    satuan:Array<alat>
}

export class StokOpnameObatPayload{
    id_obat: string | null | undefined
    satuan: Array<obat>
}
export class obat{
    id_obat_kemasan:string | null | undefined
    jumlah_stok:string | null | undefined
}
export class alat{
    id_alat_kesehatan_kemasan:string | null | undefined
    jumlah_stok:string | null | undefined
}
