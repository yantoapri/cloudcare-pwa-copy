import { Component, ElementRef,Input, ViewChild} from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import * as XLSX from 'xlsx';

type AOA = any[][];

@Component({
	selector: 'app-sheet',
	templateUrl: 'sheet.component.html',
})

export class SheetJSComponent {
	@Input() col: any[];
	@Input() key: any[];
	@Input() rowStart: number;
	@Input() fileUpload: any
	header: any[] = []
	dataTable: any[] = []
	data: AOA = [];
	@ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	dtOptions: DataTables.Settings = {};
	wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
	fileName: string = 'SheetJS.xlsx';
	file: any = null
	constructor(private elementRef: ElementRef) { }
	ngOnInit(): void {
		// this.dtOptions = this.showDataTables()
		this.onFileChange(this.fileUpload)
	}
	onFileChange(evt: any) {
		let key: any[] = ["nama_barang", "komposisi", "stok_awal", "harga_jual", "harga_beli"]
		this.dataTable=[]
		this.data=[]
		this.header=[]
		/* wire up file reader */
		const target: DataTransfer = <DataTransfer>(evt.target);
		if (target.files.length !== 1) throw new Error('Cannot use multiple files');
		const reader: FileReader = new FileReader();
		reader.onload = (e: any) => {
			/* read workbook */
			const bstr: string = e.target.result;
			const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

			/* grab first sheet */
			const wsname: string = wb.SheetNames[0];
			const ws: XLSX.WorkSheet = wb.Sheets[wsname];

			/* save data */
			this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
			this.data.map((val, index) => {
				if (index <=1) {
					this.data[0].map((value, i) => {
						if (this.col[i] != undefined) {
							this.header.push(value)
						}
					})

				}
				if (index >= this.rowStart) {
					if(this.data[index].length>0){
						let arr = {
							"nama_barang": this.data[index][this.col[0]] != undefined ? this.data[index][this.col[0]] : "",
							"spesifikasi": this.data[index][this.col[1]] != undefined ? this.data[index][this.col[1]] : "",
							"stok_awal": this.data[index][this.col[2]] != undefined ? this.data[index][this.col[2]] : "",
							"harga_jual": this.data[index][this.col[3]] != undefined ? this.data[index][this.col[3]] : "",
							"harga_beli": this.data[index][this.col[4]] != undefined ? this.data[index][this.col[4]] : "",
						}
						this.dataTable.push(arr)
					}
				}
			})

			this.setTable()
		};
		reader.readAsBinaryString(target.files[0]);
	}


	export(): void {
		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

		/* save to file */
		XLSX.writeFile(wb, this.fileName);
	}
	setTable() {
		this.dtOptions = this.showDataTables()
	}
	showDataTables() {
		return {
			pageLength: 10,
			ajax: (dataTablesParameters: any, callback: any) => {
				callback({
					draw: 1,
					recordsTotal: this.dataTable.length,
					recordsFiltered: this.dataTable.length,
					data: this.dataTable
				})
			},
			columns: [

				{
					data: 'nama_barang'
				},
				{
					data: 'spesifikasi'
				},
				{
					data: 'stok_awal'
				},
				{
					data: 'harga_jual'
				},
				{
					data: 'harga_beli'
				},

			],

		}
	}
	
}