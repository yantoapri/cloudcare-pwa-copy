"use strict";var __defProp=Object.defineProperty,__name=(target,value)=>__defProp(target,"name",{value,configurable:!0});exports.id=8115,exports.ids=[8115],exports.modules={18115:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{PasienModule:()=>PasienModule});var common=__webpack_require__(69808),router=__webpack_require__(74202),core=__webpack_require__(5e3);const routes=[{path:"data-pasien",loadChildren:()=>__webpack_require__.e(1146).then(__webpack_require__.bind(__webpack_require__,31146)).then(m=>m.DataPasienModule)},{path:"antrean",loadChildren:()=>__webpack_require__.e(2589).then(__webpack_require__.bind(__webpack_require__,62589)).then(m=>m.AntreanModule)}];class PasienRoutingModule{}__name(PasienRoutingModule,"PasienRoutingModule"),PasienRoutingModule.\u0275fac=__name(function(t){return new(t||PasienRoutingModule)},"PasienRoutingModule_Factory"),PasienRoutingModule.\u0275mod=core.oAB({type:PasienRoutingModule}),PasienRoutingModule.\u0275inj=core.cJS({imports:[[router.Bz.forChild(routes)],router.Bz]});class PasienModule{}__name(PasienModule,"PasienModule"),PasienModule.\u0275fac=__name(function(t){return new(t||PasienModule)},"PasienModule_Factory"),PasienModule.\u0275mod=core.oAB({type:PasienModule}),PasienModule.\u0275inj=core.cJS({imports:[[common.ez,PasienRoutingModule]]})}};