import * as fromTypeRole from './role-and-rights/type-role/type-role.reducers'
import * as fromRole from './role-and-rights/role/role.reducers'
import * as fromManajemenAkun from './manajemen-akun/akun/akun.reducers'

import * as manajemenMenu_repo from './manajemen-menu/repo/repo.reducers'
import * as manajemenMenu_repoService from './manajemen-menu/repo-service/repo-service.reducers'
import * as manajemenMenu_menu from './manajemen-menu/menu/menu.reducers'
import * as manajemenMenu_menuRight from './manajemen-menu/menu-right/menu-right.reducers'

import * as manajemenKlinik_masterPoli from './manajemen-klinik/master-poli/master-poli.reducers'
import * as manajemenKlinik_daftarKlinik from './manajemen-klinik/daftar-klinik/daftar-klinik.reducers'
import * as manajemenKlinik_daftatPoliklinik from './manajemen-klinik/daftar-poliklinik/daftar-poliklinik.reducers'
import * as manajemenKlinik_informasiKlinik from './manajemen-klinik/informasi-klinik/informasi-klinik.reducers'

import * as masterData_ruangDanJadwal_daftarRuang from './master-data/ruang-dan-jadwal/daftar-ruang/daftar-ruang.reducers'
import * as masterData_ruangDanJadwal_jadwalLibur from './master-data/ruang-dan-jadwal/jadwal-libur/jadwal-libur.reducers'
import * as masterData_ruangDanJadwal_jadwalSesi from './master-data/ruang-dan-jadwal/jadwal-sesi/jadwal-sesi.reducers'
import * as masterData_tindakan_tindakanMedisUmum from './master-data/tindakan/tindakan-medis-umum/tindakan-medis-umum.reducers'
import * as masterData_assessment from './master-data/assessment/assessment.reducers'
import * as masterData_supplier from './master-data/supplier/supplier.reducers'
import * as masterData_dataObat from './master-data/data-obat/data-obat.reducers'
import * as masterData_metodeBayar from './master-data/metode-bayar/metode-bayar.reducers'

import * as pasien_dataPasien from './pasien/data-pasien/pasien.reducers'
import * as perawat_prosesAntreanPerawat from './perawat/proses-antrean-perawat/proses-antrean-perawat.reducers'
import * as dokter_antrean_umum from './dokter/antrean/umum/antrean-umum.reducers'
import * as pengaturanJadwal_jadwalDokter from './pengaturan-jadwal/jadwal-dokter/jadwal-dokter.reducers'
import * as pengaturanJadwal_jadwalStaf from './pengaturan-jadwal/jadwal-staf/jadwal-staf.reducers'

import * as alat_kesehatan from './alat-kesehatan/alat-kesehatan.reducer'
import * as faktur_pembelian from './faktur-pembelian/faktur-pembelian.reducer'
import * as penjualan from './penjualan/penjualan.reducer'
import * as defekta_alat from './alat-kesehatan/defekta/defekta.reducer'
import * as defekta_obat from './defekta-obat/defekta.reducer'
import * as retur from './retur-penjualan/retur.reducer'
import * as retur_gudang from './retur-penjualan/retur.reducer'
import * as stok_obat from './stok/stok-obat/stok-obat.reducer'
import * as stok_alat from './stok/stok-alat/stok-alat.reducer'
import * as stok_opname from './stok-opname/stok-opname.reducer'
import * as resep from './resep/resep.reducer'
import * as konsolidasi from './konsolidasi-data/konsolidasi-data.reducer'
import * as biaya from './master-data/biaya/biaya.reducers'
export interface PrivateAppState {
	typeRole: fromTypeRole.State;
	roleAkun: fromRole.State;
	managemenAkun_akun: fromManajemenAkun.State;

	manajemenMenu_repo: manajemenMenu_repo.State;
	manajemenMenu_repoService: manajemenMenu_repoService.State;
	manajemenMenu_menu: manajemenMenu_menu.State;
	manajemenMenu_menuRight: manajemenMenu_menuRight.State;

	manajemenKlinik_masterPoli: manajemenKlinik_masterPoli.State;
	manajemenKlinik_daftarKlinik: manajemenKlinik_daftarKlinik.State;
	manajemenKlinik_daftatPoliklinik: manajemenKlinik_daftatPoliklinik.State;
	manajemenKlinik_informasiKlinik: manajemenKlinik_informasiKlinik.State;

	masterData_ruangDanJadwal_daftarRuang: masterData_ruangDanJadwal_daftarRuang.State;
	masterData_ruangDanJadwal_jadwalLibur: masterData_ruangDanJadwal_jadwalLibur.State;
	masterData_ruangDanJadwal_jadwalSesi: masterData_ruangDanJadwal_jadwalSesi.State;
	masterData_tindakan_tindakanMedisUmum: masterData_tindakan_tindakanMedisUmum.State;
	masterData_assessment: masterData_assessment.State;
	masterData_dataObat: masterData_dataObat.State;
	masterData_supplier: masterData_supplier.State;
	masterData_metodeBayar: masterData_metodeBayar.State;

	pasien_dataPasien: pasien_dataPasien.State;
	perawat_prosesAntreanPerawat: perawat_prosesAntreanPerawat.State;
	dokter_antrean_umum: dokter_antrean_umum.State;
	pengaturanJadwal_jadwalDokter: pengaturanJadwal_jadwalDokter.State;
	pengaturanJadwal_jadwalStaf: pengaturanJadwal_jadwalStaf.State;

	alat_kesehatan: alat_kesehatan.State;
	faktur_pembelian: faktur_pembelian.State;
	penjualan: penjualan.State;
	defekta_obat: defekta_obat.State
	defekta_alat: defekta_alat.State
	retur: retur.State
	retur_gudang: retur_gudang.State
	stok_obat: stok_obat.State
	stok_alat: stok_alat.State
	stok_opname: stok_opname.State
	resep: resep.State
	konsolidasi: konsolidasi.State
	biaya:biaya.State
}

