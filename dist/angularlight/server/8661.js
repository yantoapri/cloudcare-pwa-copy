"use strict";var __defProp=Object.defineProperty,__name=(target,value)=>__defProp(target,"name",{value,configurable:!0});exports.id=8661,exports.ids=[8661],exports.modules={78661:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{PengaturanModule:()=>PengaturanModule});var common=__webpack_require__(69808),router=__webpack_require__(74202),core=__webpack_require__(5e3);const routes=[{path:"master-metode-bayar",loadChildren:()=>__webpack_require__.e(685).then(__webpack_require__.bind(__webpack_require__,80685)).then(m=>m.MasterMetodeBayarModule)},{path:"setting-defekta",loadChildren:()=>__webpack_require__.e(9674).then(__webpack_require__.bind(__webpack_require__,9674)).then(m=>m.SettingDefektaModule)},{path:"biaya-tambahan",loadChildren:()=>__webpack_require__.e(5759).then(__webpack_require__.bind(__webpack_require__,15759)).then(m=>m.BiayaTambahanModule)}];class PengaturanRoutingModule{}__name(PengaturanRoutingModule,"PengaturanRoutingModule"),PengaturanRoutingModule.\u0275fac=__name(function(t){return new(t||PengaturanRoutingModule)},"PengaturanRoutingModule_Factory"),PengaturanRoutingModule.\u0275mod=core.oAB({type:PengaturanRoutingModule}),PengaturanRoutingModule.\u0275inj=core.cJS({imports:[[router.Bz.forChild(routes)],router.Bz]});class PengaturanModule{}__name(PengaturanModule,"PengaturanModule"),PengaturanModule.\u0275fac=__name(function(t){return new(t||PengaturanModule)},"PengaturanModule_Factory"),PengaturanModule.\u0275mod=core.oAB({type:PengaturanModule}),PengaturanModule.\u0275inj=core.cJS({imports:[[common.ez,PengaturanRoutingModule]]})}};