"use strict";var __defProp=Object.defineProperty,__name=(target,value)=>__defProp(target,"name",{value,configurable:!0});exports.id=4943,exports.ids=[4943],exports.modules={4943:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{PerawatModule:()=>PerawatModule});var common=__webpack_require__(69808),router=__webpack_require__(74202),core=__webpack_require__(5e3);const routes=[{path:"antrean-perawat",loadChildren:()=>__webpack_require__.e(4835).then(__webpack_require__.bind(__webpack_require__,70191)).then(m=>m.AntreanPerawatModule)},{path:"tindakan-medis",loadChildren:()=>__webpack_require__.e(4495).then(__webpack_require__.bind(__webpack_require__,14495)).then(m=>m.TindakanMedisModule)}];class PerawatRoutingModule{}__name(PerawatRoutingModule,"PerawatRoutingModule"),PerawatRoutingModule.\u0275fac=__name(function(t){return new(t||PerawatRoutingModule)},"PerawatRoutingModule_Factory"),PerawatRoutingModule.\u0275mod=core.oAB({type:PerawatRoutingModule}),PerawatRoutingModule.\u0275inj=core.cJS({imports:[[router.Bz.forChild(routes)],router.Bz]});class PerawatModule{}__name(PerawatModule,"PerawatModule"),PerawatModule.\u0275fac=__name(function(t){return new(t||PerawatModule)},"PerawatModule_Factory"),PerawatModule.\u0275mod=core.oAB({type:PerawatModule}),PerawatModule.\u0275inj=core.cJS({imports:[[common.ez,PerawatRoutingModule]]})}};