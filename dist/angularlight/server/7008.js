"use strict";var __defProp=Object.defineProperty,__name=(target,value)=>__defProp(target,"name",{value,configurable:!0});exports.id=7008,exports.ids=[7008],exports.modules={97008:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{DokterModule:()=>DokterModule});var common=__webpack_require__(69808),router=__webpack_require__(74202),core=__webpack_require__(5e3);const routes=[{path:"antrean-dokter",loadChildren:()=>__webpack_require__.e(3427).then(__webpack_require__.bind(__webpack_require__,33427)).then(m=>m.AntreanDokterModule)},{path:"antrean-rujukan",loadChildren:()=>__webpack_require__.e(3709).then(__webpack_require__.bind(__webpack_require__,3709)).then(m=>m.AntreanRujukanModule)}];class DokterRoutingModule{}__name(DokterRoutingModule,"DokterRoutingModule"),DokterRoutingModule.\u0275fac=__name(function(t){return new(t||DokterRoutingModule)},"DokterRoutingModule_Factory"),DokterRoutingModule.\u0275mod=core.oAB({type:DokterRoutingModule}),DokterRoutingModule.\u0275inj=core.cJS({imports:[[router.Bz.forChild(routes)],router.Bz]});class DokterModule{}__name(DokterModule,"DokterModule"),DokterModule.\u0275fac=__name(function(t){return new(t||DokterModule)},"DokterModule_Factory"),DokterModule.\u0275mod=core.oAB({type:DokterModule}),DokterModule.\u0275inj=core.cJS({imports:[[common.ez,DokterRoutingModule]]})}};