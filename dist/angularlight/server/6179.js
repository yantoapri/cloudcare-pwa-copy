"use strict";var __defProp=Object.defineProperty,__name=(target,value)=>__defProp(target,"name",{value,configurable:!0});exports.id=6179,exports.ids=[6179],exports.modules={76179:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{StokModule:()=>StokModule});var common=__webpack_require__(69808),router=__webpack_require__(74202),core=__webpack_require__(5e3);const routes=[{path:"obat",loadChildren:()=>__webpack_require__.e(2998).then(__webpack_require__.bind(__webpack_require__,42998)).then(m=>m.ObatModule)},{path:"alat-kesehatan",loadChildren:()=>__webpack_require__.e(5311).then(__webpack_require__.bind(__webpack_require__,25311)).then(m=>m.AlatKesehatanModule)}];class StokRoutingModule{}__name(StokRoutingModule,"StokRoutingModule"),StokRoutingModule.\u0275fac=__name(function(t){return new(t||StokRoutingModule)},"StokRoutingModule_Factory"),StokRoutingModule.\u0275mod=core.oAB({type:StokRoutingModule}),StokRoutingModule.\u0275inj=core.cJS({imports:[[router.Bz.forChild(routes)],router.Bz]});class StokModule{}__name(StokModule,"StokModule"),StokModule.\u0275fac=__name(function(t){return new(t||StokModule)},"StokModule_Factory"),StokModule.\u0275mod=core.oAB({type:StokModule}),StokModule.\u0275inj=core.cJS({imports:[[common.ez,StokRoutingModule]]})}};