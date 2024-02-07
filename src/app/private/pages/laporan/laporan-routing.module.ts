import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardDokterModule } from './dashboard-dokter/dashboard-dokter.module';
import { DashboardPerawatModule } from './dashboard-perawat/dashboard-perawat.module';
import { DashboardResepsionisModule } from './dashboard-resepsionis/dashboard-resepsionis.module';
import { DashboardAdminKlinikModule } from './dashboard-admin-klinik/dashboard-admin-klinik.module';
import { DashboardAdminGudangModule } from './dashboard-gudang/dashboard-admin-gudang.module';
import { DashboardFisioterapiModule } from './dashboard-fisioterapi/dashboard-fisioterapi.module';
import { InventoriModule } from './inventori/inventori.module';
import { LabaModule } from './laba/laba.module';
import { LabaAlatModule } from './laba-alat/laba-alat.module';
import { MarginModule } from './margin/margin.module';
import { MarginAlatModule } from './margin-alat/margin-alat.module';
import { PembelianModule } from './pembelian-obat/pembelian.module';
import { PembelianAlatModule } from './pembelian-alat/pembelian.module';
import { PenjualanOmsetModule } from './penjualan_omset/penjualan-omset.module';
import { PenjualanOmsetAlatModule } from './penjualan_omset_alat/penjualan-omset.module';
import { ResepModule } from './resep/resep.module';
import { StatistikPasienModule } from './statistik-pasien/statistik-pasien.module';
import { DashboardFarmasiModule } from './dashboard-farmasi/dashboard-farmasi.module';
import { DashboardAdminPoliUmumModule } from './dashboard-admin-poli-umum/dashboard-admin-poliumum.module';

const routes: Routes = [
	{
		path: 'obat',
		loadChildren: () => import('./obat/obat.module').then((m) => m.ObatModule)
	},
	{
		path: 'alat',
		loadChildren: () => import('./alat/alat.module').then((m) => m.AlatModule)
	}, {
		path: 'stok',
		loadChildren: () => import('./stok/stok.module').then((m) => m.StokModule)
	}, {
		path: 'kunjungan-klinik',
		loadChildren: () => import('./kunjungan-klinik/kunjungan-klinik.module').then((m) => m.KunjunganKlinikModule)
	}, {
		path: 'kunjungan-fisioterapi',
		loadChildren: () => import('./kunjungan-fisioterapi/kunjungan-fisioterapi.module').then((m) => m.KunjunganFisioterapiModule)
	}, {
		path: 'kunjungan-bulanan',
		loadChildren: () => import('./kunjungan-bulanan/kunjungan-bulanan.module').then((m) => m.KunjunganBulananModule)
	}
	, {
		path: 'pemasukan-fisioterapi',
		loadChildren: () => import('./pemasukan-fisioterapi/pemasukan-fisioterapi.module').then((m) => m.PemasukanFisioterapiModule)
	}
	, {
		path: 'pemasukan-klinik',
		loadChildren: () => import('./pemasukan-klinik/pemasukan-klinik.module').then((m) => m.PemasukanKlinikModule)
	}
	, {
		path: 'statistik-pasien',
		loadChildren: () => import('./statistik-pasien/statistik-pasien.module').then((m) => StatistikPasienModule)
	},
	{
		path: 'dashboard-admin-klinik',
		loadChildren: () => import('./dashboard-admin-klinik/dashboard-admin-klinik.module').then((m) => DashboardAdminKlinikModule)
	},
	{
		path: 'dashboard-admin-poliumum',
		loadChildren: () => import('./dashboard-admin-poli-umum/dashboard-admin-poliumum.module').then((m) => DashboardAdminPoliUmumModule)
	},
	{
		path: 'dashboard-farmasi',
		loadChildren: () => import('./dashboard-farmasi/dashboard-farmasi.module').then((m) => DashboardFarmasiModule)
	},
	{
		path: 'dashboard-dokter',
		loadChildren: () => import('./dashboard-dokter/dashboard-dokter.module').then((m) => DashboardDokterModule)
	},
	{
		path: 'dashboard-perawat',
		loadChildren: () => import('./dashboard-perawat/dashboard-perawat.module').then((m) => DashboardPerawatModule)
	},
	{
		path: 'dashboard-fisioterapi',
		loadChildren: () => import('./dashboard-fisioterapi/dashboard-fisioterapi.module').then((m) => DashboardFisioterapiModule)
	},
	{
		path: 'dashboard-resepsionis',
		loadChildren: () => import('./dashboard-resepsionis/dashboard-resepsionis.module').then((m) => DashboardResepsionisModule)
	},
	{
		path: 'dashboard-gudang',
		loadChildren: () => import('./dashboard-gudang/dashboard-admin-gudang.module').then((m) => DashboardAdminGudangModule)
	},
	{
		path: 'penjualan-omset',
		loadChildren: () => import('./penjualan_omset/penjualan-omset.module').then((m) => PenjualanOmsetModule)
	},
	{
		path: 'laba',
		loadChildren: () => import('./laba/laba.module').then((m) => LabaModule)
	},
	{
		path: 'laba-alat',
		loadChildren: () => import('./laba-alat/laba-alat.module').then((m) => LabaAlatModule)
	},
	{
		path: 'penjualan-omset-alat',
		loadChildren: () => import('./penjualan_omset_alat/penjualan-omset.module').then((m) => PenjualanOmsetAlatModule)
	},
	{
		path: 'margin',
		loadChildren: () => import('./margin/margin.module').then((m) => MarginModule)
	},
	{
		path: 'margin-alat',
		loadChildren: () => import('./margin-alat/margin-alat.module').then((m) => MarginAlatModule)
	},
	{
		path: 'resep',
		loadChildren: () => import('./resep/resep.module').then((m) => ResepModule)
	},
	{
		path: 'pembelian-obat',
		loadChildren: () => import('./pembelian-obat/pembelian.module').then((m) => PembelianModule)
	},
	{
		path: 'pembelian-alat',
		loadChildren: () => import('./pembelian-alat/pembelian.module').then((m) => PembelianAlatModule)
	},
	{
		path: 'inventori',
		loadChildren: () => import('./inventori/inventori.module').then((m) => InventoriModule)
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LaporanRoutingModule { }
