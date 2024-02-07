import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators} from "@angular/forms";
import { WilayahService } from 'src/app/private/services/master-data/wilayah.service';
import { Observable} from 'rxjs';
// import { catchError, debounceTime, distinctUntilChanged, switchMap, tap, map, filter } from 'rxjs/operators';
import { InformasiKlinikPayload } from "src/app/private/models/class-payload-api/manajemen-klinik/informasi-klinik.payload";
import { InformasiKlinikService } from 'src/app/private/services/manajemen-klinik/informasi-klinik.service';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/private/states/private-app.states'
import * as InformasiKlinikActions from 'src/app/private/states/manajemen-klinik/informasi-klinik/informasi-klinik.actions'
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { ActivatedRoute, Params} from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import {ValidateService} from 'src/app/private/services/validate/validateService'

export enum TipeAlamat {
	KTP = 'ktp',
	DOMISILI = 'domisili'
}

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {

	paramProvinsiKtp = { last_data: 0, get_data: 10, search: "" }
	paramKabupatenKtp = { last_data: 0, get_data: 10, search: "" }
	paramKecamatanKtp = { last_data: 0, get_data: 10, search: "" }
	paramDesaKtp = { last_data: 0, get_data: 10, search: "" }
	paramZone= { last_data: 0, get_data: 10, search: "" }

	listProvinsiKtp: Array<any> = []
	listKabupatenKtp: Array<any> = []
	listKecamatanKtp: Array<any> = []
	listDesaKtp: Array<any> = []
	listZone: Array<any> = []
	idProvinsiKtp: any = null
	idKabupatenKtp: any = null
	idKecamatanKtp: any = null
	idDesaKtp: any = null
	timeZone:any=null
	loadingSelectProv: boolean = false
	loadingSelectKab: boolean = false
	loadingSelectKec: boolean = false
	loadingSelectDes: boolean = false
	loadingSelectZone: boolean =false
	tipeAlamat = TipeAlamat

	formInput: FormGroup;
	fileToUpload: any;
	imageUrl: any;
	imageUrlTTD: any;
	imageUrlLogo:any;
	submitted: boolean = false
	getState: Observable<any>;
	errorMessage: any | null
	submitButton: boolean
	isLoadingButton: boolean
	isEdit: boolean
	infoKlinik: InformasiKlinikPayload = new InformasiKlinikPayload
	imgChangeEvtHeader: any = '';
	cropImgPreviewHeader: any = '';
	imgChangeEvtTTD: any = '';
	cropImgPreviewTTD: any = '';
	imgChangeEvtLogo: any = '';
	cropImgPreviewLogo: any = '';
	canvasRotation = 0;
	rotation?: number;
	translateH = 0;
	translateV = 0;
	scale = 1;
	aspectRatio = 4 / 3;
	showCropper = false;
	containWithinAspectRatio = false;
	transform: ImageTransform = {
		translateUnit: 'px'
	};
	loading = false;
	allowMoveImage = false;
	id_klinik=null
	// #######################################################################

	// suggestions$?: Observable<any>;
	// typeHeadProv$ = new Subject<string>();
	isLastZone=false
	isLastProv=false
	isLastKab=false
	isLastKec=false
	isLastDes=false
	constructor(
		public wilayahService: WilayahService,
		public fb: FormBuilder,
		private infoKlinikService:InformasiKlinikService,
		private store: Store<fromApp.PrivateAppState>,
		private activatedRoute: ActivatedRoute,
		private spinner : NgxSpinnerService,
		private validate:ValidateService,
	) {
		this.getState = this.store.select('manajemenKlinik_informasiKlinik');
	}

	ngOnInit(): void {
		this.getDetailKlinik()
		this.formInput = this.fb.group({
			alamat_klinik: [null, []],
			nama_pimpinan: [null, []],
			ppn: [0, [Validators.required]],

		})
		this.activatedRoute.params.subscribe((params: Params) => {
			if(params){
				this.id_klinik=params.id
			}
		})
		this.getState.subscribe((state) => {

			this.errorMessage = state.errorMessage
			this.submitButton = state.submitButton
			this.isLoadingButton = state.isLoadingButton
			if(this.isLoadingButton){
				this.spinner.show('spinner1')
			}else{
				this.spinner.hide('spinner1')
			}
			this.isEdit = state.isEdit
			this.infoKlinik = state.infoKlinik
			if (this.isEdit) {
				this.formInput.patchValue({
					alamat_klinik: this.infoKlinik.alamat_klinik,
					nama_pimpinan: this.infoKlinik.config_nama_pimpinan,
					ppn: this.infoKlinik.config_ppn
				})
				this.listProvinsiKtp = [{ id: this.infoKlinik.id_province, name: this.infoKlinik.provinsi }]
				this.idProvinsiKtp = this.infoKlinik.id_province
				this.listKabupatenKtp = [{ id: this.infoKlinik.id_regency, name: this.infoKlinik.kabupaten }]
				this.idKabupatenKtp = this.infoKlinik.id_regency
				this.listKecamatanKtp = [{ id: this.infoKlinik.id_district, name: this.infoKlinik.kecamatan }]
				this.idKecamatanKtp = this.infoKlinik.id_district
				this.listDesaKtp = [{ id: this.infoKlinik.id_village, name: this.infoKlinik.desa }]
				this.idDesaKtp = this.infoKlinik.id_village
				this.spinner.hide('spinner1')
				this.imageUrl=this.infoKlinik.image_header_url
				this.imageUrlTTD=this.infoKlinik.image_ttd_url
				this.imageUrlLogo=this.infoKlinik.image_logo_url
				this.timeZone=this.infoKlinik.config_time_zone
			}
		});
	}
	isNumber(e){
		return this.validate.Number(e)
	}
	onFileChangeHeader(event: any): void {
		var target = event.target || event.srcElement;
		if(target.value.length==0){
			this.cropImgPreviewHeader = ""
			this.imgChangeEvtHeader = ""
		}else{
			this.imgChangeEvtHeader = event;
			this.imageUrl = ""
		}
		
	}
	cropImgHeader(e: ImageCroppedEvent) {
		this.cropImgPreviewHeader = e.base64;
	}
	imgLoadHeader() {
		// display cropper tool
	}
	initCropperHeader() {
		// init cropper
	}

	imgFailedHeader() {
		// error msg
	}
	doneHeader() {
		this.imageUrl = this.cropImgPreviewHeader
		this.cropImgPreviewHeader = ""
		this.imgChangeEvtHeader = ""
	}
	doneTTD() {
		this.imageUrlTTD = this.cropImgPreviewTTD
		this.cropImgPreviewTTD = ""
		this.imgChangeEvtTTD = ""
	}
	onFileChangeTTD(event: any): void {
		var target = event.target || event.srcElement;
		if(target.value.length==0){
			this.cropImgPreviewTTD = ""
			this.imgChangeEvtTTD = ""
		}else{
			this.imgChangeEvtTTD = event;
			this.imageUrlTTD = ""
		}
	}
	cropImgTTD(e: ImageCroppedEvent) {
		this.cropImgPreviewTTD = e.base64;
	}
	imgLoadTTD() {
		// display cropper tool
	}
	initCropperTTD() {
		// init cropper
	}

	imgFailedTTD() {
		// error msg
	}
	onFileChangeLogo(event: any): void {
		var target = event.target || event.srcElement;
		if(target.value.length==0){
			this.cropImgPreviewLogo = ""
			this.imgChangeEvtLogo = ""
		}else{
			this.imgChangeEvtLogo = event;
			this.imageUrlLogo = ""
		}
	}
	cropImgLogo(e: ImageCroppedEvent) {
		this.cropImgPreviewLogo = e.base64;
	}
	imgLoadLogo() {
		// display cropper tool
	}
	initCropperLogo() {
		// init cropper
	}

	imgFailedLogo() {
		// error msg
	}
	doneLogo() {
		this.imageUrlLogo = this.cropImgPreviewLogo
		this.cropImgPreviewLogo = ""
		this.imgChangeEvtLogo = ""
	}
	rotateLeft() {
		this.loading = true;
		setTimeout(() => { // Use timeout because rotating image is a heavy operation and will block the ui thread
			this.canvasRotation--;
			this.flipAfterRotate();
		});
	}

	rotateRight() {
		this.loading = true;
		setTimeout(() => {
			this.canvasRotation++;
			this.flipAfterRotate();
		});
	}

	moveLeft() {
		this.transform = {
			...this.transform,
			translateH: ++this.translateH
		};
	}

	moveRight() {
		this.transform = {
			...this.transform,
			translateH: --this.translateH
		};
	}

	moveTop() {
		this.transform = {
			...this.transform,
			translateV: ++this.translateV
		};
	}

	moveBottom() {
		this.transform = {
			...this.transform,
			translateV: --this.translateV
		};
	}

	private flipAfterRotate() {
		const flippedH = this.transform.flipH;
		const flippedV = this.transform.flipV;
		this.transform = {
			...this.transform,
			flipH: flippedV,
			flipV: flippedH
		};
		this.translateH = 0;
		this.translateV = 0;
	}

	flipHorizontal() {
		this.transform = {
			...this.transform,
			flipH: !this.transform.flipH
		};
	}

	flipVertical() {
		this.transform = {
			...this.transform,
			flipV: !this.transform.flipV
		};
	}

	resetImage() {
		this.scale = 1;
		this.rotation = 0;
		this.canvasRotation = 0;
		this.transform = {
			translateUnit: 'px'
		};
	}

	zoomOut() {
		this.scale -= .1;
		this.transform = {
			...this.transform,
			scale: this.scale
		};
	}

	zoomIn() {
		this.scale += .1;
		this.transform = {
			...this.transform,
			scale: this.scale
		};
	}


	getDetailKlinik() {
		this.spinner.show('spinner1')
		this.store.dispatch(InformasiKlinikActions.getByIdInitial())
	}

	submitForm() {
		this.submitted = false
		setTimeout(() => { this.submitted = true }, 200)
		
		if((this.formInput.value.nama_pimpinan==""||this.formInput.value.ppn||this.timeZone==null)
		||(this.imageUrl==""&&this.imgChangeEvtHeader!="")||(this.imageUrlLogo==""&&this.imgChangeEvtLogo!="")||(this.imageUrlTTD==""&&this.imgChangeEvtTTD!="")){
			return
		}else{
			

			let payload = new InformasiKlinikPayload
			payload.id_province = String(this.idProvinsiKtp)
			payload.id_regency = String(this.idKabupatenKtp)
			payload.id_district = String(this.idKecamatanKtp)
			payload.id_village = String(this.idDesaKtp)
			payload.alamat_klinik = this.formInput.value.alamat_klinik
			payload.image_header = this.imageUrl
			payload.config_ppn = this.formInput.value.ppn
			payload.config_nama_pimpinan = this.formInput.value.nama_pimpinan
			payload.image_ttd = this.imageUrlTTD
			payload.image_logo=this.imageUrlLogo
			payload.config_time_zone=this.timeZone
			console.log(payload)
			this.store.dispatch(InformasiKlinikActions.updateInitial({ payload: payload }))
		
		}
	}
	handleFileInputHeader(file: any) {
		// this.fileToUpload = file.target.files.item(0);
		this.imgChangeEvtHeader = file;
		this.imageUrl = ""
		//Show image preview
		// let reader = new FileReader();
		// reader.onload = (event: any) => {
		// 	this.imageUrl = event.target.result;
		// }
		// reader.readAsDataURL(this.fileToUpload);
	}
	handleFileInputLogo(file: any) {
		// this.fileToUpload = file.target.files.item(0);
		this.imgChangeEvtLogo = file;
		this.imageUrlLogo = ""
		//Show image preview
		// let reader = new FileReader();
		// reader.onload = (event: any) => {
		// 	this.imageUrl = event.target.result;
		// }
		// reader.readAsDataURL(this.fileToUpload);
	}
	handleFileInputTTD(file: any) {
		// this.fileToUpload = file.target.files.item(0);
		this.imgChangeEvtTTD = file;
		this.imageUrlTTD = ""
		//Show image preview
		// let reader = new FileReader();
		// reader.onload = (event: any) => {
		// 	this.imageUrl = event.target.result;
		// }
		// reader.readAsDataURL(this.fileToUpload);
	}
	prosesSelectZone(event: any, aksi: string) {
		
		if (aksi == 'search') {
			this.paramZone.search = event.term
			if(this.paramZone.search==""||this.paramZone.search.length>=3){
			this.listZone=[]
			this.paramZone.last_data=0
			this.isLastZone=false
			}else{
				this.isLastZone=true
			}
		}
		if(aksi=="open"||aksi=="clear"){
			this.paramZone.search=""
			this.listZone=[]
			this.paramZone.last_data=0
			this.isLastZone=false
		}
		if(aksi=="last_page"){
			if(!this.isLastZone)
			this.paramZone.last_data+=10
		}
		if(!this.isLastZone){
			this.loadingSelectZone = true
			this.infoKlinikService.getTimeZone().subscribe(res => {
				
				if(res.response.length==0){
					this.isLastZone=true
				}else{
					if(res.response.length<10){
						res.response.map(val=>{
							this.listZone.push(val)
						})
						this.isLastZone=true
					}else{
						res.response.map(val=>{
							this.listZone.push(val)
						})
					}
					this.loadingSelectZone = false
				}
			})
		}
	}

	
	prosesSelectProvinsi(event: any, aksi: string, tipe: any) {
		if (aksi == 'search') {
			this.paramProvinsiKtp.search = event.term
			if(this.paramProvinsiKtp.search==""||this.paramProvinsiKtp.search.length>=3){
			this.listProvinsiKtp=[]
			this.listKabupatenKtp=[]
			this.listKecamatanKtp=[]
			this.listDesaKtp=[]
			this.paramProvinsiKtp.last_data=0
			this.paramKabupatenKtp.last_data=0
			this.paramKecamatanKtp.last_data=0
			this.paramDesaKtp.last_data=0
			this.isLastProv=false
			this.isLastKab=false
			this.isLastKec=false
			this.isLastDes=false
			}else{
			this.isLastProv=true
			}
		}
		if(aksi=="open"||aksi=="clear"){
			this.paramProvinsiKtp.search=""
			this.listProvinsiKtp=[]
			this.listKabupatenKtp=[]
			this.listKecamatanKtp=[]
			this.listDesaKtp=[]
			this.paramProvinsiKtp.last_data=0
			this.paramKabupatenKtp.last_data=0
			this.paramKecamatanKtp.last_data=0
			this.paramDesaKtp.last_data=0
			this.isLastProv=false
			this.isLastKab=false
			this.isLastKec=false
			this.isLastDes=false
		}
		if(aksi=="last_page"){
			if(!this.isLastProv)
			this.paramProvinsiKtp.last_data+=10
		}
		if(!this.isLastProv){
		this.loadingSelectProv = true
		this.wilayahService.prosesSelectOptionProvinsi(this.paramProvinsiKtp, aksi)
			.subscribe(res => {
				this.loadingSelectProv = false
				if(res.response.length==0){
					this.isLastProv=true
				}else{
					if(res.response.length<10){
						if(aksi=="search")this.listProvinsiKtp=[]
						res.response.map(val=>{
							let i=this.listProvinsiKtp.findIndex(x=>x.id==val.id)
							if(i==-1)
							this.listProvinsiKtp.push(val)
						})
						this.isLastProv=true
					}else{
						res.response.map(val=>{
							let i=this.listProvinsiKtp.findIndex(x=>x.id==val.id)
							if(i==-1)
							this.listProvinsiKtp.push(val)
						})
					}
				}
			})
		}
	}
	prosesSelectKabupaten(event: any, aksi: string, tipe: any) {
		if (aksi == 'search') {
			this.paramKabupatenKtp.search = event.term
			if(this.paramKabupatenKtp.search==""||this.paramKabupatenKtp.search.length>0){
			this.listKabupatenKtp=[]
			this.listKecamatanKtp=[]
			this.listDesaKtp=[]
			this.paramKabupatenKtp.last_data=0
			this.paramKecamatanKtp.last_data=0
			this.paramDesaKtp.last_data=0
			this.isLastKab=false
			this.isLastKec=false
			this.isLastDes=false
			}else{
			this.isLastKab=true
			}
		}
		if(aksi=="open"||aksi=="clear"){
			this.paramKabupatenKtp.search=""
			this.listKabupatenKtp=[]
			this.listKecamatanKtp=[]
			this.listDesaKtp=[]
			this.paramKabupatenKtp.last_data=0
			this.paramKecamatanKtp.last_data=0
			this.paramDesaKtp.last_data=0
			this.isLastKab=false
			this.isLastKec=false
			this.isLastDes=false
		}
		if(aksi=="last_page"){
			if(!this.isLastKab)
			this.paramKabupatenKtp.last_data+=10
		}
		if(!this.isLastKab){
			this.loadingSelectKab = true;
			this.wilayahService.prosesSelectOptionKabupaten(this.paramKabupatenKtp, aksi, this.idProvinsiKtp)
				.subscribe(res => {
					
					if(res.response.length==0){
						this.isLastKab=true
					}else{
						if(res.response.length<10){
							if(aksi=="search")this.listKabupatenKtp=[]
							res.response.map(val=>{
								let i=this.listKabupatenKtp.findIndex(x=>x.id==val.id)
								if(i==-1)
								this.listKabupatenKtp.push(val)
							})
							this.isLastKab=true
						}else{
							res.response.map(val=>{
								let i=this.listKabupatenKtp.findIndex(x=>x.id==val.id)
								if(i==-1)
								this.listKabupatenKtp.push(val)
							})
						}
						this.loadingSelectKab = false;
					}
				})
		}
	}
	prosesSelectKecamatan(event: any, aksi: string, tipe: any) {
		if (aksi == 'search') {
			this.paramKecamatanKtp.search = event.term
			if(this.paramKecamatanKtp.search==""||this.paramKecamatanKtp.search.length>=3){
			this.listKecamatanKtp=[]
			this.listDesaKtp=[]
			this.paramKecamatanKtp.last_data=0
			this.paramDesaKtp.last_data=0
			this.isLastKec=false
			this.isLastDes=false
			}else{
				this.isLastKec=true
			}
		}
		if(aksi=="open"||aksi=="clear"){
			this.paramKecamatanKtp.search=""
			this.listKecamatanKtp=[]
			this.listDesaKtp=[]
			this.paramKecamatanKtp.last_data=0
			this.paramDesaKtp.last_data=0
			this.isLastKec=false
			this.isLastDes=false
		}
		if(aksi=="last_page"){
			if(!this.isLastKec)
			this.paramKecamatanKtp.last_data+=10
		}
		if(!this.isLastKec){
			this.loadingSelectKec = true
			this.wilayahService.prosesSelectOptionKecamatan(this.paramKecamatanKtp, aksi, this.idKabupatenKtp)
			.subscribe(res => {
				
				if(res.response.length==0){
					this.isLastKec=true
				}else{
					if(res.response.length<10){
						if(aksi=="search")this.listKecamatanKtp=[]
						res.response.map(val=>{
							let i=this.listKecamatanKtp.findIndex(x=>x.id==val.id)
							if(i==-1)
							this.listKecamatanKtp.push(val)
						})
						this.isLastKec=true
					}else{
						res.response.map(val=>{
							let i=this.listKecamatanKtp.findIndex(x=>x.id==val.id)
							if(i==-1)
							this.listKecamatanKtp.push(val)
						})
					}
					this.loadingSelectKec = false
				}
			})
		}
	}
	prosesSelectDesa(event: any, aksi: string, tipe: any) {
		if (aksi == 'search') {
			this.paramDesaKtp.search = event.term
			if(this.paramDesaKtp.search==""||this.paramDesaKtp.search.length>=3){
			this.listDesaKtp=[]
			this.paramDesaKtp.last_data=0
			this.isLastDes=false
			}else{
				this.isLastDes=true
			}
		}
		if(aksi=="open"||aksi=="clear"){
			this.paramDesaKtp.search=""
			this.listDesaKtp=[]
			this.paramDesaKtp.last_data=0
			this.isLastDes=false
		}
		if(aksi=="last_page"){
			if(!this.isLastDes)
			this.paramDesaKtp.last_data+=10
		}
		if(!this.isLastDes){
			this.loadingSelectDes = true
			this.wilayahService.prosesSelectOptionDesa(this.paramDesaKtp, aksi, this.idKecamatanKtp)
			.subscribe(res => {
				this.loadingSelectDes = false
				if (res.response.length==0) {
					this.isLastDes=true
				}else{
					if(res.response.length<10){
						if(aksi=="search")this.listDesaKtp=[]
						res.response.map(val=>{
							let i=this.listDesaKtp.findIndex(x=>x.id==val.id)
							if(i==-1)
							this.listDesaKtp.push(val)
						})
						this.isLastDes=true
					}else{
						res.response.map(val=>{
							let i=this.listDesaKtp.findIndex(x=>x.id==val.id)
							if(i==-1)
							this.listDesaKtp.push(val)
						})
					}
				}
			})
		}
	}

	changeProvinsi(tipe: any) {
		if (tipe == this.tipeAlamat.KTP) {
			this.idKabupatenKtp = null
			this.idKecamatanKtp = null
			this.idDesaKtp = null
		}
	}
	changeKabupaten(tipe: any) {
		if (tipe == this.tipeAlamat.KTP) {
			this.idKecamatanKtp = null
			this.idDesaKtp = null
		}
	}
	changeKecamatan(tipe: any) {
		if (tipe == this.tipeAlamat.KTP) {
			this.idDesaKtp = null
		}
	}

	paramSelectOption(event: any, aksi: string, tipe: any, wilayah: string) {
		let param

		if (wilayah == 'provinsi' && tipe == this.tipeAlamat.KTP) {
			param = this.paramProvinsiKtp
		} else if (wilayah == 'kabupaten' && tipe == this.tipeAlamat.KTP) {
			param = this.paramKabupatenKtp
		} else if (wilayah == 'kecamatan' && tipe == this.tipeAlamat.KTP) {
			param = this.paramKecamatanKtp
		} else if (wilayah == 'desa' && tipe == this.tipeAlamat.KTP) {
			param = this.paramDesaKtp
		}

		if (aksi == 'search') {
			param.search = event.term
		}
		return param
	}

}
