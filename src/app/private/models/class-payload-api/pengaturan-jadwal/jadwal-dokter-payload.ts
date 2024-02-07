export class JadwalDokterPayload {
	id_jadwal_dokter: string | null | undefined
	id_akun_dokter: string | null | undefined
	id_ruang: string | null | undefined
	kategori_jadwal: string | null | undefined
	tgl_awal: string | null | undefined | Date
	repeat: string | null | undefined | Date
	repeat_type: string | null | undefined | Date
	repeat_value: string | null | undefined | Date
	repeat_on_week: Array<any>
	tgl_end_type: string | null | undefined | Date
	tgl_end_on: string | null | undefined | Date
	nama_dokter: string | null | undefined | Date
	nama_ruang: string | null | undefined | Date
	detail: Array<Detail>
}

export class Detail {
	id_jadwal_dokter_detail: string | null | undefined
	id_jadwal_sesi: string | null | undefined
	jam_mulai: string | null | undefined
	id_ruang: string | null | undefined
	jam_selesai: string | null | undefined
	nama_sesi: string | null | undefined
}
