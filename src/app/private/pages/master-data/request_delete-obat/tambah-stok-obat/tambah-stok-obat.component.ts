import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: 'app-tambah-stok-obat',
  templateUrl: './tambah-stok-obat.component.html',
  styleUrls: ['./tambah-stok-obat.component.sass']
})
export class TambahStokObatComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
  ) { }
  public formInput: FormGroup;
  ngOnInit(): void {
    this.formInput = this.formBuilder.group({
      nama_obat : ["", [Validators.required]],

    })
  }

}
