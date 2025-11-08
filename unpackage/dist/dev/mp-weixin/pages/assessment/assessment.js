(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/assessment/assessment"],{

/***/ 63:
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
var _assessment = _interopRequireDefault(__webpack_require__(/*! ./pages/assessment/assessment.vue */ 64));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_assessment.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 64:
/*!***************************************************************************************!*\
  !*** C:/Users/86182/Documents/HBuilderProjects/前端小程序/pages/assessment/assessment.vue ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assessment_vue_vue_type_template_id_f35dbbf4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assessment.vue?vue&type=template&id=f35dbbf4& */ 65);
/* harmony import */ var _assessment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assessment.vue?vue&type=script&lang=js& */ 67);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _assessment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _assessment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _assessment_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assessment.vue?vue&type=style&index=0&lang=css& */ 70);
/* harmony import */ var _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 44);

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

/***/ 65:
/*!**********************************************************************************************************************!*\
  !*** C:/Users/86182/Documents/HBuilderProjects/前端小程序/pages/assessment/assessment.vue?vue&type=template&id=f35dbbf4& ***!
  \**********************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_template_id_f35dbbf4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./assessment.vue?vue&type=template&id=f35dbbf4& */ 66);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_template_id_f35dbbf4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_template_id_f35dbbf4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_template_id_f35dbbf4___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_template_id_f35dbbf4___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 66:
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

/***/ 67:
/*!****************************************************************************************************************!*\
  !*** C:/Users/86182/Documents/HBuilderProjects/前端小程序/pages/assessment/assessment.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./assessment.vue?vue&type=script&lang=js& */ 68);
/* harmony import */ var _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 68:
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
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 31));
var _questionBank = __webpack_require__(/*! @/common/questionBank.js */ 69);
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
      childInfo: {},
      // 防抖和智能保存相关
      saveDraftTimer: null,
      // 防抖定时器
      lastSavedAnswers: null // 记录上次保存的答案，用于判断是否需要更新
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
    var _this$childInfo, _this$childInfo2, _this$childInfo3, _this$childInfo4;
    // 登录守卫：检查是否已登录
    var token = uni.getStorageSync('uni_id_token');
    if (!token) {
      uni.navigateTo({
        url: '/uni_modules/uni-id-pages/pages/login/login-withpwd'
      });
      return;
    }

    // 每次页面显示时重新加载儿童信息（确保从 child-info 页面返回后能获取最新数据）
    this.loadChildInfo();
    console.log('[assessment] onShow: 重新加载儿童信息后', {
      hasChildId: !!((_this$childInfo = this.childInfo) !== null && _this$childInfo !== void 0 && _this$childInfo.childId || (_this$childInfo2 = this.childInfo) !== null && _this$childInfo2 !== void 0 && _this$childInfo2._id),
      childId: ((_this$childInfo3 = this.childInfo) === null || _this$childInfo3 === void 0 ? void 0 : _this$childInfo3.childId) || ((_this$childInfo4 = this.childInfo) === null || _this$childInfo4 === void 0 ? void 0 : _this$childInfo4._id)
    });
  },
  onLoad: function onLoad() {
    var _this$childInfo5,
      _this$childInfo6,
      _this2 = this;
    console.log('[assessment] onLoad start');
    this.loadChildInfo();

    // 检查是否需要清除旧草稿
    var draft = uni.getStorageSync('assessmentDraft');
    var currentChildId = ((_this$childInfo5 = this.childInfo) === null || _this$childInfo5 === void 0 ? void 0 : _this$childInfo5.childId) || ((_this$childInfo6 = this.childInfo) === null || _this$childInfo6 === void 0 ? void 0 : _this$childInfo6._id);
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
    // 加载儿童信息（兼容用户专属存储和普通存储）
    loadChildInfo: function loadChildInfo() {
      var _this$childInfo7, _this$childInfo8, _this$childInfo9;
      // 尝试从多个位置读取，优先用户专属存储
      var userKey = null;
      var foundChildInfo = null;
      try {
        // 尝试导入 getUserStorageKey（如果可用）
        var authModule = __webpack_require__(/*! @/common/auth.js */ 60);
        if (authModule && authModule.getUserStorageKey) {
          userKey = authModule.getUserStorageKey('childInfo');
          foundChildInfo = uni.getStorageSync(userKey);
        }
      } catch (e) {
        console.warn('[assessment] 无法导入 auth 模块:', e);
      }

      // 如果用户专属存储没有找到，尝试普通存储
      if (!foundChildInfo || Object.keys(foundChildInfo).length === 0) {
        foundChildInfo = uni.getStorageSync('childInfo');
      }

      // 如果还是没有找到，尝试搜索所有可能的用户专属存储键
      if (!foundChildInfo || Object.keys(foundChildInfo).length === 0) {
        try {
          var _authModule = __webpack_require__(/*! @/common/auth.js */ 60);
          if (_authModule && _authModule.getCurrentUserId) {
            var userId = _authModule.getCurrentUserId();
            if (userId) {
              // 尝试所有可能的键名格式
              var possibleKeys = ["childInfo_".concat(userId), "childInfo_".concat(userId, "_"), "childInfo_user_".concat(userId)];
              for (var _i = 0, _possibleKeys = possibleKeys; _i < _possibleKeys.length; _i++) {
                var key = _possibleKeys[_i];
                var data = uni.getStorageSync(key);
                if (data && Object.keys(data).length > 0) {
                  foundChildInfo = data;
                  userKey = key;
                  break;
                }
              }
            }
          }
        } catch (e) {
          console.warn('[assessment] 搜索用户专属存储失败:', e);
        }
      }

      // 设置 childInfo，确保不为空
      this.childInfo = foundChildInfo || {};

      // 调试日志
      console.log('[assessment] 加载儿童信息:', {
        hasChildInfo: Object.keys(this.childInfo).length > 0,
        childId: ((_this$childInfo7 = this.childInfo) === null || _this$childInfo7 === void 0 ? void 0 : _this$childInfo7.childId) || ((_this$childInfo8 = this.childInfo) === null || _this$childInfo8 === void 0 ? void 0 : _this$childInfo8._id),
        childName: (_this$childInfo9 = this.childInfo) === null || _this$childInfo9 === void 0 ? void 0 : _this$childInfo9.name,
        userKey: userKey,
        fromUserStorage: !!userKey && !!uni.getStorageSync(userKey),
        fromLegacyStorage: !!uni.getStorageSync('childInfo'),
        childInfoKeys: Object.keys(this.childInfo || {})
      });
    },
    // 加载草稿
    loadDraft: function loadDraft() {
      var _this$childInfo10,
        _this$childInfo11,
        _this4 = this;
      var draft = uni.getStorageSync('assessmentDraft');
      var currentChildId = ((_this$childInfo10 = this.childInfo) === null || _this$childInfo10 === void 0 ? void 0 : _this$childInfo10.childId) || ((_this$childInfo11 = this.childInfo) === null || _this$childInfo11 === void 0 ? void 0 : _this$childInfo11._id);
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
    // 保存草稿（优化：添加防抖和智能保存）
    saveDraft: function saveDraft() {
      var _arguments = arguments,
        _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var _this5$childInfo, _this5$childInfo2;
        var saveToCloud, currentChildId, answersStr;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                saveToCloud = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : true;
                currentChildId = ((_this5$childInfo = _this5.childInfo) === null || _this5$childInfo === void 0 ? void 0 : _this5$childInfo.childId) || ((_this5$childInfo2 = _this5.childInfo) === null || _this5$childInfo2 === void 0 ? void 0 : _this5$childInfo2._id); // 总是保存到本地（快速响应）
                uni.setStorageSync('assessmentDraft', {
                  childId: currentChildId,
                  answers: _this5.answers,
                  expandedDomains: _this5.expandedDomains,
                  expandedSubdomains: _this5.expandedSubdomains,
                  filters: _this5.filters
                });

                // 如果没有 childId，只保存到本地
                if (!(!currentChildId || !saveToCloud)) {
                  _context2.next = 5;
                  break;
                }
                return _context2.abrupt("return");
              case 5:
                // 检查答案是否真的变化了（减少不必要的数据库写入）
                answersStr = JSON.stringify(_this5.answers);
                if (!(_this5.lastSavedAnswers === answersStr)) {
                  _context2.next = 9;
                  break;
                }
                // 答案未变化，不需要更新数据库
                console.log('[saveDraft] 答案未变化，跳过云端保存');
                return _context2.abrupt("return");
              case 9:
                // 清除之前的定时器（防抖）
                if (_this5.saveDraftTimer) {
                  clearTimeout(_this5.saveDraftTimer);
                }

                // 设置防抖：3秒后才真正保存到云端（减少写入频率）
                _this5.saveDraftTimer = setTimeout( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
                  var result;
                  return _regenerator.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.prev = 0;
                          _context.next = 3;
                          return uniCloud.callFunction({
                            name: 'saveAssessment',
                            data: {
                              childId: currentChildId,
                              answers: _this5.answers
                            }
                          });
                        case 3:
                          result = _context.sent;
                          if (result.result && !result.result.ok) {
                            console.error('[saveDraft] 云端保存失败:', result.result.msg);
                          } else {
                            console.log('[saveDraft] 云端保存成功');
                            // 记录已保存的答案
                            _this5.lastSavedAnswers = JSON.stringify(_this5.answers);
                          }
                          _context.next = 10;
                          break;
                        case 7:
                          _context.prev = 7;
                          _context.t0 = _context["catch"](0);
                          console.error('[saveDraft] 云端保存异常:', _context.t0);
                          // 静默失败，不影响用户体验
                        case 10:
                          _this5.saveDraftTimer = null;
                        case 11:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, null, [[0, 7]]);
                })), 3000); // 3秒防抖
              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    // 切换 domain
    toggleDomain: function toggleDomain(domain) {
      this.$set(this.expandedDomains, domain, !this.expandedDomains[domain]);
      // 只保存到本地，不触发云端保存（减少数据库写入）
      this.saveDraft(false);
    },
    // 切换 subdomain
    toggleSubdomain: function toggleSubdomain(key) {
      this.$set(this.expandedSubdomains, key, !this.expandedSubdomains[key]);
      // 只保存到本地，不触发云端保存（减少数据库写入）
      this.saveDraft(false);
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
      // 筛选变化只保存到本地，不触发云端保存
      this.saveDraft(false);
    },
    // 仅看未完成开关
    onUnfinishedToggle: function onUnfinishedToggle(e) {
      this.filters.onlyUnfinished = e.detail.value;
      // 筛选变化只保存到本地，不触发云端保存
      this.saveDraft(false);
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
        // 筛选变化只保存到本地，不触发云端保存
        this.saveDraft(false);
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
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var _this14$childInfo, _this14$childInfo2, _this14$childInfo3, _uni$getStorageSync, _uni$getStorageSync2, _this14$childInfo4, _this14$childInfo5;
        var currentChildId, directChildInfo, directChildId, authModule, userId, possibleKeys, _i2, _possibleKeys2, key, data, id, hasRequiredFields, _result$data, _result$data2, clinical, diagnosis, habits, saveResult, result, newChildId, _authModule2, userKey, finalChildId, cleanAnswers, invalidCount, submitResult, _submitResult$result, _submitResult$result2, errorMsg, errorCode, userMsg, assessmentResult;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!_this14.isSubmitting) {
                  _context3.next = 2;
                  break;
                }
                return _context3.abrupt("return");
              case 2:
                // 提交前重新加载儿童信息，确保获取最新数据
                _this14.loadChildInfo();
                currentChildId = ((_this14$childInfo = _this14.childInfo) === null || _this14$childInfo === void 0 ? void 0 : _this14$childInfo.childId) || ((_this14$childInfo2 = _this14.childInfo) === null || _this14$childInfo2 === void 0 ? void 0 : _this14$childInfo2._id);
                console.log('[assessment] 提交前检查儿童信息:', {
                  hasChildInfo: Object.keys(_this14.childInfo).length > 0,
                  childId: currentChildId,
                  childName: (_this14$childInfo3 = _this14.childInfo) === null || _this14$childInfo3 === void 0 ? void 0 : _this14$childInfo3.name,
                  childInfoKeys: Object.keys(_this14.childInfo || {}),
                  storageCheck: {
                    legacy: !!uni.getStorageSync('childInfo'),
                    legacyChildId: ((_uni$getStorageSync = uni.getStorageSync('childInfo')) === null || _uni$getStorageSync === void 0 ? void 0 : _uni$getStorageSync.childId) || ((_uni$getStorageSync2 = uni.getStorageSync('childInfo')) === null || _uni$getStorageSync2 === void 0 ? void 0 : _uni$getStorageSync2._id)
                  }
                });

                // 如果没有 childId，尝试多种方式获取
                if (currentChildId) {
                  _context3.next = 82;
                  break;
                }
                console.warn('[assessment] 缺少 childId，尝试从多个位置查找');

                // 尝试1: 直接读取普通存储
                directChildInfo = uni.getStorageSync('childInfo');
                directChildId = (directChildInfo === null || directChildInfo === void 0 ? void 0 : directChildInfo.childId) || (directChildInfo === null || directChildInfo === void 0 ? void 0 : directChildInfo._id);
                if (!directChildId) {
                  _context3.next = 15;
                  break;
                }
                console.log('[assessment] 从普通存储找到 childId:', directChildId);
                _this14.childInfo = directChildInfo;
                currentChildId = directChildId;
                _context3.next = 40;
                break;
              case 15:
                _context3.prev = 15;
                authModule = __webpack_require__(/*! @/common/auth.js */ 60);
                if (!(authModule && authModule.getCurrentUserId)) {
                  _context3.next = 35;
                  break;
                }
                userId = authModule.getCurrentUserId();
                if (!userId) {
                  _context3.next = 35;
                  break;
                }
                possibleKeys = ["childInfo_".concat(userId), "childInfo_".concat(userId, "_"), "childInfo_user_".concat(userId)];
                _i2 = 0, _possibleKeys2 = possibleKeys;
              case 22:
                if (!(_i2 < _possibleKeys2.length)) {
                  _context3.next = 35;
                  break;
                }
                key = _possibleKeys2[_i2];
                data = uni.getStorageSync(key);
                if (!data) {
                  _context3.next = 32;
                  break;
                }
                id = data.childId || data._id;
                if (!id) {
                  _context3.next = 32;
                  break;
                }
                console.log('[assessment] 从用户专属存储找到 childId:', id, 'key:', key);
                _this14.childInfo = data;
                currentChildId = id;
                return _context3.abrupt("break", 35);
              case 32:
                _i2++;
                _context3.next = 22;
                break;
              case 35:
                _context3.next = 40;
                break;
              case 37:
                _context3.prev = 37;
                _context3.t0 = _context3["catch"](15);
                console.warn('[assessment] 搜索用户专属存储失败:', _context3.t0);
              case 40:
                if (!(!currentChildId && _this14.childInfo && Object.keys(_this14.childInfo).length > 0)) {
                  _context3.next = 79;
                  break;
                }
                // 检查是否有必要的字段（姓名、性别、出生日期等）
                hasRequiredFields = _this14.childInfo.name && _this14.childInfo.gender && _this14.childInfo.birthDate;
                if (!hasRequiredFields) {
                  _context3.next = 75;
                  break;
                }
                console.log('[assessment] 数据完整但缺少 childId，尝试重新保存获取 childId');
                uni.showLoading({
                  title: '正在保存儿童信息...',
                  mask: true
                });
                _context3.prev = 45;
                // 准备数据（与 child-info.vue 中的格式一致）
                clinical = _this14.childInfo.clinical || {};
                diagnosis = clinical.medicalDiagnosis || [];
                habits = {
                  walkTime: clinical.walkingTime || '',
                  crawl: clinical.crawlStatus || '',
                  crawlMonths: clinical.crawlMonths || '',
                  kneel: clinical.kneelWalk,
                  hand: clinical.handedness || ''
                };
                _context3.next = 51;
                return uniCloud.callFunction({
                  name: 'saveChildProfile',
                  data: {
                    name: _this14.childInfo.name,
                    gender: _this14.childInfo.gender,
                    birthDate: _this14.childInfo.birthDate,
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
                    caregiver: _this14.childInfo.caregiver || '',
                    phone: _this14.childInfo.phone || '',
                    videos: clinical.videos || [],
                    homeGuide: clinical.homeGuide,
                    notes: _this14.childInfo.notes || ''
                  }
                });
              case 51:
                saveResult = _context3.sent;
                uni.hideLoading();

                // 尝试从返回结果中提取 childId
                result = saveResult.result || {};
                newChildId = ((_result$data = result.data) === null || _result$data === void 0 ? void 0 : _result$data.id) || ((_result$data2 = result.data) === null || _result$data2 === void 0 ? void 0 : _result$data2._id) || result.id || result.childId;
                if (!newChildId) {
                  _context3.next = 62;
                  break;
                }
                console.log('[assessment] 重新保存成功，获取到 childId:', newChildId);
                // 更新 childInfo
                _this14.childInfo.childId = newChildId;
                currentChildId = newChildId;

                // 保存更新后的 childInfo
                try {
                  _authModule2 = __webpack_require__(/*! @/common/auth.js */ 60);
                  if (_authModule2 && _authModule2.getUserStorageKey) {
                    userKey = _authModule2.getUserStorageKey('childInfo');
                    uni.setStorageSync(userKey, _this14.childInfo);
                  }
                  uni.setStorageSync('childInfo', _this14.childInfo);
                } catch (e) {
                  console.warn('[assessment] 保存更新后的 childInfo 失败:', e);
                }
                _context3.next = 65;
                break;
              case 62:
                console.error('[assessment] 重新保存失败，未获取到 childId');
                uni.showModal({
                  title: '保存失败',
                  content: '无法保存儿童信息，请返回重新填写儿童信息。',
                  confirmText: '返回填写',
                  cancelText: '取消',
                  success: function success(res) {
                    if (res.confirm) {
                      uni.navigateTo({
                        url: '/pages/child-info/child-info'
                      });
                    }
                  }
                });
                return _context3.abrupt("return");
              case 65:
                _context3.next = 73;
                break;
              case 67:
                _context3.prev = 67;
                _context3.t1 = _context3["catch"](45);
                uni.hideLoading();
                console.error('[assessment] 重新保存儿童信息异常:', _context3.t1);
                uni.showModal({
                  title: '保存失败',
                  content: '无法保存儿童信息：' + (_context3.t1.message || '网络错误') + '。请返回重新填写儿童信息。',
                  confirmText: '返回填写',
                  cancelText: '取消',
                  success: function success(res) {
                    if (res.confirm) {
                      uni.navigateTo({
                        url: '/pages/child-info/child-info'
                      });
                    }
                  }
                });
                return _context3.abrupt("return");
              case 73:
                _context3.next = 77;
                break;
              case 75:
                // 数据不完整，提示用户返回填写
                uni.showModal({
                  title: '缺少儿童信息',
                  content: '儿童信息不完整，请返回重新填写完整的儿童信息。',
                  confirmText: '返回填写',
                  cancelText: '取消',
                  success: function success(res) {
                    if (res.confirm) {
                      uni.navigateTo({
                        url: '/pages/child-info/child-info'
                      });
                    }
                  }
                });
                return _context3.abrupt("return");
              case 77:
                _context3.next = 82;
                break;
              case 79:
                if (currentChildId) {
                  _context3.next = 82;
                  break;
                }
                // 确实没有数据，提示用户
                uni.showModal({
                  title: '缺少儿童信息',
                  content: '未找到儿童信息，请先填写儿童信息。',
                  confirmText: '去填写',
                  cancelText: '取消',
                  success: function success(res) {
                    if (res.confirm) {
                      uni.navigateTo({
                        url: '/pages/child-info/child-info'
                      });
                    }
                  }
                });
                return _context3.abrupt("return");
              case 82:
                // 确保使用最新的 childId
                finalChildId = ((_this14$childInfo4 = _this14.childInfo) === null || _this14$childInfo4 === void 0 ? void 0 : _this14$childInfo4.childId) || ((_this14$childInfo5 = _this14.childInfo) === null || _this14$childInfo5 === void 0 ? void 0 : _this14$childInfo5._id) || currentChildId;
                if (finalChildId) {
                  _context3.next = 87;
                  break;
                }
                console.error('[assessment] 最终仍然没有 childId');
                uni.showToast({
                  title: '缺少儿童信息，无法提交',
                  icon: 'none',
                  duration: 2000
                });
                return _context3.abrupt("return");
              case 87:
                _this14.isSubmitting = true;
                uni.showLoading({
                  title: '提交中...',
                  mask: true
                });
                _context3.prev = 89;
                // 清理答案数据：只保留值为 0 或 1 的答案
                cleanAnswers = {};
                invalidCount = 0;
                Object.keys(_this14.answers).forEach(function (qid) {
                  var value = _this14.answers[qid];
                  // 确保答案为数字 0 或 1
                  if (value === 0 || value === 1 || value === '0' || value === '1') {
                    cleanAnswers[qid] = value === '0' ? 0 : value === '1' ? 1 : value;
                  } else {
                    invalidCount++;
                    console.warn("[assessment] \u8DF3\u8FC7\u65E0\u6548\u7B54\u6848: qid=".concat(qid, ", value=").concat(value, " (\u7C7B\u578B: ").concat((0, _typeof2.default)(value), ")"));
                  }
                });
                if (invalidCount > 0) {
                  console.warn("[assessment] \u6E05\u7406\u4E86 ".concat(invalidCount, " \u4E2A\u65E0\u6548\u7B54\u6848"));
                }
                console.log('[assessment] 提交答案统计:', {
                  总数: Object.keys(_this14.answers).length,
                  有效答案: Object.keys(cleanAnswers).length,
                  无效答案: invalidCount
                });

                // 检查是否有有效答案
                if (!(Object.keys(cleanAnswers).length === 0)) {
                  _context3.next = 100;
                  break;
                }
                uni.hideLoading();
                uni.showModal({
                  title: '提交失败',
                  content: '没有有效的答案数据，请至少完成一道题目后再提交。',
                  showCancel: false,
                  confirmText: '确定'
                });
                _this14.isSubmitting = false;
                return _context3.abrupt("return");
              case 100:
                _context3.next = 102;
                return uniCloud.callFunction({
                  name: 'submitAssessment',
                  data: {
                    childId: finalChildId,
                    answers: cleanAnswers
                  }
                });
              case 102:
                submitResult = _context3.sent;
                uni.hideLoading();

                // 检查返回结果
                if (!(!submitResult || !submitResult.result)) {
                  _context3.next = 109;
                  break;
                }
                console.error('[assessment] 提交返回结果异常:', submitResult);
                uni.showToast({
                  title: '提交失败：服务器返回异常',
                  icon: 'none',
                  duration: 3000
                });
                _this14.isSubmitting = false;
                return _context3.abrupt("return");
              case 109:
                if (submitResult.result.ok) {
                  _context3.next = 118;
                  break;
                }
                errorMsg = ((_submitResult$result = submitResult.result) === null || _submitResult$result === void 0 ? void 0 : _submitResult$result.msg) || '提交失败，请重试';
                errorCode = (_submitResult$result2 = submitResult.result) === null || _submitResult$result2 === void 0 ? void 0 : _submitResult$result2.code;
                console.error('[assessment] 提交失败:', {
                  code: errorCode,
                  msg: errorMsg,
                  result: submitResult.result
                });

                // 根据错误码显示不同的提示
                userMsg = errorMsg;
                if (errorCode === 404) {
                  userMsg = '未找到对应的题目数据，可能是题目数据未初始化。请联系管理员。';
                } else if (errorCode === 500) {
                  userMsg = '服务器错误：' + errorMsg;
                }
                uni.showModal({
                  title: '提交失败',
                  content: userMsg,
                  showCancel: false,
                  confirmText: '确定'
                });
                _this14.isSubmitting = false;
                return _context3.abrupt("return");
              case 118:
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
                _context3.next = 131;
                break;
              case 125:
                _context3.prev = 125;
                _context3.t2 = _context3["catch"](89);
                uni.hideLoading();
                console.error('[submitAssessment] 提交异常:', _context3.t2);
                uni.showToast({
                  title: '提交失败：' + (_context3.t2.message || '网络错误'),
                  icon: 'none',
                  duration: 2000
                });
                _this14.isSubmitting = false;
              case 131:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[15, 37], [45, 67], [89, 125]]);
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

/***/ 70:
/*!************************************************************************************************************************!*\
  !*** C:/Users/86182/Documents/HBuilderProjects/前端小程序/pages/assessment/assessment.vue?vue&type=style&index=0&lang=css& ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./assessment.vue?vue&type=style&index=0&lang=css& */ 71);
/* harmony import */ var _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_assessment_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 71:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/86182/Documents/HBuilderProjects/前端小程序/pages/assessment/assessment.vue?vue&type=style&index=0&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[63,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/assessment/assessment.js.map