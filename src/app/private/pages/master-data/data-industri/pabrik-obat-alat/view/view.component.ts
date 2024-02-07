import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {

  @ViewChild('formContent') formContent : any;
  public formTambah: FormGroup;
  titleModal : string
  aksiModal : string

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formTambah = this.fb.group({})
  }

  FormModalOpen(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
    this.titleModal= "Form Tambah Pabrik Obat & Alat"
    this.aksiModal = 'add'
  }

}
