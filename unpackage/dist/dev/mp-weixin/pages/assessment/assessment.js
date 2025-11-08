(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/assessment/assessment"],{

/***/ 64:
/*!**********************************************************************************************************!*\
  !*** C:/Users/86182/Documents/HBuilderProjects/前端小程序/main.js?{"page":"pages%2Fassessment%2Fassessment"} ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
__webpack_require__(/*! @dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 27);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _assessment = _interopRequireDefault(__webpack_require__(/*! ./pages/assessment/assessment.vue */ 65));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_assessment.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 65:
/*!***************************************************************************************!*\
  !*** C:/Users/86182/Documents/HBuilderProjects/前端小程序/pages/assessment/assessment.vue ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assessment_vue_vue_type_template_id_f35dbbf4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assessment.vue?vue&type=template&id=f35dbbf4& */ 66);
/* harmony import */ var _assessment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assessment.vue?vue&type=script&lang=js& */ 68);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _assessment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _assessment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _assessment_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assessment.vue?vue&type=style&index=0&lang=css& */ 71);
/* harmony import */ var _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 46);

var renderjs





/* normalize component */

var component = Object(_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _assessment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _assessment_vue_vue_type_template_id_f35dbbf4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _assessment_vue_vue_type_template_id_f35dbbf4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _assessment_vue_vue_type_template_id_f35dbbf4___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/assessment/assessment.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 66:
/*!**********************************************************************************************************************!*\
  !*** C:/Users/86182/Documents/HBuilderProjects/前端小程序/pages/assessment/assessment.vue?vue&type=template&id=f35dbbf4& ***!
  \**********************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_template_id_f35dbbf4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./assessment.vue?vue&type=template&id=f35dbbf4& */ 67);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_template_id_f35dbbf4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_template_id_f35dbbf4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_template_id_f35dbbf4___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_template_id_f35dbbf4___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 67:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/86182/Documents/HBuilderProjects/前端小程序/pages/assessment/assessment.vue?vue&type=template&id=f35dbbf4& ***!
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
  var l2 = _vm.__map(_vm.allDomains, function (domain, __i0__) {
    var $orig = _vm.__get_orig(domain)
    var m0 = _vm.hasMatchingQuestionsInDomain(domain)
    var m1 = m0 ? _vm.getDomainLabel(domain) : null
    var l1 =
      m0 && _vm.expandedDomains[domain]
        ? _vm.__map(
            _vm.getSubdomainsInDomain(domain),
            function (subdomain, __i1__) {
              var $orig = _vm.__get_orig(subdomain)
              var m2 = _vm.hasMatchingQuestionsInSubdomain(domain, subdomain)
              var m3 = m2 ? _vm.getSubdomainLabel(subdomain) : null
              var l0 =
                m2 && _vm.expandedSubdomains[domain + "::" + subdomain]
                  ? _vm.getVisibleQuestions(domain, subdomain)
                  : null
              return {
                $orig: $orig,
                m2: m2,
                m3: m3,
                l0: l0,
              }
            }
          )
        : null
    return {
      $orig: $orig,
      m0: m0,
      m1: m1,
      l1: l1,
    }
  })
  if (!_vm._isMounted) {
    _vm.e0 = function ($event, domain, subdomain) {
      var _temp = arguments[arguments.length - 1].currentTarget.dataset,
        _temp2 = _temp.eventParams || _temp["event-params"],
        domain = _temp2.domain,
        subdomain = _temp2.subdomain
      var _temp, _temp2
      return _vm.toggleSubdomain(domain + "::" + subdomain)
    }
    _vm.e1 = function ($event, domain, subdomain) {
      var _temp3 = arguments[arguments.length - 1].currentTarget.dataset,
        _temp4 = _temp3.eventParams || _temp3["event-params"],
        domain = _temp4.domain,
        subdomain = _temp4.subdomain
      var _temp3, _temp4
      $event.stopPropagation()
      return _vm.selectAllInSubdomain(domain, subdomain)
    }
    _vm.e2 = function ($event, domain, subdomain) {
      var _temp5 = arguments[arguments.length - 1].currentTarget.dataset,
        _temp6 = _temp5.eventParams || _temp5["event-params"],
        domain = _temp6.domain,
        subdomain = _temp6.subdomain
      var _temp5, _temp6
      $event.stopPropagation()
      return _vm.clearSubdomain(domain, subdomain)
    }
    _vm.e3 = function ($event, q) {
      var _temp7 = arguments[arguments.length - 1].currentTarget.dataset,
        _temp8 = _temp7.eventParams || _temp7["event-params"],
        q = _temp8.q
      var _temp7, _temp8
      return _vm.toggleAnswer(q.id)
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l2: l2,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 68:
/*!****************************************************************************************************************!*\
  !*** C:/Users/86182/Documents/HBuilderProjects/前端小程序/pages/assessment/assessment.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./assessment.vue?vue&type=script&lang=js& */ 69);
/* harmony import */ var _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 69:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/86182/Documents/HBuilderProjects/前端小程序/pages/assessment/assessment.vue?vue&type=script&lang=js& ***!
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
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 31));
var _questionBank = __webpack_require__(/*! @/common/questionBank.js */ 70);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// 领域标签映射
var domainLabels = {
  '感知觉': '感知觉',
  '粗大动作': '粗大动作',
  '精细动作': '精细动作',
  '认知': '认知',
  '语言': '语言',
  '社会情绪': '社会情绪',
  '社会互动': '社会互动'
};

// 子领域标签映射
var subdomainLabels = {
  'OSV': '视知觉',
  'OSH': '听知觉',
  'OST': '触知觉',
  'ISP': '本体运动知觉',
  'ISV': '前庭平衡知觉',
  'GM': '躯肢体粗大动作',
  'UEM': '双上肢粗大动作',
  'FM': '精细动作',
  'SIP': '社会互动',
  'SIE': '社会情绪',
  'COG': '认知',
  'LANG': '语言',
  'OM': '口腔动作'
};
var _default = {
  data: function data() {
    return {
      // 题目数据（按 domain -> subdomain 分组）
      questionsByDomain: {},
      // 展开状态
      expandedDomains: {},
      expandedSubdomains: {},
      // 答案（1=完成，0=未完成）
      answers: {},
      // 答案更新计数器（用于强制 computed 重新计算）
      answersVersion: 0,
      // 筛选器
      filters: {
        keyword: '',
        domains: [],
        onlyUnfinished: false
      },
      // 提交状态
      isSubmitting: false,
      // 儿童信息
      childInfo: {}
    };
  },
  computed: {
    // 所有领域
    allDomains: function allDomains() {
      var domains = new Set();
      _questionBank.questions.forEach(function (q) {
        if (q.domain) domains.add(q.domain);
      });
      return Array.from(domains).sort();
    },
    // 统计信息
    derivedStats: function derivedStats() {
      var _this = this;
      // 依赖 answersVersion 来强制重新计算
      var version = this.answersVersion;
      var stats = {
        global: {
          selected: 0,
          total: 0,
          ratio: 0
        },
        byDomain: {},
        bySubdomain: {} // 添加子领域统计
      };

      // 统计全局
      var totalQs = Object.values(this.questionsByDomain).reduce(function (sum, subdomains) {
        return sum + Object.values(subdomains).reduce(function (s, qs) {
          return s + qs.length;
        }, 0);
      }, 0);

      // 访问 answers 的所有值来触发依赖收集
      var answersKeys = Object.keys(this.answers);
      var selectedQs = 0;
      answersKeys.forEach(function (k) {
        if (_this.answers[k] === 1) {
          selectedQs++;
        }
      });
      stats.global.total = totalQs;
      stats.global.selected = selectedQs;
      if (totalQs > 0) {
        stats.global.ratio = Math.round(selectedQs / totalQs * 100);
      }

      // 统计每个 domain 和 subdomain
      this.allDomains.forEach(function (domain) {
        var domainQs = _this.getQuestionsInDomain(domain);
        var selected = 0;
        domainQs.forEach(function (q) {
          // 确保访问 answers[q.id] 以触发依赖
          if (_this.answers[q.id] === 1) {
            selected++;
          }
        });
        stats.byDomain[domain] = {
          selected: selected,
          total: domainQs.length,
          ratio: domainQs.length > 0 ? Math.round(selected / domainQs.length * 100) : 0
        };

        // 统计每个 subdomain
        if (!stats.bySubdomain[domain]) {
          stats.bySubdomain[domain] = {};
        }
        var subdomains = _this.getSubdomainsInDomain(domain);
        subdomains.forEach(function (subdomain) {
          var _this$questionsByDoma;
          var subdomainQs = ((_this$questionsByDoma = _this.questionsByDomain[domain]) === null || _this$questionsByDoma === void 0 ? void 0 : _this$questionsByDoma[subdomain]) || [];
          var subdomainSelected = 0;
          subdomainQs.forEach(function (q) {
            // 确保访问 answers[q.id] 以触发依赖
            if (_this.answers[q.id] === 1) {
              subdomainSelected++;
            }
          });
          stats.bySubdomain[domain][subdomain] = {
            selected: subdomainSelected,
            total: subdomainQs.length,
            ratio: subdomainQs.length > 0 ? Math.round(subdomainSelected / subdomainQs.length * 100) : 0
          };
        });
      });
      return stats;
    }
  },
  onShow: function onShow() {
    // 登录守卫：检查是否已登录
    var token = uni.getStorageSync('uni_id_token');
    if (!token) {
      uni.navigateTo({
        url: '/uni_modules/uni-id-pages/pages/login/login-withpwd'
      });
      return;
    }
  },
  onLoad: function onLoad() {
    var _this$childInfo,
      _this$childInfo2,
      _this2 = this;
    console.log('[assessment] onLoad start');
    this.loadChildInfo();

    // 检查是否需要清除旧草稿
    var draft = uni.getStorageSync('assessmentDraft');
    var currentChildId = ((_this$childInfo = this.childInfo) === null || _this$childInfo === void 0 ? void 0 : _this$childInfo.childId) || ((_this$childInfo2 = this.childInfo) === null || _this$childInfo2 === void 0 ? void 0 : _this$childInfo2._id);
    var draftChildId = draft === null || draft === void 0 ? void 0 : draft.childId;

    // 如果 childId 不匹配，说明是新评估，清除旧草稿
    if (draft && draftChildId && currentChildId && draftChildId !== currentChildId) {
      console.log('[assessment] 检测到新的 childId，清除旧草稿');
      uni.removeStorageSync('assessmentDraft');
      uni.removeStorageSync('assessmentResult');
    }
    var hasDraft = draft && Object.keys(draft).length > 0 && (!currentChildId || draftChildId === currentChildId);
    this.initData();
    if (!hasDraft) {
      // 首次进入：只展开第一个 domain 的第一个 subdomain
      this.allDomains.forEach(function (domain, idx) {
        if (idx === 0 && _this2.hasQuestionsInDomain(domain)) {
          _this2.$set(_this2.expandedDomains, domain, true);
          var subdomains = _this2.getSubdomainsInDomain(domain);
          if (subdomains.length > 0) {
            _this2.$set(_this2.expandedSubdomains, "".concat(domain, "::").concat(subdomains[0]), true);
          }
        } else {
          _this2.$set(_this2.expandedDomains, domain, false);
        }
      });
    }
    this.loadDraft();

    // 对于没有草稿答案的题目，初始化为0
    _questionBank.questions.forEach(function (q) {
      if (_this2.answers[q.id] === undefined) {
        _this2.answers[q.id] = 0;
      }
    });
    console.log('[assessment] onLoad end');
  },
  beforeDestroy: function beforeDestroy() {
    this.saveDraft();
  },
  methods: {
    // 初始化数据
    initData: function initData() {
      var _this3 = this;
      console.log('[assessment] initData start, questions count:', _questionBank.questions.length);

      // 按 domain -> subdomain 分组题目
      this.questionsByDomain = {};
      _questionBank.questions.forEach(function (q) {
        var domain = q.domain || '认知';
        if (!_this3.questionsByDomain[domain]) {
          _this3.questionsByDomain[domain] = {};
        }
        var subdomain = q.subdomain || 'other';
        if (!_this3.questionsByDomain[domain][subdomain]) {
          _this3.questionsByDomain[domain][subdomain] = [];
        }
        _this3.questionsByDomain[domain][subdomain].push(q);
      });
      console.log('[assessment] grouped by domain, keys:', Object.keys(this.questionsByDomain));
      console.log('[assessment] initData end');
    },
    // 加载儿童信息
    loadChildInfo: function loadChildInfo() {
      this.childInfo = uni.getStorageSync('childInfo') || {};
    },
    // 加载草稿
    loadDraft: function loadDraft() {
      var _this$childInfo3,
        _this$childInfo4,
        _this4 = this;
      var draft = uni.getStorageSync('assessmentDraft');
      var currentChildId = ((_this$childInfo3 = this.childInfo) === null || _this$childInfo3 === void 0 ? void 0 : _this$childInfo3.childId) || ((_this$childInfo4 = this.childInfo) === null || _this$childInfo4 === void 0 ? void 0 : _this$childInfo4._id);
      var draftChildId = draft === null || draft === void 0 ? void 0 : draft.childId;

      // 只加载匹配当前 childId 的草稿
      if (draft && (!currentChildId || !draftChildId || draftChildId === currentChildId)) {
        if (draft.answers) {
          // 使用 $set 逐个设置答案，确保响应式
          Object.keys(this.answers).forEach(function (k) {
            delete _this4.answers[k];
          });
          Object.keys(draft.answers).forEach(function (k) {
            _this4.$set(_this4.answers, k, draft.answers[k]);
          });
          // 更新版本号，强制 computed 重新计算
          this.answersVersion++;
        }
        if (draft.expandedDomains) this.expandedDomains = draft.expandedDomains;
        if (draft.expandedSubdomains) this.expandedSubdomains = draft.expandedSubdomains;
        if (draft.filters) this.filters = draft.filters;
        // 强制更新视图
        this.$nextTick(function () {
          _this4.$forceUpdate();
        });
      }
    },
    // 保存草稿
    saveDraft: function saveDraft() {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var _this5$childInfo, _this5$childInfo2;
        var currentChildId, result;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                currentChildId = ((_this5$childInfo = _this5.childInfo) === null || _this5$childInfo === void 0 ? void 0 : _this5$childInfo.childId) || ((_this5$childInfo2 = _this5.childInfo) === null || _this5$childInfo2 === void 0 ? void 0 : _this5$childInfo2._id);
                if (currentChildId) {
                  _context.next = 4;
                  break;
                }
                // 如果没有 childId，只保存到本地
                uni.setStorageSync('assessmentDraft', {
                  childId: currentChildId,
                  answers: _this5.answers,
                  expandedDomains: _this5.expandedDomains,
                  expandedSubdomains: _this5.expandedSubdomains,
                  filters: _this5.filters
                });
                return _context.abrupt("return");
              case 4:
                // 同时保存到本地和云端
                uni.setStorageSync('assessmentDraft', {
                  childId: currentChildId,
                  answers: _this5.answers,
                  expandedDomains: _this5.expandedDomains,
                  expandedSubdomains: _this5.expandedSubdomains,
                  filters: _this5.filters
                });

                // 异步保存到云端数据库（不阻塞 UI）
                _context.prev = 5;
                _context.next = 8;
                return uniCloud.callFunction({
                  name: 'saveAssessment',
                  data: {
                    childId: currentChildId,
                    answers: _this5.answers
                  }
                });
              case 8:
                result = _context.sent;
                if (result.result && !result.result.ok) {
                  console.error('[saveDraft] 云端保存失败:', result.result.msg);
                } else {
                  console.log('[saveDraft] 云端保存成功');
                }
                _context.next = 15;
                break;
              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](5);
                console.error('[saveDraft] 云端保存异常:', _context.t0);
                // 静默失败，不影响用户体验
              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[5, 12]]);
      }))();
    },
    // 切换 domain
    toggleDomain: function toggleDomain(domain) {
      this.$set(this.expandedDomains, domain, !this.expandedDomains[domain]);
      this.saveDraft();
    },
    // 切换 subdomain
    toggleSubdomain: function toggleSubdomain(key) {
      this.$set(this.expandedSubdomains, key, !this.expandedSubdomains[key]);
      this.saveDraft();
    },
    // 获取 domain 中的题目
    getQuestionsInDomain: function getQuestionsInDomain(domain) {
      var questions = [];
      Object.values(this.questionsByDomain[domain] || {}).forEach(function (list) {
        questions.push.apply(questions, (0, _toConsumableArray2.default)(list));
      });
      return questions;
    },
    // 获取 domain 中的 subdomains
    getSubdomainsInDomain: function getSubdomainsInDomain(domain) {
      return Object.keys(this.questionsByDomain[domain] || {}).sort();
    },
    // 检查 domain 是否有题目
    hasQuestionsInDomain: function hasQuestionsInDomain(domain) {
      return this.questionsByDomain[domain] && Object.keys(this.questionsByDomain[domain]).length > 0;
    },
    // 获取领域统计
    getDomainStats: function getDomainStats(domain) {
      var _this6 = this;
      var questions = this.getQuestionsInDomain(domain);
      var selected = questions.filter(function (q) {
        return _this6.answers[q.id] === 1;
      }).length;
      return {
        selected: selected,
        total: questions.length,
        ratio: questions.length > 0 ? Math.round(selected / questions.length * 100) : 0
      };
    },
    // 获取子领域统计
    getSubdomainStats: function getSubdomainStats(domain, subdomain) {
      var _this$questionsByDoma2,
        _this7 = this;
      var questions = ((_this$questionsByDoma2 = this.questionsByDomain[domain]) === null || _this$questionsByDoma2 === void 0 ? void 0 : _this$questionsByDoma2[subdomain]) || [];
      var selected = questions.filter(function (q) {
        return _this7.answers[q.id] === 1;
      }).length;
      return {
        selected: selected,
        total: questions.length,
        ratio: questions.length > 0 ? Math.round(selected / questions.length * 100) : 0
      };
    },
    // 获取领域标签
    getDomainLabel: function getDomainLabel(domain) {
      return domainLabels[domain] || domain;
    },
    // 获取子领域标签
    getSubdomainLabel: function getSubdomainLabel(subdomain) {
      return subdomainLabels[subdomain] || subdomain;
    },
    // 检查 domain 是否有匹配的题目
    hasMatchingQuestionsInDomain: function hasMatchingQuestionsInDomain(domain) {
      if (!this.hasQuestionsInDomain(domain)) return false;

      // 如果没有搜索条件，返回 true
      if (!this.filters.keyword && this.filters.domains.length === 0 && !this.filters.onlyUnfinished) {
        return true;
      }

      // 检查是否有匹配的题目
      var questions = this.getQuestionsInDomain(domain);
      return this.applyFiltersToQuestions(questions).length > 0;
    },
    // 检查 subdomain 是否有匹配的题目
    hasMatchingQuestionsInSubdomain: function hasMatchingQuestionsInSubdomain(domain, subdomain) {
      var _this$questionsByDoma3;
      var questions = ((_this$questionsByDoma3 = this.questionsByDomain[domain]) === null || _this$questionsByDoma3 === void 0 ? void 0 : _this$questionsByDoma3[subdomain]) || [];
      if (questions.length === 0) return false;

      // 如果没有搜索条件，返回 true
      if (!this.filters.keyword && this.filters.domains.length === 0 && !this.filters.onlyUnfinished) {
        return true;
      }

      // 检查是否有匹配的题目
      return this.applyFiltersToQuestions(questions).length > 0;
    },
    // 获取可见的题目（应用筛选）
    getVisibleQuestions: function getVisibleQuestions(domain, subdomain) {
      var _this$questionsByDoma4;
      var questions = ((_this$questionsByDoma4 = this.questionsByDomain[domain]) === null || _this$questionsByDoma4 === void 0 ? void 0 : _this$questionsByDoma4[subdomain]) || [];

      // 应用筛选
      return this.applyFiltersToQuestions(questions);
    },
    // 对题目应用筛选
    applyFiltersToQuestions: function applyFiltersToQuestions(questions) {
      var _this8 = this;
      return questions.filter(function (q) {
        // 关键词筛选
        if (_this8.filters.keyword) {
          var keyword = _this8.filters.keyword.toLowerCase();
          if (!q.text.toLowerCase().includes(keyword)) {
            return false;
          }
        }

        // 领域筛选
        if (_this8.filters.domains.length > 0 && !_this8.filters.domains.includes(q.domain)) {
          return false;
        }

        // 仅看未完成
        if (_this8.filters.onlyUnfinished && _this8.answers[q.id] === 1) {
          return false;
        }
        return true;
      });
    },
    // 切换答案
    toggleAnswer: function toggleAnswer(qid) {
      var newValue = this.answers[qid] === 1 ? 0 : 1;
      // 使用 $set 确保响应式
      this.$set(this.answers, qid, newValue);
      // 更新版本号，强制 computed 重新计算
      this.answersVersion++;
      this.saveDraft();
      // 强制更新视图
      this.$forceUpdate();
    },
    // 领域筛选切换
    toggleDomainFilter: function toggleDomainFilter(domain) {
      var idx = this.filters.domains.indexOf(domain);
      if (idx >= 0) {
        this.filters.domains.splice(idx, 1);
      } else {
        this.filters.domains.push(domain);
      }
      this.saveDraft();
    },
    // 仅看未完成开关
    onUnfinishedToggle: function onUnfinishedToggle(e) {
      this.filters.onlyUnfinished = e.detail.value;
      this.saveDraft();
    },
    // 应用筛选（搜索时）
    applyFilters: function applyFilters() {
      var _this9 = this;
      // 如果有搜索关键词，自动展开包含匹配题目的 domain 和 subdomain
      if (this.filters.keyword) {
        this.allDomains.forEach(function (domain) {
          if (_this9.hasMatchingQuestionsInDomain(domain)) {
            // 展开 domain
            _this9.$set(_this9.expandedDomains, domain, true);

            // 展开有匹配题目的 subdomain
            var subdomains = _this9.getSubdomainsInDomain(domain);
            subdomains.forEach(function (subdomain) {
              if (_this9.hasMatchingQuestionsInSubdomain(domain, subdomain)) {
                _this9.$set(_this9.expandedSubdomains, "".concat(domain, "::").concat(subdomain), true);
              }
            });
          }
        });
        this.saveDraft();
      }
      this.$forceUpdate();
    },
    // 全选本领域
    selectAllInDomain: function selectAllInDomain(domain) {
      var _this10 = this;
      var questions = this.getQuestionsInDomain(domain);
      // 批量更新答案，使用 $set 确保响应式
      questions.forEach(function (q) {
        _this10.$set(_this10.answers, q.id, 1);
      });
      // 更新版本号，强制 computed 重新计算
      this.answersVersion++;
      this.saveDraft();
      // 强制更新视图，确保统计信息立即刷新
      this.$forceUpdate();
    },
    // 清空本领域
    clearDomain: function clearDomain(domain) {
      var _this11 = this;
      var questions = this.getQuestionsInDomain(domain);
      // 批量更新答案，使用 $set 确保响应式
      questions.forEach(function (q) {
        _this11.$set(_this11.answers, q.id, 0);
      });
      // 更新版本号，强制 computed 重新计算
      this.answersVersion++;
      this.saveDraft();
      // 强制更新视图，确保统计信息立即刷新
      this.$forceUpdate();
    },
    // 全选本子领域
    selectAllInSubdomain: function selectAllInSubdomain(domain, subdomain) {
      var _this$questionsByDoma5,
        _this12 = this;
      var questions = ((_this$questionsByDoma5 = this.questionsByDomain[domain]) === null || _this$questionsByDoma5 === void 0 ? void 0 : _this$questionsByDoma5[subdomain]) || [];
      // 批量更新答案，使用 $set 确保响应式
      questions.forEach(function (q) {
        _this12.$set(_this12.answers, q.id, 1);
      });
      // 更新版本号，强制 computed 重新计算
      this.answersVersion++;
      this.saveDraft();
      // 强制更新视图，确保统计信息立即刷新
      this.$forceUpdate();
    },
    // 清空本子领域
    clearSubdomain: function clearSubdomain(domain, subdomain) {
      var _this$questionsByDoma6,
        _this13 = this;
      var questions = ((_this$questionsByDoma6 = this.questionsByDomain[domain]) === null || _this$questionsByDoma6 === void 0 ? void 0 : _this$questionsByDoma6[subdomain]) || [];
      // 批量更新答案，使用 $set 确保响应式
      questions.forEach(function (q) {
        _this13.$set(_this13.answers, q.id, 0);
      });
      // 更新版本号，强制 computed 重新计算
      this.answersVersion++;
      this.saveDraft();
      // 强制更新视图，确保统计信息立即刷新
      this.$forceUpdate();
    },
    // 提交评估
    submitAssessment: function submitAssessment() {
      var _this14 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var _this14$childInfo, _this14$childInfo2;
        var currentChildId, submitResult, _submitResult$result, errorMsg, assessmentResult;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!_this14.isSubmitting) {
                  _context2.next = 2;
                  break;
                }
                return _context2.abrupt("return");
              case 2:
                currentChildId = ((_this14$childInfo = _this14.childInfo) === null || _this14$childInfo === void 0 ? void 0 : _this14$childInfo.childId) || ((_this14$childInfo2 = _this14.childInfo) === null || _this14$childInfo2 === void 0 ? void 0 : _this14$childInfo2._id);
                if (currentChildId) {
                  _context2.next = 7;
                  break;
                }
                uni.showToast({
                  title: '缺少儿童信息，请重新填写',
                  icon: 'none',
                  duration: 2000
                });
                setTimeout(function () {
                  uni.navigateBack();
                }, 2000);
                return _context2.abrupt("return");
              case 7:
                _this14.isSubmitting = true;
                uni.showLoading({
                  title: '提交中...',
                  mask: true
                });
                _context2.prev = 9;
                _context2.next = 12;
                return uniCloud.callFunction({
                  name: 'submitAssessment',
                  data: {
                    childId: currentChildId,
                    answers: _this14.answers
                  }
                });
              case 12:
                submitResult = _context2.sent;
                uni.hideLoading();
                if (!(!submitResult.result || !submitResult.result.ok)) {
                  _context2.next = 19;
                  break;
                }
                errorMsg = ((_submitResult$result = submitResult.result) === null || _submitResult$result === void 0 ? void 0 : _submitResult$result.msg) || '提交失败，请重试';
                uni.showToast({
                  title: errorMsg,
                  icon: 'none',
                  duration: 2000
                });
                _this14.isSubmitting = false;
                return _context2.abrupt("return");
              case 19:
                // 生成评估结果（包含云端返回的数据）
                assessmentResult = {
                  childInfo: _this14.childInfo,
                  answers: _this14.answers,
                  formState: _this14.formatFormState(),
                  checkedCount: _this14.derivedStats.global.selected,
                  totalCount: _this14.derivedStats.global.total,
                  progressPercent: _this14.derivedStats.global.ratio,
                  assessmentDate: new Date().toISOString(),
                  assessmentId: submitResult.result.assessmentId,
                  scorePercent: submitResult.result.scorePercent,
                  level: submitResult.result.level
                }; // 保存评估结果到本地
                uni.setStorageSync('assessmentResult', assessmentResult);

                // 清除草稿
                uni.removeStorageSync('assessmentDraft');
                uni.showToast({
                  title: '提交成功',
                  icon: 'success',
                  duration: 1000
                });

                // 延迟跳转
                setTimeout(function () {
                  uni.redirectTo({
                    url: '/pages/result/result'
                  });
                }, 1000);
                _context2.next = 32;
                break;
              case 26:
                _context2.prev = 26;
                _context2.t0 = _context2["catch"](9);
                uni.hideLoading();
                console.error('[submitAssessment] 提交异常:', _context2.t0);
                uni.showToast({
                  title: '提交失败：' + (_context2.t0.message || '网络错误'),
                  icon: 'none',
                  duration: 2000
                });
                _this14.isSubmitting = false;
              case 32:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[9, 26]]);
      }))();
    },
    // 格式化 formState（兼容旧格式）
    formatFormState: function formatFormState() {
      var _this15 = this;
      var formState = {};
      Object.keys(this.questionsByDomain).forEach(function (domain) {
        formState[domain] = [];
        Object.values(_this15.questionsByDomain[domain]).forEach(function (list) {
          list.forEach(function (q) {
            formState[domain].push(_objectSpread(_objectSpread({}, q), {}, {
              checked: _this15.answers[q.id] === 1
            }));
          });
        });
      });
      return formState;
    },
    // 回到顶部
    scrollToTop: function scrollToTop() {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 27)["uniCloud"]))

/***/ }),

/***/ 71:
/*!************************************************************************************************************************!*\
  !*** C:/Users/86182/Documents/HBuilderProjects/前端小程序/pages/assessment/assessment.vue?vue&type=style&index=0&lang=css& ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./assessment.vue?vue&type=style&index=0&lang=css& */ 72);
/* harmony import */ var _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 72:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/86182/Documents/HBuilderProjects/前端小程序/pages/assessment/assessment.vue?vue&type=style&index=0&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[64,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/assessment/assessment.js.map