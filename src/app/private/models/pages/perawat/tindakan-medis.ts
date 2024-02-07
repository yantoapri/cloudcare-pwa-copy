export class TindakanMedis {
  diagnosa_dokter : DiagnosaDokter
  perawat : Perawat
  kunjungan_terakhir : KunjunganTerakhir
}

export class DiagnosaDokter {
  bhp: string | null | undefined
  biaya_dokter: string | null | undefined
  created_at: string | null | undefined
  id_antrian: string | null | undefined
  id_diagnosa_dokter_umum: string | null | undefined
  id_dokter_create: string | null | undefined
  id_dokter_update: string | null | undefined
  jm: string | null | undefined
  jt: string | null | undefined
  lain_lain: string | null | undefined
  obyektif_dokter: string | null | undefined
  planning: string | null | undefined
  resep_obat: string | null | undefined
  tindakan: string | null | undefined
  assessment : Array<Assessment>
}

export class Perawat {
  alergi: string | null | undefined
  bb: string | null | undefined
  catatan_khusus: string | null | undefined
  created_at: string | null | undefined
  diastole: string | null | undefined
  hambatan: string | null | undefined
  hr: string | null | undefined
  id_antrian: string | null | undefined
  id_perawat_create: string | null | undefined
  id_perawat_update: string | null | undefined
  id_tindakan_perawat: string | null | undefined
  keluhan: string | null | undefined
  keterangan_rr: string | null | undefined
  pxfisik: string | null | undefined
  rr: string | null | undefined
  sistole: string | null | undefined
  status_hr: string | null | undefined
  suhu: string | null | undefined
  tb: string | null | undefined
}

export class Assessment {
  id_assessment : string | null | undefined
  nama_full : string | null | undefined
}

export class KunjunganTerakhir {
  tgl_antrian: string | null | undefined
  status_antrian: string | null | undefined
  perawat : Perawat
  diagnosa_dokter : DiagnosaDokter
}

export class PerawatKunjunganTerakhir {
  alergi: string | null | undefined
  bb: string | null | undefined
  catatan_khusus: string | null | undefined
  created_at: string | null | undefined
  diastole: string | null | undefined
  hambatan: string | null | undefined
  hr: string | null | undefined
  id_antrian: string | null | undefined
  id_perawat_create: string | null | undefined
  id_perawat_update: string | null | undefined
  id_tindakan_perawat: string | null | undefined
  keluhan: string | null | undefined
  keterangan_rr: string | null | undefined
  pxfisik: string | null | undefined
  rr: string | null | undefined
  sistole: string | null | undefined
  status_hr: string | null | undefined
  suhu: string | null | undefined
  tb: string | null | undefined
}

export class DiagnosaDokterKunjunganTerakhir {
  bhp: string | null | undefined
  biaya_dokter: string | null | undefined
  created_at: string | null | undefined
  id_antrian: string | null | undefined
  id_diagnosa_dokter_umum: string | null | undefined
  id_dokter_create: string | null | undefined
  id_dokter_update: string | null | undefined
  jm: string | null | undefined
  jt: string | null | undefined
  lain_lain: string | null | undefined
  obyektif_dokter: string | null | undefined
  planning: string | null | undefined
  resep_obat: string | null | undefined
  tindakan: string | null | undefined
  assessment : Array<Assessment>
}
