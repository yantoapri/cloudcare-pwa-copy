export class PasienPayload {
  id_pasien : string | null | undefined
  no_reg_pasien : string | null | undefined
  id_klinik : string | null | undefined
  tanggal_daftar : number | null | undefined
  no_rm : string | null | undefined
  full_rm : string | null | undefined
  no_bpjs : string | null | undefined
  kdProvider_bpjs : string | null | undefined
  nmProvider_bpjs : string | null | undefined
  status_bpjs : string | null | undefined
  no_hp : string | null | undefined
  nik : string | null | undefined
  nama : string | null | undefined
  nama_panggilan : string | null | undefined
  tempat_lahir : string | null | undefined
  tgl_lahir : any | null | undefined
  jenis_kelamin : string | null | undefined
  golongan_darah : string | null | undefined
  agama : string | null | undefined
  status_perkawinan : string | null | undefined
  pekerjaan : string | null | undefined
  kewarganegaraan : string | null | undefined
  jenis_alamat : string | null | undefined
  status_input_pasien : string | null | undefined
  alergi : string | null | undefined
  catatan_khusus : string | null | undefined
  tinggi_badan : string | null | undefined
  berat_badan : string | null | undefined
  alamat : Alamat
  kode_phone:string |null|undefined
}

export class Alamat {
  ktp : AlamatKtp
  domisili : AlamatDomisili
}

export class AlamatKtp {
  id_pasien_alamat : string | null | undefined
  id_pasien : string | null | undefined
  jenis_alamat : string | null | undefined
  id_province : string | null | undefined
  id_regency : string | null | undefined
  id_district : string | null | undefined
  id_village : string | null | undefined
  alamat : string | null | undefined
  province : string | null | undefined
  regency : string | null | undefined
  district : string | null | undefined
  village : string | null | undefined
}

export class AlamatDomisili {
  id_pasien_alamat : string | null | undefined
  id_pasien : string | null | undefined
  jenis_alamat : string | null | undefined
  id_province : string | null | undefined
  id_regency : string | null | undefined
  id_district : string | null | undefined
  id_village : string | null | undefined
  alamat : string | null | undefined
  province : string | null | undefined
  regency : string | null | undefined
  district : string | null | undefined
  village : string | null | undefined
}
