
export class AntreanUmumPayload {
  id_pasien : string | null | undefined

  id_diagnosa_dokter_umum : string | null | undefined
  id_dokter_create : string | null | undefined
  id_dokter_update : string | null | undefined

  id_perawat_create : string | null | undefined
  id_perawat_update : string | null | undefined
  id_tindakan_perawat : string | null | undefined

  id_antrian : string | null | undefined
  catatan_khusus : string | null | undefined
  alergi : string | null | undefined
  hambatan : string | null | undefined
  keluhan : string | null | undefined
  sistole : string | null | undefined
  diastole : string | null | undefined
  pxfisik : string | null | undefined
  suhu : string | null | undefined
  hr : string | null | undefined
  status_hr : string | null | undefined
  rr : string | null | undefined
  keterangan_rr : string | null | undefined
  tb : string | null | undefined
  bb : string | null | undefined
  obyektif_dokter : string | null | undefined
  planning : string | null | undefined
  tindakan : string | null | undefined
  tindakan_medis_dokter:any
  resep_obat : string | null | undefined
  jm : number | null | undefined
  jt : number | null | undefined
  bhp : number | null | undefined
  biaya_dokter : number | null | undefined
  lain_lain : number | null | undefined
  assessment_manual : string | null | undefined
  assessment : Array<AssessmentPayload>
  tindakan_medis : Array<TindakanMedisPayload>
  surat: Array<any>
  kunjungan_terakhir : KunjunganTerakhir
  time_input: string | null | undefined
}

export class TindakanMedisPayload {
  id_tindakan_medis : string | null | undefined
  keterangan : string | null | undefined
  id_akun_pelaksana : string | null | undefined
}

export class AssessmentPayload {
  id_assesment : string | null | undefined
}

export class KunjunganTerakhir {
  tgl_antrian: string | null | undefined
  status_antrian: string | null | undefined
  perawat : Perawat
  dokter_umum : DokterUmum
}

export class Perawat {
  id_tindakan_perawat: string | null | undefined
  id_antrian: string | null | undefined
  catatan_khusus: string | null | undefined
  alergi: string | null | undefined
  hambatan: string | null | undefined
  keluhan: string | null | undefined
  sistole: string | null | undefined
  diastole: string | null | undefined
  pxfisik: string | null | undefined
  suhu: string | null | undefined
  hr: string | null | undefined
  status_hr: string | null | undefined
  rr: string | null | undefined
  keterangan_rr: string | null | undefined
  tb: string | null | undefined
  bb: string | null | undefined
  id_perawat_create: string | null | undefined
  id_perawat_update: string | null | undefined
}

export class DokterUmum {
  id_diagnosa_dokter_umum : string | null | undefined
  id_antrian : string | null | undefined
  obyektif_dokter : string | null | undefined
  planning : string | null | undefined
  tindakan : string | null | undefined
  resep_obat : string | null | undefined
  jm : string | null | undefined
  jt : string | null | undefined
  bhp : string | null | undefined
  biaya_dokter : string | null | undefined
  lain_lain : string | null | undefined
  created_at : string | null | undefined
  updated_at : string | null | undefined
  id_dokter_create : string | null | undefined
  id_dokter_update : string | null | undefined
  assessment : Array<Assessment>
  akun_dokter : AkunDokter
}

export class Assessment {
  id_assessment : string | null | undefined
  kode : string | null | undefined
  nama_en : string | null | undefined
  nama_id : string | null | undefined
}

export class AkunDokter {
  nama_lengkap : string | null | undefined
}
