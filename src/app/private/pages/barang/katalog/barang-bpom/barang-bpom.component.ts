import { Component, OnInit } from '@angular/core';
import { CurrencyMaskInputMode } from 'ngx-currency';
import { FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-barang-bpom',
  templateUrl: './barang-bpom.component.html',
  styleUrls: ['./barang-bpom.component.sass']
})
export class BarangBpomComponent implements OnInit {

  optionsCur = {
    prefix: '',
    align: 'left',
    thousands: '.',
    precision: '0',
    inputMode: CurrencyMaskInputMode.NATURAL,
  };
  formInput: FormGroup;

  constructor(
    private fb : FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formInput = this.fb.group({
      checkbox_harga_pajak_beli : [1, []]
    })
  }

}
