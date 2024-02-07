import { Component, OnInit, Injectable, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LevelAkunService } from 'src/app/private/services/role-and-rights/level-akun.service'
import { TypeRoleService } from 'src/app/private/services/role-and-rights/type-role.service'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/private/states/private-app.states'
import * as RoleActions from 'src/app/private/states/role-and-rights/role/role.actions'
import { RolePayload } from 'src/app/private/models/class-payload-api/role-and-rights/role-payload'
import { RoleService } from 'src/app/private/services/role-and-rights/role.service'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
	selector: 'app-tambah',
	templateUrl: './tambah.component.html',
	styleUrls: ['./tambah.component.css'],

})
export class TambahComponent implements OnInit, AfterViewInit {

	getState: Observable<any>;
	public formTambah: FormGroup;
	role: RolePayload = new RolePayload
	isLoadingButton: boolean
	errorMessage: string
	reloadTable: boolean
	submitted: boolean = false
	dataMenu: any = []
	levelRole: any = []
	typeRole: any = []
	dataMenuRepair: Array<any> = []
	terapkan_akun: number = 1
	constructor(
		private fb: FormBuilder,
		private elementRef: ElementRef,
		private renderer: Renderer2,
		private spinner : NgxSpinnerService,
		private levelAkunService: LevelAkunService,
		private typeRoleService: TypeRoleService,
		private roleService: RoleService,
		private store: Store<fromApp.PrivateAppState>,
		private el: ElementRef
	) {
		this.getState = this.store.select('roleAkun')
	}

	ngOnInit(): void {
		this.spinner.show('spinner1')
		this.formTambah = this.fb.group({
			id_role_type: ["", [Validators.required]],
			nama_role: ['', [Validators.required, Validators.pattern("[a-zA-Z]+([a-zA-Z ]+)*")]],
			id_akun_level: ["", [Validators.required]]
		});
		this.loadLevelAkun()
		this.loadTypeRole()
		setTimeout(() => {
			this.spinner.hide('spinner1')
		}, 600);
		this.getState.subscribe((state) => {
			this.role = state.role
			this.isLoadingButton = state.isLoadingButton
			this.errorMessage = state.errorMessage
		})

	}
	submitForm() {
		this.submitted = false;
		setTimeout(() => {
			this.submitted = true;
		}, 300)
		if (this.formTambah.invalid) {
			for (const key of Object.keys(this.formTambah.controls)) {
				if (this.formTambah.controls[key].invalid) {
					const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
					invalidControl.focus()
					break;
				}
			}
			return
		}
		this.spinner.show('spinner1')
		Swal.fire({
			title: 'Terapkan Akun',
			html:
				'<div class="w100 mx-2 text-left"><input type="radio" checked value="1" name="eventOption" class="radio"> Ya</div>' +
				'<div class="w100 mx-2 text-left"><input type="radio" value="0" name="eventOption" class="radio"> Tidak</div>',
			focusConfirm: false,
			preConfirm: () => {
				return $("[name='eventOption']").val()
			},
			showCancelButton: true,
			allowOutsideClick: false,
			confirmButtonText: 'OK',
			cancelButtonText: 'Cancel'
		}).then((result) => {
			if (result.isConfirmed) {
				let payload = new RolePayload()
				payload.id_role_type = this.formTambah.value.id_role_type
				payload.nama_role = this.formTambah.value.nama_role
				payload.id_akun_level = this.formTambah.value.id_akun_level
				payload.terapkan_akun = result.value
				// payload.detail = this.filterDataMenuMenjadiRespon()
				payload.detail = this.filterDataMenuMenjadiResponRepair(this.functionFilterJson(this.dataMenuRepair))

				this.store.dispatch(
					RoleActions.addRole({ payload: payload })
				)
				
				setTimeout(() => {
					this.spinner.hide('spinner1')
				}, 400);
			}

		})

	}

	filterDataMenuMenjadiResponRepair(array: any) {
		let dataJadi = [];
		array.forEach((el, index) => {
			if (el.status_right == true) {
				dataJadi.push(this.dataMenu[index])
			} else {
				el.child.forEach((ele, index_2) => {
					if (ele.status_right == true) {
						dataJadi.push(ele)
					}
				});
			}
		});
		return dataJadi
	}

	functionFilterJson(data: Array<any>) {
		let data_dum = [];
		if (data.length > 0) {
			data.forEach(el => {
				// console.log('data', el)
				if (el.child.length > 0) {
					el.child.forEach(ele => {
						if (ele.child.length > 0) {
							ele.child.forEach((elem, ini) => {
								if (elem.status_right == true) {
									let cek_data = data_dum.find((param) => { return param.id == ele.id })
									if (cek_data === undefined) {
										data_dum.push(ele)
									}
								} else {
									data_dum.push(elem)
								}
							});
						}
					});
				}
			});
		}
		return data_dum
	}

	filterDataMenuMenjadiRespon() {
		let dataJadi = [];
		this.dataMenu.forEach((el, index) => {
			if (el.status_right == true) {
				dataJadi.push(this.dataMenu[index])
			} else {
				el.child.forEach((ele, index_2) => {
					if (ele.status_right == true) {
						dataJadi.push(ele)
					}

				});
			}
		});
		return dataJadi
	}

	loadLevelAkun() {
		this.levelAkunService.getList()
			.subscribe(succ => {
				this.levelRole = succ.response
			}, err => {
				console.log('error', err)
			})
	}
	loadTypeRole() {
		this.typeRoleService.getListTipeRole()
			.subscribe(succ => {
				this.typeRole = succ.response.sort((a, b) => a.nama_role_type.localeCompare(b.nama_role_type))
			})
	}
	changeRoleType(event: any) {
	
		this.roleService.getMenuRight(event.target.value)
			.subscribe(succ => {
				succ.response = succ.response.sort((a, b) => a.nama.localeCompare(b.nama))
				this.dataMenuRepair = succ.response
				succ.response.map((val, i) => {
					if (val.child.length > 1) {
						this.dataMenuRepair[i].child = val.child.sort((a, b) => a.nama.localeCompare(b.nama))
						val.child.map((value, index) => {
							if (value.child.length > 1) {
								this.dataMenuRepair[i].child[index].child = value.child.sort((a, b) => a.nama.localeCompare(b.nama))
								value.child.map((v, n) => {
									if (v.child.length > 1) {
										this.dataMenuRepair[i].child[index].child[n].child = v.child.sort((a, b) => a.nama.localeCompare(b.nama))
									}
								})
							}

						})
					}
				})

			})

	}
	ngAfterViewInit(): void {
		this.renderer.listen('document', 'click', (event) => {
			if (event.target.hasAttribute('input-checkbox')) {
				// console.log(this.elementRef.nativeElement.parentElement)
			}
		})
	}
	fieldsChange($event: any, index: any) {
		this.dataMenu[index].value_checkbox = $event.target.checked
		this.loop_pertama($event.target.checked, index)
	}

	loop_pertama(value: boolean, index: number) {
		this.dataMenu[index].child.forEach((el, ind) => {
			el.value_checkbox = value
			if (el.child.length > 0) {
				el.child.forEach(ele => {
					ele.value_checkbox = value
					if (ele.child.length > 0) {
						ele.child.forEach(elem => {
							elem.value_checkbox = value
							if (elem.child.length > 0) {
								elem.child.forEach(elemen => {
									elemen.value_checkbox = value
								});
							}
						});
					}
				});
			}
		});
	}

	fieldsChange_kedua($event: any, simbah: any, ayah: any) {
		this.dataMenu[simbah].child[ayah].value_checkbox = $event.target.checked
		this.loop_kedua($event.target.checked, simbah, ayah)

		let data_false = this.dataMenu[simbah].child.find((o) => {
			return o.value_checkbox === false
		})

		if (data_false === undefined) {
			/**nek diisi kabeh */
			this.dataMenu[simbah].value_checkbox = true
			this.dataMenu[simbah].indeterminate = false
		} else {
			this.dataMenu[simbah].value_checkbox = false
			this.dataMenu[simbah].indeterminate = true
		}
	}

	loop_kedua(value: boolean, simbah: number, ayah: number) {
		this.dataMenu[simbah].child[ayah].child.forEach(el => {
			el.value_checkbox = value
			if (el.child.length > 0) {
				el.child.forEach(ele => {
					ele.value_checkbox = value

					if (ele.child.length > 0) {
						ele.child.forEach(elem => {
							elem.value_checkbox = value
							// if (elem.children.length > 0) {
							//   elem.children.forEach(elemen => {
							//     elemen.value_checkbox = value
							//   });
							// }
						});
					}

				});
			}
		});
	}

	
	fieldsChangeRepair($event, i) {
		this.dataMenuRepair[i].value_checkbox = true
		this.loopPertamaRepair($event.target.checked, i)
	}

	fieldsChangeRepairKedua($event, i, ii) {
		this.dataMenuRepair[i].child[ii].value_checkbox = $event.target.checked
		this.loopKeduaRepair($event.target.checked, i, ii)
		let data_false = this.dataMenuRepair[i].child.find((o) => {
			return o.value_checkbox === false
		})
		if (data_false === undefined) {
			/**nek diisi kabeh */
			this.dataMenuRepair[i].value_checkbox = true
			this.dataMenuRepair[i].indeterminate = false
		} else {
			this.dataMenuRepair[i].value_checkbox = false
			this.dataMenuRepair[i].indeterminate = true
		}
	}
	fieldsChangeRepairKetiga($event, i, ii, iii) {
		this.dataMenuRepair[i].child[ii].child[iii].value_checkbox = $event.target.checked
		this.loopKetigaRepair($event.target.checked, i, ii, iii)

		let dataFalseKedua = this.dataMenuRepair[i].child[ii].child.find((o) => {
			return o.value_checkbox === false
		})
		if (dataFalseKedua === undefined) {
			/**nek diisi kabeh */
			this.dataMenuRepair[i].child[ii].value_checkbox = true
			this.dataMenuRepair[i].child[ii].indeterminate = false
		} else {
			this.dataMenuRepair[i].child[ii].value_checkbox = false
			this.dataMenuRepair[i].child[ii].indeterminate = true
		}

		let data_false = this.dataMenuRepair[i].child.find((o) => {
			return o.value_checkbox === false
		})
		if (data_false === undefined) {
			/**nek diisi kabeh */
			this.dataMenuRepair[i].value_checkbox = true
			this.dataMenuRepair[i].indeterminate = false
		} else {
			this.dataMenuRepair[i].value_checkbox = false
			this.dataMenuRepair[i].indeterminate = true
		}
	}
	fieldsChangeRepairKeempat($event, i, ii, iii, iv) {
		this.dataMenuRepair[i].child[ii].child[iii].child[iv].value_checkbox = $event.target.checked
		this.loopKeempatRepair($event.target.checked, i, ii, iii, iv)

		let dataFalseKetiga = this.dataMenuRepair[i].child[ii].child[iii].child.find((o) => {
			return o.value_checkbox === false
		})
		if (dataFalseKetiga === undefined) {
			/**nek diisi kabeh */
			this.dataMenuRepair[i].child[ii].child[iii].value_checkbox = true
			this.dataMenuRepair[i].child[ii].child[iii].indeterminate = false
		} else {
			this.dataMenuRepair[i].child[ii].child[iii].value_checkbox = false
			this.dataMenuRepair[i].child[ii].child[iii].indeterminate = true
		}

		let dataFalseKedua = this.dataMenuRepair[i].child[ii].child.find((o) => {
			return o.value_checkbox === false
		})
		if (dataFalseKedua === undefined) {
			/**nek diisi kabeh */
			this.dataMenuRepair[i].child[ii].value_checkbox = true
			this.dataMenuRepair[i].child[ii].indeterminate = false
		} else {
			this.dataMenuRepair[i].child[ii].value_checkbox = false
			this.dataMenuRepair[i].child[ii].indeterminate = true
		}

		let data_false = this.dataMenuRepair[i].child.find((o) => {
			return o.value_checkbox === false
		})
		if (data_false === undefined) {
			/**nek diisi kabeh */
			this.dataMenuRepair[i].value_checkbox = true
			this.dataMenuRepair[i].indeterminate = false
		} else {
			this.dataMenuRepair[i].value_checkbox = false
			this.dataMenuRepair[i].indeterminate = true
		}
	}
	fieldsChangeRepairKelima($event, i, ii, iii, iv, v) {
		this.dataMenuRepair[i].child[ii].child[iii].child[iv].child[v].value_checkbox = $event.target.checked
		this.loopKelimaRepair($event.target.checked, i, ii, iii, iv, v)

		let dataFalseKeempat = this.dataMenuRepair[i].child[ii].child[iii].child[iv].child.find((o) => {
			return o.value_checkbox === false
		})
		if (dataFalseKeempat === undefined) {
			/**nek diisi kabeh */
			this.dataMenuRepair[i].child[ii].child[iii].child[iv].value_checkbox = true
			this.dataMenuRepair[i].child[ii].child[iii].child[iv].indeterminate = false
		} else {
			this.dataMenuRepair[i].child[ii].child[iii].child[iv].value_checkbox = false
			this.dataMenuRepair[i].child[ii].child[iii].child[iv].indeterminate = true
		}

		let dataFalseKetiga = this.dataMenuRepair[i].child[ii].child[iii].child.find((o) => {
			return o.value_checkbox === false
		})
		if (dataFalseKetiga === undefined) {
			/**nek diisi kabeh */
			this.dataMenuRepair[i].child[ii].child[iii].value_checkbox = true
			this.dataMenuRepair[i].child[ii].child[iii].indeterminate = false
		} else {
			this.dataMenuRepair[i].child[ii].child[iii].value_checkbox = false
			this.dataMenuRepair[i].child[ii].child[iii].indeterminate = true
		}

		let dataFalseKedua = this.dataMenuRepair[i].child[ii].child.find((o) => {
			return o.value_checkbox === false
		})
		if (dataFalseKedua === undefined) {
			/**nek diisi kabeh */
			this.dataMenuRepair[i].child[ii].value_checkbox = true
			this.dataMenuRepair[i].child[ii].indeterminate = false
		} else {
			this.dataMenuRepair[i].child[ii].value_checkbox = false
			this.dataMenuRepair[i].child[ii].indeterminate = true
		}

		let data_false = this.dataMenuRepair[i].child.find((o) => {
			return o.value_checkbox === false
		})
		if (data_false === undefined) {
			/**nek diisi kabeh */
			this.dataMenuRepair[i].value_checkbox = true
			this.dataMenuRepair[i].indeterminate = false
		} else {
			this.dataMenuRepair[i].value_checkbox = false
			this.dataMenuRepair[i].indeterminate = true
		}
	}

	loopPertamaRepair(value: boolean, index: number) {
		this.dataMenuRepair[index].child.forEach((el, ind) => {
			el.value_checkbox = value
			el.indeterminate = (value) ? false : true
			if (el.child.length > 0) {
				el.child.forEach(ele => {
					ele.value_checkbox = value
					ele.indeterminate = (value) ? false : true
					if (ele.child.length > 0) {
						ele.child.forEach(elem => {
							elem.value_checkbox = value
							elem.indeterminate = (value) ? false : true
							if (elem.child.length > 0) {
								elem.child.forEach(elemen => {
									elemen.value_checkbox = value
									elemen.indeterminate = (value) ? false : true
								});
							}
						});
					}
				});
			}
		});
	}

	loopKeduaRepair(value: boolean, i: number, ii: number) {
		this.dataMenuRepair[i].child[ii].child.forEach((el, ind) => {
			el.value_checkbox = value
			el.indeterminate = (value) ? false : true
			if (el.child.length > 0) {
				el.child.forEach(ele => {
					ele.value_checkbox = value
					ele.indeterminate = (value) ? false : true
					if (ele.child.length > 0) {
						ele.child.forEach(elem => {
							elem.value_checkbox = value
							elem.indeterminate = (value) ? false : true
							if (elem.child.length > 0) {
								elem.child.forEach(elemen => {
									elemen.value_checkbox = value
									elemen.indeterminate = (value) ? false : true
								});
							}
						});
					}
				});
			}
		});
	}

	loopKetigaRepair(value: boolean, i: number, ii: number, iii: number) {
		this.dataMenuRepair[i].child[ii].child[iii].child.forEach((el, ind) => {
			el.value_checkbox = value
			el.indeterminate = (value) ? false : true
			if (el.child.length > 0) {
				el.child.forEach(ele => {
					ele.value_checkbox = value
					ele.indeterminate = (value) ? false : true
					if (ele.child.length > 0) {
						ele.child.forEach(elem => {
							elem.value_checkbox = value
							elem.indeterminate = (value) ? false : true
						});
					}
				});
			}
		});
	}

	loopKeempatRepair(value: boolean, i: number, ii: number, iii: number, iv: number) {
		this.dataMenuRepair[i].child[ii].child[iii].child[iv].child.forEach((el, ind) => {
			el.value_checkbox = value
			el.indeterminate = (value) ? false : true
			if (el.child.length > 0) {
				el.child.forEach(ele => {
					ele.value_checkbox = value
					ele.indeterminate = (value) ? false : true
					
				});
			}
		});
	}

	loopKelimaRepair(value: boolean, i: number, ii: number, iii: number, iv: number, v: number) {
		this.dataMenuRepair[i].child[ii].child[iii].child[iv].child[v].child.forEach((el, ind) => {
			el.value_checkbox = value
			el.indeterminate = (value) ? false : true
		});
	}


}

