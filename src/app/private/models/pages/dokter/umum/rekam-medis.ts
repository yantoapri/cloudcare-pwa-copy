export class RekamMedis {
  perawat : Perawat
  dokter_umum : DokterUmum
  tindakan_medis:any
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
