import { Component, OnInit, ViewChild } from '@angular/core';
import { DATA_LEVEL, DATA_ROLE } from './data-json'
import { NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataTableDirective } from 'angular-datatables'
// import { Store } from '@ngrx/store';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal
  ) { }
  public dataLevel : any[]
  public dataRole : any[]
  public addCusForm: FormGroup;

  @ViewChild(DataTableDirective, {static: false}) datatableElement : any = DataTableDirective
  dtOptions: DataTables.Settings = {}

  ngOnInit(): void {
    this.dataLevel = DATA_LEVEL
    this.dataRole = DATA_ROLE

    this.addCusForm = this.fb.group({
      nama_role: ['', [Validators.required, Validators.pattern("[a-zA-Z]+([a-zA-Z ]+)*")] ],
      id_level : ["", [Validators.required] ]
    });
  }

  findLevelById(id : number) {
    let index = this.dataLevel.map((x)=>{ return x.id_level}).indexOf(id)
    return this.dataLevel[index].nama_level
  }

  FormModalOpen(content : any) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
  }

}
