"use strict";var __defProp=Object.defineProperty,__name=(target,value)=>__defProp(target,"name",{value,configurable:!0});exports.id=640,exports.ids=[640],exports.modules={10640:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ReturModule:()=>ReturModule});var common=__webpack_require__(69808),router=__webpack_require__(74202),core=__webpack_require__(5e3);const routes=[{path:"retur-penjualan",loadChildren:()=>__webpack_require__.e(9502).then(__webpack_require__.bind(__webpack_require__,19502)).then(m=>m.ReturPenjualanModule)},{path:"retur-pbf",loadChildren:()=>__webpack_require__.e(1865).then(__webpack_require__.bind(__webpack_require__,31865)).then(m=>m.ReturPbfModule)}];class ReturRoutingModule{}__name(ReturRoutingModule,"ReturRoutingModule"),ReturRoutingModule.\u0275fac=__name(function(t){return new(t||ReturRoutingModule)},"ReturRoutingModule_Factory"),ReturRoutingModule.\u0275mod=core.oAB({type:ReturRoutingModule}),ReturRoutingModule.\u0275inj=core.cJS({imports:[[router.Bz.forChild(routes)],router.Bz]});class ReturModule{}__name(ReturModule,"ReturModule"),ReturModule.\u0275fac=__name(function(t){return new(t||ReturModule)},"ReturModule_Factory"),ReturModule.\u0275mod=core.oAB({type:ReturModule}),ReturModule.\u0275inj=core.cJS({imports:[[common.ez,ReturRoutingModule]]})}};