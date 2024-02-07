export class ObatPayload {
	id_obat: string | null | undefined
	satuan: string | null | undefined
	satuan_qty: number | null | undefined
	jenis_diskon: string | null | undefined
	diskon_value: number | null | undefined
	signa_jumlah: number | null | undefined
	signa_hari: number | null | undefined
}

export class FinishPayload {
	jenis_pembayaran: string | null | undefined
	id_metode_bayar: string | null | undefined
	jumlah_pembayaran: string | null | undefined
}