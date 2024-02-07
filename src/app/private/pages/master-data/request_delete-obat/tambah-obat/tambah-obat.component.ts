import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: 'app-tambah-obat',
  templateUrl: './tambah-obat.component.html',
  styleUrls: ['./tambah-obat.component.sass']
})
export class TambahObatComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
  ) { }
  public formInput: FormGroup;
  ngOnInit(): void {
    this.formInput = this.formBuilder.group({
      nama_obat : ["", [Validators.required]],
      konversi_satuan : ["", []]
    })
  }

}
