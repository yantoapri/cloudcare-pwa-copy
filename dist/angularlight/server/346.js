"use strict";var __defProp=Object.defineProperty,__name=(target,value)=>__defProp(target,"name",{value,configurable:!0});exports.id=346,exports.ids=[346],exports.modules={90346:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{RoleAndRightsModule:()=>RoleAndRightsModule});var common=__webpack_require__(69808),router=__webpack_require__(74202),auth_token_guard=__webpack_require__(80476),core=__webpack_require__(5e3);const routes=[{path:"master-data-user",loadChildren:()=>__webpack_require__.e(1138).then(__webpack_require__.bind(__webpack_require__,51138)).then(m=>m.MasterDataUserModule)},{path:"role",loadChildren:()=>__webpack_require__.e(9157).then(__webpack_require__.bind(__webpack_require__,49157)).then(m=>m.RoleModule)},{path:"tipe-role",canActivate:[auth_token_guard.D],loadChildren:()=>__webpack_require__.e(5474).then(__webpack_require__.bind(__webpack_require__,45474)).then(m=>m.TypeRoleModule)}];class RoleAndRightsRoutingModule{}__name(RoleAndRightsRoutingModule,"RoleAndRightsRoutingModule"),RoleAndRightsRoutingModule.\u0275fac=__name(function(t){return new(t||RoleAndRightsRoutingModule)},"RoleAndRightsRoutingModule_Factory"),RoleAndRightsRoutingModule.\u0275mod=core.oAB({type:RoleAndRightsRoutingModule}),RoleAndRightsRoutingModule.\u0275inj=core.cJS({imports:[[router.Bz.forChild(routes)],router.Bz]});var angular_datatables=__webpack_require__(65415),fesm2015_forms=__webpack_require__(93075);class RoleAndRightsModule{}__name(RoleAndRightsModule,"RoleAndRightsModule"),RoleAndRightsModule.\u0275fac=__name(function(t){return new(t||RoleAndRightsModule)},"RoleAndRightsModule_Factory"),RoleAndRightsModule.\u0275mod=core.oAB({type:RoleAndRightsModule}),RoleAndRightsModule.\u0275inj=core.cJS({imports:[[common.ez,RoleAndRightsRoutingModule,fesm2015_forms.u5,fesm2015_forms.UX,angular_datatables.T]]})},65415:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{G:()=>DataTableDirective,T:()=>DataTablesModule});var core=__webpack_require__(5e3),DataTableDirective=function(){function DataTableDirective2(el,vcr,renderer){this.el=el,this.vcr=vcr,this.renderer=renderer,this.dtOptions={}}return __name(DataTableDirective2,"DataTableDirective"),DataTableDirective2.prototype.ngOnInit=function(){var _this=this;this.dtTrigger?this.dtTrigger.subscribe(function(options){_this.displayTable(options)}):this.displayTable(null)},DataTableDirective2.prototype.ngOnDestroy=function(){this.dtTrigger&&this.dtTrigger.unsubscribe(),this.dt&&this.dt.destroy(!0)},DataTableDirective2.prototype.displayTable=function(dtOptions){var _this=this;dtOptions&&(this.dtOptions=dtOptions),this.dtInstance=new Promise(function(resolve,reject){Promise.resolve(_this.dtOptions).then(function(resolvedDTOptions){0===Object.keys(resolvedDTOptions).length&&0===$("tbody tr",_this.el.nativeElement).length?reject("Both the table and dtOptions cannot be empty"):setTimeout(function(){var options={rowCallback:function(row,data,index){if(resolvedDTOptions.columns){var columns=resolvedDTOptions.columns;_this.applyNgPipeTransform(row,columns),_this.applyNgRefTemplate(row,columns,data)}resolvedDTOptions.rowCallback&&resolvedDTOptions.rowCallback(row,data,index)}};options=Object.assign({},resolvedDTOptions,options),_this.dt=$(_this.el.nativeElement).DataTable(options),resolve(_this.dt)})})})},DataTableDirective2.prototype.applyNgPipeTransform=function(row,columns){columns.filter(function(x){return x.ngPipeInstance&&!x.ngTemplateRef}).forEach(function(el){var pipe=el.ngPipeInstance,pipeArgs=el.ngPipeArgs||[],i=columns.findIndex(function(e){return e.data===el.data}),rowFromCol=row.childNodes.item(i),rowVal=$(rowFromCol).text(),rowValAfter=pipe.transform.apply(pipe,function(to,from,pack){if(pack||2===arguments.length)for(var ar,i=0,l=from.length;i<l;i++)(ar||!(i in from))&&(ar||(ar=Array.prototype.slice.call(from,0,i)),ar[i]=from[i]);return to.concat(ar||Array.prototype.slice.call(from))}([rowVal],pipeArgs,!1));$(rowFromCol).text(rowValAfter)})},DataTableDirective2.prototype.applyNgRefTemplate=function(row,columns,data){var _this=this;columns.filter(function(x){return x.ngTemplateRef&&!x.ngPipeInstance}).forEach(function(el){var _a=el.ngTemplateRef,ref=_a.ref,context=_a.context,i=columns.findIndex(function(e){return e.data===el.data}),cellFromIndex=row.childNodes.item(i);$(cellFromIndex).html("");var _context=Object.assign({},context,null==context?void 0:context.userData,{adtData:data}),instance=_this.vcr.createEmbeddedView(ref,_context);_this.renderer.appendChild(cellFromIndex,instance.rootNodes[0])})},DataTableDirective2.\u0275fac=__name(function(t){return new(t||DataTableDirective2)(core.Y36(core.SBq),core.Y36(core.s_b),core.Y36(core.Qsj))},"DataTableDirective_Factory"),DataTableDirective2.\u0275dir=core.lG2({type:DataTableDirective2,selectors:[["","datatable",""]],inputs:{dtOptions:"dtOptions",dtTrigger:"dtTrigger"}}),DataTableDirective2}(),common=__webpack_require__(69808),DataTablesModule=function(){function DataTablesModule2(){}return __name(DataTablesModule2,"DataTablesModule"),DataTablesModule2.forRoot=function(){return{ngModule:DataTablesModule2}},DataTablesModule2.\u0275fac=__name(function(t){return new(t||DataTablesModule2)},"DataTablesModule_Factory"),DataTablesModule2.\u0275mod=core.oAB({type:DataTablesModule2}),DataTablesModule2.\u0275inj=core.cJS({imports:[[common.ez]]}),DataTablesModule2}()}};