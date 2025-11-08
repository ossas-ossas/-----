(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/child-info/child-info"],{

/***/ 54:
/*!**********************************************************************************************************!*\
  !*** C:/Users/86182/Documents/HBuilderProjects/前端小程序/main.js?{"page":"pages%2Fchild-info%2Fchild-info"} ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
__webpack_require__(/*! @dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 27);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _childInfo = _interopRequireDefault(__webpack_require__(/*! ./pages/child-info/child-info.vue */ 55));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_childInfo.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 55:
/*!***************************************************************************************!*\
  !*** C:/Users/86182/Documents/HBuilderProjects/前端小程序/pages/child-info/child-info.vue ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _child_info_vue_vue_type_template_id_5d047c34___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./child-info.vue?vue&type=template&id=5d047c34& */ 56);
/* harmony import */ var _child_info_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./child-info.vue?vue&type=script&lang=js& */ 58);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _child_info_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _child_info_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _child_info_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./child-info.vue?vue&type=style&index=0&lang=css& */ 61);
/* harmony import */ var _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 44);

var renderjs





/* normalize component */

var component = Object(_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _child_info_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _child_info_vue_vue_type_template_id_5d047c34___WEBPACK_IMPORTED_MODULE_0__["render"],
  _child_info_vue_vue_type_template_id_5d047c34___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _child_info_vue_vue_type_template_id_5d047c34___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/child-info/child-info.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 56:
/*!**********************************************************************************************************************!*\
  !*** C:/Users/86182/Documents/HBuilderProjects/前端小程序/pages/child-info/child-info.vue?vue&type=template&id=5d047c34& ***!
  \**********************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_child_info_vue_vue_type_template_id_5d047c34___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./child-info.vue?vue&type=template&id=5d047c34& */ 57);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_child_info_vue_vue_type_template_id_5d047c34___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_child_info_vue_vue_type_template_id_5d047c34___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_child_info_vue_vue_type_template_id_5d047c34___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_child_info_vue_vue_type_template_id_5d047c34___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 57:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/86182/Documents/HBuilderProjects/前端小程序/pages/child-info/child-info.vue?vue&type=template&id=5d047c34& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var g0 = _vm.clinical.medicalDiagnosis.includes("cerebralPalsy")
  var g1 = _vm.clinical.medicalDiagnosis.includes("devDelay")
  var g2 = _vm.clinical.medicalDiagnosis.includes("autism")
  var g3 = _vm.clinical.medicalDiagnosis.includes("rare")
  var g4 =
    _vm.clinical.vision.status === "amblyopia"
      ? _vm.clinical.vision.sub.includes("myopia")
      : null
  var g5 =
    _vm.clinical.vision.status === "amblyopia"
      ? _vm.clinical.vision.sub.includes("astigmatism")
      : null
  var g6 = _vm.clinical.videos.length
  var g7 = _vm.formData.notes.length
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      _vm.clinical.kneelWalk = true
    }
    _vm.e1 = function ($event) {
      _vm.clinical.kneelWalk = false
    }
    _vm.e2 = function ($event) {
      _vm.clinical.handedness = "left"
    }
    _vm.e3 = function ($event) {
      _vm.clinical.handedness = "right"
    }
    _vm.e4 = function ($event) {
      _vm.clinical.epilepsy = "none"
    }
    _vm.e5 = function ($event) {
      _vm.clinical.epilepsy = "medicated"
    }
    _vm.e6 = function ($event) {
      _vm.clinical.epilepsy = "unmedicated"
    }
    _vm.e7 = function ($event) {
      _vm.clinical.homeGuide = true
    }
    _vm.e8 = function ($event) {
      _vm.clinical.homeGuide = false
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        g1: g1,
        g2: g2,
        g3: g3,
        g4: g4,
        g5: g5,
        g6: g6,
        g7: g7,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 58:
/*!****************************************************************************************************************!*\
  !*** C:/Users/86182/Documents/HBuilderProjects/前端小程序/pages/child-info/child-info.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_child_info_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./child-info.vue?vue&type=script&lang=js& */ 59);
/* harmony import */ var _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_child_info_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_child_info_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_child_info_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_child_info_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_child_info_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 59:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/86182/Documents/HBuilderProjects/前端小程序/pages/child-info/child-info.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, uniCloud) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 28));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 31));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _auth = __webpack_require__(/*! @/common/auth.js */ 60);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = {
  data: function data() {
    return {
      formData: {
        name: '',
        gender: '',
        birthDate: '',
        caregiver: '',
        phone: '',
        hasDelayHistory: '',
        notes: ''
      },
      clinical: {
        medicalDiagnosis: [],
        walkingTime: '',
        crawlStatus: '',
        crawlMonths: '',
        kneelWalk: null,
        handedness: '',
        vision: {
          status: 'normal',
          sub: []
        },
        hearing: {
          status: 'normal',
          dbLeft: '',
          dbRight: ''
        },
        epilepsy: 'none',
        videos: [],
        homeGuide: null
      },
      today: ''
    };
  },
  computed: {
    // 计算年龄
    calculatedAge: function calculatedAge() {
      if (!this.formData.birthDate) return '';
      var birth = new Date(this.formData.birthDate);
      var today = new Date();
      var age = today.getFullYear() - birth.getFullYear();
      var monthDiff = today.getMonth() - birth.getMonth();
      if (monthDiff < 0 || monthDiff === 0 && today.getDate() < birth.getDate()) {
        age--;
      }
      if (age < 1) {
        var months = Math.floor((today - birth) / (1000 * 60 * 60 * 24 * 30));
        return "".concat(months, "\u4E2A\u6708");
      }
      return "".concat(age, "\u5C81");
    },
    // 计算年龄段文本
    ageRangeText: function ageRangeText() {
      if (!this.formData.birthDate) return '';
      var ageInMonths = this.calculateAgeInMonths(this.formData.birthDate);
      return this.getAgeRangeText(ageInMonths);
    },
    // 表单验证
    isFormValid: function isFormValid() {
      return this.formData.name && this.formData.gender && this.formData.birthDate && this.formData.caregiver && this.formData.phone;
    }
  },
  methods: {
    // 恢复本地保存的数据（登录成功后使用，使用用户专属存储）
    restoreLocalData: function restoreLocalData() {
      // 先尝试从用户专属存储读取
      var userKey = (0, _auth.getUserStorageKey)('childInfo');
      var savedChildInfo = uni.getStorageSync(userKey) || uni.getStorageSync('childInfo');
      if (savedChildInfo && Object.keys(savedChildInfo).length > 0) {
        console.log('[child-info] 恢复本地保存的数据');
        // 恢复基本信息
        if (savedChildInfo.name) this.formData.name = savedChildInfo.name;
        if (savedChildInfo.gender) this.formData.gender = savedChildInfo.gender;
        if (savedChildInfo.birthDate) this.formData.birthDate = savedChildInfo.birthDate;
        if (savedChildInfo.caregiver) this.formData.caregiver = savedChildInfo.caregiver;
        if (savedChildInfo.phone) this.formData.phone = savedChildInfo.phone;
        if (savedChildInfo.notes) this.formData.notes = savedChildInfo.notes;

        // 恢复临床信息
        if (savedChildInfo.clinical) {
          this.clinical = _objectSpread(_objectSpread({}, this.clinical), savedChildInfo.clinical);
        }
        uni.showToast({
          title: '已恢复之前填写的数据',
          icon: 'success',
          duration: 1500
        });
      }
    },
    // 选择性别
    selectGender: function selectGender(gender) {
      this.formData.gender = gender;
    },
    // 选择主要照顾者
    selectCaregiver: function selectCaregiver(caregiver) {
      this.formData.caregiver = caregiver;
    },
    // 计算年龄（月）
    calculateAgeInMonths: function calculateAgeInMonths(birthDate) {
      if (!birthDate) return 0;
      var birth = new Date(birthDate);
      var today = new Date();
      var ageInMonths = (today.getFullYear() - birth.getFullYear()) * 12;
      ageInMonths += today.getMonth() - birth.getMonth();

      // 如果日期还没到，减1个月
      if (today.getDate() < birth.getDate()) {
        ageInMonths--;
      }
      return Math.max(0, ageInMonths);
    },
    // 获取年龄段文本
    getAgeRangeText: function getAgeRangeText(ageInMonths) {
      if (ageInMonths < 3) return '1-3个月';
      if (ageInMonths < 6) return '3-6个月';
      if (ageInMonths < 9) return '6-9个月';
      if (ageInMonths < 12) return '9-12个月';
      if (ageInMonths < 18) return '1-1.5岁';
      if (ageInMonths < 24) return '1.5-2岁';
      if (ageInMonths < 30) return '2-2.5岁';
      if (ageInMonths < 36) return '2.5-3岁';
      if (ageInMonths < 48) return '3-4岁';
      if (ageInMonths < 60) return '4-5岁';
      return '5-6岁';
    },
    // 出生日期改变
    onBirthDateChange: function onBirthDateChange(e) {
      this.formData.birthDate = e.detail.value;
    },
    // 切换医疗诊断
    toggleDiagnosis: function toggleDiagnosis(value) {
      var index = this.clinical.medicalDiagnosis.indexOf(value);
      if (index === -1) {
        this.clinical.medicalDiagnosis.push(value);
      } else {
        this.clinical.medicalDiagnosis.splice(index, 1);
      }
    },
    // 选择行走时间
    pickWalkingTime: function pickWalkingTime(value) {
      this.clinical.walkingTime = value;
    },
    // 选择爬行情况
    pickCrawlStatus: function pickCrawlStatus(value) {
      this.clinical.crawlStatus = value;
      if (value !== 'months') {
        this.clinical.crawlMonths = '';
      }
    },
    // 选择视觉状态
    pickVision: function pickVision(value) {
      this.clinical.vision.status = value;
      if (value !== 'amblyopia') {
        this.clinical.vision.sub = [];
      }
    },
    // 选择视觉子项
    pickVisionSub: function pickVisionSub(value) {
      var index = this.clinical.vision.sub.indexOf(value);
      if (index === -1) {
        this.clinical.vision.sub.push(value);
      } else {
        this.clinical.vision.sub.splice(index, 1);
      }
    },
    // 选择听觉状态
    pickHearing: function pickHearing(value) {
      this.clinical.hearing.status = value;
      if (value !== 'impaired') {
        this.clinical.hearing.dbLeft = '';
        this.clinical.hearing.dbRight = '';
      }
    },
    // 选择视频
    chooseVideo: function chooseVideo() {
      var _this = this;
      uni.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 30,
        success: function success(res) {
          if (_this.clinical.videos.length >= 6) {
            uni.showToast({
              title: '最多只能上传6个视频',
              icon: 'none'
            });
            return;
          }
          _this.clinical.videos.push({
            tempFilePath: res.tempFilePath,
            size: res.size,
            duration: res.duration
          });
        },
        fail: function fail(err) {
          console.error('选择视频失败', err);
        }
      });
    },
    // 删除视频
    removeVideo: function removeVideo(index) {
      this.clinical.videos.splice(index, 1);
    },
    // 跳转到评估页面
    goToAssessment: function goToAssessment() {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var loginChildInfo, existingChildId, userKey, savedChildInfo, dataChanged, childInfo, draftKey, _ret, errorMsg, isResourceExhausted, _existingChildId, _childInfo7, errorUserKey, _draftKey8;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (_this2.isFormValid) {
                  _context2.next = 3;
                  break;
                }
                uni.showToast({
                  title: '请完善必填信息',
                  icon: 'none'
                });
                return _context2.abrupt("return");
              case 3:
                if (!(_this2.clinical.crawlStatus === 'months' && !_this2.clinical.crawlMonths)) {
                  _context2.next = 6;
                  break;
                }
                uni.showToast({
                  title: '请输入爬行月份',
                  icon: 'none'
                });
                return _context2.abrupt("return");
              case 6:
                if (!(_this2.clinical.hearing.status === 'impaired' && (!_this2.clinical.hearing.dbLeft || !_this2.clinical.hearing.dbRight))) {
                  _context2.next = 9;
                  break;
                }
                uni.showToast({
                  title: '请输入听力分贝',
                  icon: 'none'
                });
                return _context2.abrupt("return");
              case 9:
                if ((0, _auth.canCallCloudFunction)({
                  showToast: false
                })) {
                  _context2.next = 13;
                  break;
                }
                // 保存数据到本地，避免丢失（使用用户专属存储）
                // 注意：不在这里声明 childInfo，避免作用域冲突
                loginChildInfo = _objectSpread(_objectSpread({}, _this2.formData), {}, {
                  clinical: _this2.clinical
                }); // 提示登录
                (0, _auth.requireLogin)({
                  redirectUrl: '/pages/child-info/child-info',
                  saveData: true,
                  dataToSave: loginChildInfo
                });
                return _context2.abrupt("return");
              case 13:
                // 检查是否已有 childId 且数据未变化，直接跳转
                existingChildId = _this2.formData.childId || _this2.clinical.childId;
                if (!existingChildId) {
                  _context2.next = 29;
                  break;
                }
                // 检查数据是否有变化（简单比较关键字段）
                userKey = (0, _auth.getUserStorageKey)('childInfo');
                savedChildInfo = uni.getStorageSync(userKey) || uni.getStorageSync('childInfo');
                if (!(savedChildInfo && savedChildInfo.childId === existingChildId)) {
                  _context2.next = 29;
                  break;
                }
                dataChanged = savedChildInfo.name !== _this2.formData.name || savedChildInfo.gender !== _this2.formData.gender || savedChildInfo.birthDate !== _this2.formData.birthDate || savedChildInfo.caregiver !== _this2.formData.caregiver || savedChildInfo.phone !== _this2.formData.phone;
                if (dataChanged) {
                  _context2.next = 29;
                  break;
                }
                // 数据未变化，直接跳转，不保存
                console.log('[child-info] 数据未变化，跳过保存，直接跳转');
                childInfo = _objectSpread(_objectSpread({}, _this2.formData), {}, {
                  clinical: _this2.clinical,
                  childId: existingChildId
                });
                uni.setStorageSync(userKey, childInfo);
                uni.setStorageSync('childInfo', childInfo);

                // 清除旧草稿
                draftKey = (0, _auth.getUserStorageKey)('assessmentDraft');
                uni.removeStorageSync(draftKey);
                uni.removeStorageSync('assessmentDraft');
                uni.navigateTo({
                  url: '/pages/assessment/assessment'
                });
                return _context2.abrupt("return");
              case 29:
                // 显示加载提示
                uni.showLoading({
                  title: '保存中...',
                  mask: true
                });
                _context2.prev = 30;
                return _context2.delegateYield( /*#__PURE__*/_regenerator.default.mark(function _callee() {
                  var _saveResult$result, _saveResult$result2, _saveResult$result3, _result$data, _result$data2;
                  var clinical, diagnosis, habits, optimizedVideos, userKey, saveData, saveResult, retryCount, maxRetries, errorMsg, _childInfo, _childInfo2, cloudCallSuccess, result, childIdFromDataId, childIdFromData_id, childIdFromResultId, childIdFromResultChildId, possibleChildId, hasErrorCode, hasErrorMsg, hasExplicitError, isSuccess, childId, _childInfo3, _draftKey3, _saveResult$result4, _saveResult$result5, _saveResult$result6, _saveResult$result7, _saveResult$result14, _errorMsg, isResourceExhausted, _childInfo5, _saveResult$result8, _saveResult$result8$d, _saveResult$result9, _saveResult$result9$d, _saveResult$result10, _saveResult$result10$, _saveResult$result11, _saveResult$result12, _saveResult$result13, deepSearchChildId, _childInfo6, _userKey, _draftKey6, _childInfo4, finalErrorMsg, _draftKey4;
                  return _regenerator.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          // 准备数据
                          clinical = _this2.clinical; // 转换诊断数据格式
                          diagnosis = clinical.medicalDiagnosis || []; // 准备 habits 对象
                          habits = {
                            walkTime: clinical.walkingTime || '',
                            crawl: clinical.crawlStatus || '',
                            crawlMonths: clinical.crawlMonths || '',
                            kneel: clinical.kneelWalk,
                            hand: clinical.handedness || ''
                          }; // 优化视频数据：只保留必要信息，不传输大文件
                          // 视频文件应该先上传到云存储，这里只保存引用
                          optimizedVideos = (clinical.videos || []).map(function (video) {
                            if (typeof video === 'string') {
                              return {
                                url: video
                              };
                            }
                            // 如果是临时文件，只保留路径，不传输完整文件数据
                            if (video.tempFilePath) {
                              return {
                                tempFilePath: video.tempFilePath
                              };
                            }
                            // 如果已有云存储URL，只保留URL
                            if (video.url) {
                              return {
                                url: video.url
                              };
                            }
                            return video;
                          }); // 提前声明存储键，避免在条件分支中重复声明
                          userKey = null; // 准备保存数据（排除大文件）
                          saveData = {
                            name: _this2.formData.name,
                            gender: _this2.formData.gender,
                            birthDate: _this2.formData.birthDate,
                            diagnosis: diagnosis,
                            habits: habits,
                            vision: clinical.vision || {
                              status: 'normal',
                              sub: []
                            },
                            hearing: clinical.hearing || {
                              status: 'normal',
                              dbLeft: '',
                              dbRight: ''
                            },
                            epilepsy: clinical.epilepsy || 'none',
                            caregiver: _this2.formData.caregiver || '',
                            phone: _this2.formData.phone || '',
                            videos: optimizedVideos,
                            // 使用优化后的视频数据
                            homeGuide: clinical.homeGuide,
                            notes: _this2.formData.notes || ''
                          }; // 如果有 childId，添加到保存数据中（用于更新而不是创建）
                          if (existingChildId) {
                            saveData.childId = existingChildId;
                          }

                          // 调用云函数保存到数据库（带重试机制）
                          retryCount = 0;
                          maxRetries = 2;
                        case 9:
                          if (!(retryCount <= maxRetries)) {
                            _context.next = 42;
                            break;
                          }
                          _context.prev = 10;
                          _context.next = 13;
                          return uniCloud.callFunction({
                            name: 'saveChildProfile',
                            data: saveData
                          });
                        case 13:
                          saveResult = _context.sent;
                          return _context.abrupt("break", 42);
                        case 17:
                          _context.prev = 17;
                          _context.t0 = _context["catch"](10);
                          retryCount++;
                          errorMsg = _context.t0.message || String(_context.t0); // 检查是否是资源耗尽错误
                          if (!(errorMsg.includes('resource exhausted') || errorMsg.includes('资源耗尽'))) {
                            _context.next = 39;
                            break;
                          }
                          if (!(retryCount <= maxRetries)) {
                            _context.next = 29;
                            break;
                          }
                          console.warn("[child-info] \u6570\u636E\u5E93\u8D44\u6E90\u8017\u5C3D\uFF0C\u7B49\u5F85 ".concat(retryCount * 2, " \u79D2\u540E\u91CD\u8BD5 (").concat(retryCount, "/").concat(maxRetries, ")"));
                          // 等待后重试
                          _context.next = 26;
                          return new Promise(function (resolve) {
                            return setTimeout(resolve, retryCount * 2000);
                          });
                        case 26:
                          return _context.abrupt("continue", 9);
                        case 29:
                          // 重试次数用完，保存到本地
                          console.error('[child-info] 数据库资源耗尽，保存到本地');
                          uni.hideLoading();
                          _childInfo = _objectSpread(_objectSpread({}, _this2.formData), {}, {
                            clinical: _this2.clinical,
                            childId: existingChildId || null
                          });
                          userKey = (0, _auth.getUserStorageKey)('childInfo');
                          uni.setStorageSync(userKey, _childInfo);
                          uni.setStorageSync('childInfo', _childInfo);
                          uni.showModal({
                            title: '保存失败',
                            content: '数据库暂时繁忙，数据已保存到本地。您可以稍后重试，或直接开始评估（数据会在后台同步）。',
                            showCancel: true,
                            confirmText: '继续评估',
                            cancelText: '稍后重试',
                            success: function success(res) {
                              if (res.confirm) {
                                // 清除旧草稿
                                var _draftKey = (0, _auth.getUserStorageKey)('assessmentDraft');
                                uni.removeStorageSync(_draftKey);
                                uni.removeStorageSync('assessmentDraft');
                                uni.navigateTo({
                                  url: '/pages/assessment/assessment'
                                });
                              }
                            }
                          });
                          return _context.abrupt("return", {
                            v: void 0
                          });
                        case 37:
                          _context.next = 40;
                          break;
                        case 39:
                          throw _context.t0;
                        case 40:
                          _context.next = 9;
                          break;
                        case 42:
                          uni.hideLoading();

                          // 检查返回结果
                          if (!(!saveResult || !saveResult.result)) {
                            _context.next = 51;
                            break;
                          }
                          console.error('[child-info] 保存返回结果异常:', saveResult);
                          // 保存到本地并提示
                          _childInfo2 = _objectSpread(_objectSpread({}, _this2.formData), {}, {
                            clinical: _this2.clinical,
                            childId: existingChildId || null
                          });
                          userKey = (0, _auth.getUserStorageKey)('childInfo');
                          uni.setStorageSync(userKey, _childInfo2);
                          uni.setStorageSync('childInfo', _childInfo2);
                          uni.showModal({
                            title: '保存异常',
                            content: '服务器返回异常，数据已保存到本地。您可以继续评估，或稍后重试保存。',
                            showCancel: true,
                            confirmText: '继续评估',
                            cancelText: '取消',
                            success: function success(res) {
                              if (res.confirm) {
                                var _draftKey2 = (0, _auth.getUserStorageKey)('assessmentDraft');
                                uni.removeStorageSync(_draftKey2);
                                uni.removeStorageSync('assessmentDraft');
                                uni.navigateTo({
                                  url: '/pages/assessment/assessment'
                                });
                              }
                            }
                          });
                          return _context.abrupt("return", {
                            v: void 0
                          });
                        case 51:
                          // 调试：打印完整响应
                          console.log('[child-info] 保存结果:', saveResult);
                          console.log('[child-info] success:', saveResult.success);
                          console.log('[child-info] errCode:', saveResult.errCode);
                          // 详细打印响应结构
                          console.log('[child-info] result:', saveResult.result);
                          console.log('[child-info] result.code:', (_saveResult$result = saveResult.result) === null || _saveResult$result === void 0 ? void 0 : _saveResult$result.code);
                          console.log('[child-info] result.msg:', (_saveResult$result2 = saveResult.result) === null || _saveResult$result2 === void 0 ? void 0 : _saveResult$result2.msg);
                          console.log('[child-info] result.data:', (_saveResult$result3 = saveResult.result) === null || _saveResult$result3 === void 0 ? void 0 : _saveResult$result3.data);

                          // 判断成功条件：
                          // 1. uniCloud调用成功：success为true且errCode为0
                          // 2. 云函数返回成功：result.code为0或不存在，且不是错误码
                          // 3. 有返回数据：尝试从多个位置提取childId
                          cloudCallSuccess = saveResult.success === true && saveResult.errCode === 0;
                          result = saveResult.result || {}; // 首先尝试从多个位置提取 childId（更宽松的策略）
                          // 云函数返回格式可能是：
                          // 1. { code: 0, msg: 'success', data: { id: 'xxx', isNew: true } }
                          // 2. { code: 0, data: { id: 'xxx' } }
                          // 3. { id: 'xxx' } （直接在 result 下）
                          childIdFromDataId = (_result$data = result.data) === null || _result$data === void 0 ? void 0 : _result$data.id;
                          childIdFromData_id = (_result$data2 = result.data) === null || _result$data2 === void 0 ? void 0 : _result$data2._id;
                          childIdFromResultId = result.id;
                          childIdFromResultChildId = result.childId; // 尝试所有可能的位置
                          possibleChildId = childIdFromDataId || childIdFromData_id || childIdFromResultId || childIdFromResultChildId; // 判断是否成功：
                          // 1. uniCloud 调用成功
                          // 2. 云函数没有返回明确的错误码（code 为 0 或不存在，且 msg 不是错误信息）
                          // 3. 或者找到了 childId（即使其他判断失败，只要有 childId 就认为成功）
                          hasErrorCode = result.code !== undefined && result.code !== null;
                          hasErrorMsg = result.msg && result.msg !== 'success' && !result.msg.includes('成功') && (result.msg.includes('失败') || result.msg.includes('错误') || result.msg.includes('无效')); // 如果有明确的错误码且不是 0，或者有错误消息，则失败
                          hasExplicitError = hasErrorCode && result.code !== 0 || hasErrorMsg; // 成功判断：调用成功 + 没有明确错误 + 有 childId
                          isSuccess = cloudCallSuccess && !hasExplicitError && !!possibleChildId;
                          console.log('[child-info] 判断结果:', {
                            cloudCallSuccess: cloudCallSuccess,
                            hasExplicitError: hasExplicitError,
                            possibleChildId: possibleChildId,
                            isSuccess: isSuccess,
                            hasErrorCode: hasErrorCode,
                            hasErrorMsg: hasErrorMsg,
                            resultCode: result.code,
                            resultMsg: result.msg,
                            resultData: result.data,
                            childIdSources: {
                              dataId: childIdFromDataId,
                              data_id: childIdFromData_id,
                              resultId: childIdFromResultId,
                              resultChildId: childIdFromResultChildId
                            },
                            fullResult: JSON.stringify(result, null, 2)
                          });
                          if (!isSuccess) {
                            _context.next = 83;
                            break;
                          }
                          childId = possibleChildId; // 保存儿童信息到本地存储（包含 childId，用于评估页面，使用用户专属存储）
                          _childInfo3 = _objectSpread(_objectSpread({}, _this2.formData), {}, {
                            clinical: _this2.clinical,
                            childId: childId // 保存数据库返回的ID
                          });

                          userKey = (0, _auth.getUserStorageKey)('childInfo');
                          uni.setStorageSync(userKey, _childInfo3);
                          uni.setStorageSync('childInfo', _childInfo3); // 兼容旧数据

                          // 清除本地备份数据（已成功保存到云端，不再需要备份）
                          // 注意：不要清除 childInfo，因为评估页面需要使用 childId

                          uni.showToast({
                            title: '保存成功',
                            icon: 'success'
                          });

                          // 清除旧草稿（新评估开始，使用用户专属存储）
                          _draftKey3 = (0, _auth.getUserStorageKey)('assessmentDraft');
                          uni.removeStorageSync(_draftKey3);
                          uni.removeStorageSync('assessmentDraft'); // 兼容旧数据

                          // 跳转到评估页面
                          setTimeout(function () {
                            uni.navigateTo({
                              url: '/pages/assessment/assessment'
                            });
                          }, 500);
                          _context.next = 124;
                          break;
                        case 83:
                          // 保存失败，使用统一的错误处理
                          console.error('[child-info] 保存失败:', saveResult);

                          // 检查是否是资源耗尽错误
                          _errorMsg = ((_saveResult$result4 = saveResult.result) === null || _saveResult$result4 === void 0 ? void 0 : _saveResult$result4.msg) || ((_saveResult$result5 = saveResult.result) === null || _saveResult$result5 === void 0 ? void 0 : _saveResult$result5.error) || '';
                          isResourceExhausted = _errorMsg.includes('resource exhausted') || _errorMsg.includes('资源耗尽') || _errorMsg.includes('db write action failed');
                          if (!isResourceExhausted) {
                            _context.next = 94;
                            break;
                          }
                          console.error('[child-info] 数据库资源耗尽错误');
                          // 保存到本地并提示
                          _childInfo5 = _objectSpread(_objectSpread({}, _this2.formData), {}, {
                            clinical: _this2.clinical,
                            childId: existingChildId || null
                          });
                          userKey = (0, _auth.getUserStorageKey)('childInfo');
                          uni.setStorageSync(userKey, _childInfo5);
                          uni.setStorageSync('childInfo', _childInfo5);
                          uni.showModal({
                            title: '数据库繁忙',
                            content: '数据库暂时繁忙，数据已保存到本地。您可以继续评估，系统会在后台自动重试保存。',
                            showCancel: true,
                            confirmText: '继续评估',
                            cancelText: '稍后重试',
                            success: function success(res) {
                              if (res.confirm) {
                                var _draftKey5 = (0, _auth.getUserStorageKey)('assessmentDraft');
                                uni.removeStorageSync(_draftKey5);
                                uni.removeStorageSync('assessmentDraft');
                                uni.navigateTo({
                                  url: '/pages/assessment/assessment'
                                });
                              }
                            }
                          });
                          return _context.abrupt("return", {
                            v: void 0
                          });
                        case 94:
                          console.error('[child-info] 失败原因分析:', {
                            cloudCallSuccess: cloudCallSuccess,
                            hasExplicitError: hasExplicitError,
                            possibleChildId: possibleChildId,
                            isSuccess: isSuccess,
                            resultExists: !!saveResult.result,
                            dataExists: !!((_saveResult$result6 = saveResult.result) !== null && _saveResult$result6 !== void 0 && _saveResult$result6.data),
                            dataContent: (_saveResult$result7 = saveResult.result) === null || _saveResult$result7 === void 0 ? void 0 : _saveResult$result7.data,
                            errorMsg: _errorMsg
                          });

                          // 如果调用成功但没有明确错误，再次尝试深度搜索 childId（兼容不同的返回格式）
                          if (!(cloudCallSuccess && !hasExplicitError && !possibleChildId)) {
                            _context.next = 112;
                            break;
                          }
                          console.warn('[child-info] 云函数调用成功但未找到 childId，尝试深度搜索');
                          console.warn('[child-info] result 完整内容:', JSON.stringify(saveResult.result, null, 2));
                          console.warn('[child-info] saveResult 完整内容:', JSON.stringify(saveResult, null, 2));

                          // 深度搜索 childId（可能在嵌套的对象中）
                          deepSearchChildId = ((_saveResult$result8 = saveResult.result) === null || _saveResult$result8 === void 0 ? void 0 : (_saveResult$result8$d = _saveResult$result8.data) === null || _saveResult$result8$d === void 0 ? void 0 : _saveResult$result8$d.id) || ((_saveResult$result9 = saveResult.result) === null || _saveResult$result9 === void 0 ? void 0 : (_saveResult$result9$d = _saveResult$result9.data) === null || _saveResult$result9$d === void 0 ? void 0 : _saveResult$result9$d._id) || ((_saveResult$result10 = saveResult.result) === null || _saveResult$result10 === void 0 ? void 0 : (_saveResult$result10$ = _saveResult$result10.data) === null || _saveResult$result10$ === void 0 ? void 0 : _saveResult$result10$.childId) || ((_saveResult$result11 = saveResult.result) === null || _saveResult$result11 === void 0 ? void 0 : _saveResult$result11.id) || ((_saveResult$result12 = saveResult.result) === null || _saveResult$result12 === void 0 ? void 0 : _saveResult$result12._id) || ((_saveResult$result13 = saveResult.result) === null || _saveResult$result13 === void 0 ? void 0 : _saveResult$result13.childId) || saveResult.id || saveResult._id || saveResult.childId;
                          if (!deepSearchChildId) {
                            _context.next = 112;
                            break;
                          }
                          // 找到了ID，继续处理
                          console.log('[child-info] 深度搜索找到 childId:', deepSearchChildId);
                          _childInfo6 = _objectSpread(_objectSpread({}, _this2.formData), {}, {
                            clinical: _this2.clinical,
                            childId: deepSearchChildId
                          });
                          _userKey = (0, _auth.getUserStorageKey)('childInfo');
                          uni.setStorageSync(_userKey, _childInfo6);
                          uni.setStorageSync('childInfo', _childInfo6);
                          uni.showToast({
                            title: '保存成功',
                            icon: 'success'
                          });
                          _draftKey6 = (0, _auth.getUserStorageKey)('assessmentDraft');
                          uni.removeStorageSync(_draftKey6);
                          uni.removeStorageSync('assessmentDraft');
                          setTimeout(function () {
                            uni.navigateTo({
                              url: '/pages/assessment/assessment'
                            });
                          }, 500);
                          return _context.abrupt("return", {
                            v: void 0
                          });
                        case 112:
                          // 准备数据（统一使用，避免重复声明）
                          _childInfo4 = _objectSpread(_objectSpread({}, _this2.formData), {}, {
                            clinical: _this2.clinical
                          }); // 检查是否是登录错误，统一处理
                          // 传入完整的 saveResult，让 handleLoginError 判断
                          // 注意：即使 uniCloud 调用成功，如果云函数返回 NOT_LOGIN，也应该当作登录错误
                          if (!(0, _auth.handleLoginError)(saveResult, {
                            redirectUrl: '/pages/child-info/child-info',
                            saveData: true,
                            dataToSave: _childInfo4
                          })) {
                            _context.next = 115;
                            break;
                          }
                          return _context.abrupt("return", {
                            v: void 0
                          });
                        case 115:
                          // 其他错误，保存到本地并提示（使用用户专属存储）
                          // 使用已声明的 errorMsg，如果没有则使用默认值
                          finalErrorMsg = _errorMsg || ((_saveResult$result14 = saveResult.result) === null || _saveResult$result14 === void 0 ? void 0 : _saveResult$result14.message) || '保存失败';
                          userKey = (0, _auth.getUserStorageKey)('childInfo');
                          uni.setStorageSync(userKey, _childInfo4);
                          uni.setStorageSync('childInfo', _childInfo4); // 兼容旧数据

                          uni.showToast({
                            title: finalErrorMsg + '，已保存到本地',
                            icon: 'none',
                            duration: 3000
                          });

                          // 清除旧草稿（新评估开始，使用用户专属存储）
                          _draftKey4 = (0, _auth.getUserStorageKey)('assessmentDraft');
                          uni.removeStorageSync(_draftKey4);
                          uni.removeStorageSync('assessmentDraft'); // 兼容旧数据

                          // 即使失败也允许继续，因为已保存到本地
                          setTimeout(function () {
                            uni.navigateTo({
                              url: '/pages/assessment/assessment'
                            });
                          }, 2000);
                        case 124:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, null, [[10, 17]]);
                })(), "t0", 32);
              case 32:
                _ret = _context2.t0;
                if (!((0, _typeof2.default)(_ret) === "object")) {
                  _context2.next = 35;
                  break;
                }
                return _context2.abrupt("return", _ret.v);
              case 35:
                _context2.next = 49;
                break;
              case 37:
                _context2.prev = 37;
                _context2.t1 = _context2["catch"](30);
                uni.hideLoading();
                console.error('[child-info] 保存儿童信息异常:', _context2.t1);
                errorMsg = _context2.t1.message || String(_context2.t1);
                isResourceExhausted = errorMsg.includes('resource exhausted') || errorMsg.includes('资源耗尽') || errorMsg.includes('db write action failed'); // 出错时仍保存到本地存储（使用用户专属存储）
                _existingChildId = _this2.formData.childId || _this2.clinical.childId;
                _childInfo7 = _objectSpread(_objectSpread({}, _this2.formData), {}, {
                  clinical: _this2.clinical,
                  childId: _existingChildId || null
                });
                errorUserKey = (0, _auth.getUserStorageKey)('childInfo');
                uni.setStorageSync(errorUserKey, _childInfo7);
                uni.setStorageSync('childInfo', _childInfo7); // 兼容旧数据

                if (isResourceExhausted) {
                  uni.showModal({
                    title: '数据库繁忙',
                    content: '数据库暂时繁忙，数据已保存到本地。您可以继续评估，或稍后重试保存。',
                    showCancel: true,
                    confirmText: '继续评估',
                    cancelText: '稍后重试',
                    success: function success(res) {
                      if (res.confirm) {
                        var _draftKey7 = (0, _auth.getUserStorageKey)('assessmentDraft');
                        uni.removeStorageSync(_draftKey7);
                        uni.removeStorageSync('assessmentDraft');
                        uni.navigateTo({
                          url: '/pages/assessment/assessment'
                        });
                      }
                    }
                  });
                } else {
                  uni.showToast({
                    title: '网络错误，已保存到本地',
                    icon: 'none',
                    duration: 2000
                  });

                  // 清除旧草稿（新评估开始）
                  _draftKey8 = (0, _auth.getUserStorageKey)('assessmentDraft');
                  uni.removeStorageSync(_draftKey8);
                  uni.removeStorageSync('assessmentDraft');

                  // 允许继续使用本地数据
                  setTimeout(function () {
                    uni.navigateTo({
                      url: '/pages/assessment/assessment'
                    });
                  }, 1500);
                }
              case 49:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[30, 37]]);
      }))();
    }
  },
  onLoad: function onLoad() {
    console.log('[child-info] page loaded');

    // 设置今天的日期作为最大可选日期
    var today = new Date();
    this.today = today.toISOString().split('T')[0];

    // 登录守卫：页面加载时检查，只在确实需要时跳转
    var loginStatus = (0, _auth.checkLoginStatus)();
    console.log('[child-info] 登录状态:', loginStatus);
    if (!(0, _auth.requireLogin)({
      redirectUrl: '/pages/child-info/child-info'
    })) {
      return; // 未登录，已跳转到登录页
    }

    // 检查是否是新用户登录（通过比较当前用户ID和本地存储的用户ID）
    // 只在用户切换时才清除数据，避免同一用户多次创建 child profile 时丢失数据
    var currentUserId = (0, _auth.getCurrentUserId)();
    var lastUserId = uni.getStorageSync('lastUserId');
    if (currentUserId && currentUserId !== lastUserId) {
      // 检测到用户切换，清除旧用户的数据
      console.log('[child-info] 检测到用户切换，清除旧用户数据');
      (0, _auth.clearUserData)();
      // 保存当前用户ID
      uni.setStorageSync('lastUserId', currentUserId);
    } else if (!currentUserId) {
      // 未登录，清除所有数据
      (0, _auth.clearUserData)();
    } else {
      // 同一用户，不清除数据（允许用户创建多个 child profile）
      console.log('[child-info] 同一用户，保留现有数据');
    }

    // 尝试恢复当前用户保存的本地数据
    this.restoreLocalData();

    // 如果是从结果页返回（重新评估），检查是否有 childId
    // 如果有 childId，说明是重新评估，不需要重新保存
    var userKey = (0, _auth.getUserStorageKey)('childInfo');
    var savedChildInfo = uni.getStorageSync(userKey) || uni.getStorageSync('childInfo');
    if (savedChildInfo && savedChildInfo.childId) {
      // 恢复 childId 到表单数据中
      this.formData.childId = savedChildInfo.childId;
      this.clinical.childId = savedChildInfo.childId;
      console.log('[child-info] 检测到已有 childId，重新评估模式:', savedChildInfo.childId);
    }
  },
  onShow: function onShow() {
    // 静默检查登录状态，不打断用户操作
    // 只在 token 确实失效时记录日志，等用户操作时再提示
    var status = (0, _auth.checkLoginStatus)();
    if (!status.isLoggedIn) {
      console.warn('[child-info] Token 已失效，保存时将提示登录');
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 27)["uniCloud"]))

/***/ }),

/***/ 61:
/*!************************************************************************************************************************!*\
  !*** C:/Users/86182/Documents/HBuilderProjects/前端小程序/pages/child-info/child-info.vue?vue&type=style&index=0&lang=css& ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_child_info_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./child-info.vue?vue&type=style&index=0&lang=css& */ 62);
/* harmony import */ var _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_child_info_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_child_info_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_child_info_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_child_info_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_child_info_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 62:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/86182/Documents/HBuilderProjects/前端小程序/pages/child-info/child-info.vue?vue&type=style&index=0&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[54,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/child-info/child-info.js.map