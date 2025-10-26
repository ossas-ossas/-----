(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/result/result"],{

/***/ 71:
/*!**************************************************************************************************!*\
  !*** C:/Users/86182/Documents/HBuilderProjects/前端小程序/main.js?{"page":"pages%2Fresult%2Fresult"} ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
__webpack_require__(/*! @dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 27);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _result = _interopRequireDefault(__webpack_require__(/*! ./pages/result/result.vue */ 72));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_result.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 72:
/*!*******************************************************************************!*\
  !*** C:/Users/86182/Documents/HBuilderProjects/前端小程序/pages/result/result.vue ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _result_vue_vue_type_template_id_8b0659b4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./result.vue?vue&type=template&id=8b0659b4& */ 73);
/* harmony import */ var _result_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./result.vue?vue&type=script&lang=js& */ 75);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _result_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _result_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _result_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./result.vue?vue&type=style&index=0&lang=css& */ 77);
/* harmony import */ var _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 44);

var renderjs





/* normalize component */

var component = Object(_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _result_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _result_vue_vue_type_template_id_8b0659b4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _result_vue_vue_type_template_id_8b0659b4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _result_vue_vue_type_template_id_8b0659b4___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/result/result.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 73:
/*!**************************************************************************************************************!*\
  !*** C:/Users/86182/Documents/HBuilderProjects/前端小程序/pages/result/result.vue?vue&type=template&id=8b0659b4& ***!
  \**************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_result_vue_vue_type_template_id_8b0659b4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./result.vue?vue&type=template&id=8b0659b4& */ 74);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_result_vue_vue_type_template_id_8b0659b4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_result_vue_vue_type_template_id_8b0659b4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_result_vue_vue_type_template_id_8b0659b4___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_result_vue_vue_type_template_id_8b0659b4___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 74:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/86182/Documents/HBuilderProjects/前端小程序/pages/result/result.vue?vue&type=template&id=8b0659b4& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var render = function () {}
var staticRenderFns = []
var recyclableRender
var components



/***/ }),

/***/ 75:
/*!********************************************************************************************************!*\
  !*** C:/Users/86182/Documents/HBuilderProjects/前端小程序/pages/result/result.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_result_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./result.vue?vue&type=script&lang=js& */ 76);
/* harmony import */ var _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_result_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_result_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_result_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_result_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_result_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 76:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/86182/Documents/HBuilderProjects/前端小程序/pages/result/result.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  data: function data() {
    return {
      childInfo: {},
      ageBand: null,
      assessmentMode: '',
      isCorrectedAge: false,
      domainStats: {},
      overallCompletionRate: 0,
      recommendations: [],
      hasData: false
    };
  },
  onLoad: function onLoad() {
    this.loadAssessmentResult();
  },
  methods: {
    // 加载评估结果
    loadAssessmentResult: function loadAssessmentResult() {
      var result = uni.getStorageSync('assessmentResult');
      console.log('=== 加载评估结果 ===');
      console.log('评估结果:', result);
      if (!result) {
        uni.showToast({
          title: '未找到评估结果',
          icon: 'none'
        });
        setTimeout(function () {
          uni.navigateBack();
        }, 1500);
        return;
      }
      this.childInfo = result.childInfo || {};
      this.ageBand = result.ageBand;
      this.assessmentMode = result.assessmentMode || 'band';
      this.isCorrectedAge = result.isCorrectedAge || false;

      // 计算领域统计
      this.calculateDomainStats(result);

      // 生成建议
      this.generateRecommendations();
      console.log('=== 统计结果 ===');
      console.log('领域统计:', this.domainStats);
      console.log('总体完成率:', this.overallCompletionRate);
    },
    // 计算领域统计
    calculateDomainStats: function calculateDomainStats(result) {
      var _this = this;
      var stats = {};
      var totalPassed = 0;
      var totalQuestions = 0;

      // 按领域统计
      Object.keys(result.groupedQuestions).forEach(function (domain) {
        var questions = result.groupedQuestions[domain];
        var passed = questions.filter(function (q) {
          return result.questionAnswers[q.id] === true;
        }).length;
        var total = questions.length;
        var ratio = total > 0 ? passed / total : 0;
        stats[domain] = {
          passed: passed,
          total: total,
          ratio: ratio,
          level: _this.getLevelFromRatio(ratio)
        };
        totalPassed += passed;
        totalQuestions += total;
      });
      this.domainStats = stats;
      this.overallCompletionRate = totalQuestions > 0 ? Math.round(totalPassed / totalQuestions * 100) : 0;
      this.hasData = totalQuestions > 0;
      console.log('计算完成 - 总题目:', totalQuestions, '已完成:', totalPassed, '完成率:', this.overallCompletionRate + '%');
    },
    // 根据比例获取等级
    getLevelFromRatio: function getLevelFromRatio(ratio) {
      if (ratio >= 1) return 'normal'; // 常态 (蓝)
      if (ratio >= 2 / 3) return 'good'; // 良好 (绿)
      if (ratio >= 1 / 2) return 'fair'; // 普通 (黄)
      return 'poor'; // 差 (红)
    },
    // 获取等级样式类
    getLevelClass: function getLevelClass(level) {
      return {
        'level-normal': level === 'normal',
        'level-good': level === 'good',
        'level-fair': level === 'fair',
        'level-poor': level === 'poor'
      };
    },
    // 获取等级文本
    getLevelText: function getLevelText(level) {
      var levelMap = {
        'normal': '常态',
        'good': '良好',
        'fair': '普通',
        'poor': '差'
      };
      return levelMap[level] || '未知';
    },
    // 获取完成等级
    getCompletionLevel: function getCompletionLevel(rate) {
      if (rate >= 100) return '优秀';
      if (rate >= 80) return '良好';
      if (rate >= 60) return '一般';
      if (rate >= 40) return '需关注';
      return '需干预';
    },
    // 获取完成描述
    getCompletionDescription: function getCompletionDescription(rate) {
      if (rate >= 100) return '各项指标完全达标';
      if (rate >= 80) return '大部分指标达标，发育良好';
      if (rate >= 60) return '基本达标，部分方面需加强';
      if (rate >= 40) return '部分达标，建议重点关注';
      return '达标率较低，建议及时干预';
    },
    // 生成专业建议
    generateRecommendations: function generateRecommendations() {
      var _this2 = this;
      var recommendations = [];

      // 分析各领域表现
      var poorDomains = [];
      var fairDomains = [];
      var goodDomains = [];
      var normalDomains = [];
      Object.keys(this.domainStats).forEach(function (domain) {
        var stats = _this2.domainStats[domain];
        if (stats.level === 'poor') poorDomains.push(domain);else if (stats.level === 'fair') fairDomains.push(domain);else if (stats.level === 'good') goodDomains.push(domain);else if (stats.level === 'normal') normalDomains.push(domain);
      });

      // 根据总体表现给出建议
      if (this.overallCompletionRate >= 80) {
        recommendations.push('孩子发育状况良好，各项指标达到相应年龄段正常水平');
        recommendations.push('建议继续保持良好的养育环境和互动方式');
        recommendations.push('可以适当增加一些挑战性活动，促进进一步发展');
      } else if (this.overallCompletionRate >= 60) {
        recommendations.push('孩子发育基本正常，部分方面还有提升空间');
        recommendations.push('建议重点关注得分较低的发育维度');
        recommendations.push('可以寻求专业康复师的指导和建议');
      } else {
        recommendations.push('建议及时咨询专业医生或康复师');
        recommendations.push('进行更详细的发育评估和诊断');
        recommendations.push('制定个性化的早期干预计划');
      }

      // 针对具体领域给出建议
      if (poorDomains.length > 0) {
        recommendations.push("".concat(poorDomains.join('、'), "\u65B9\u9762\u9700\u8981\u91CD\u70B9\u5173\u6CE8\u548C\u8BAD\u7EC3"));
      }
      if (fairDomains.length > 0) {
        recommendations.push("".concat(fairDomains.join('、'), "\u65B9\u9762\u6709\u63D0\u5347\u7A7A\u95F4\uFF0C\u5EFA\u8BAE\u52A0\u5F3A\u7EC3\u4E60"));
      }
      if (goodDomains.length > 0) {
        recommendations.push("".concat(goodDomains.join('、'), "\u65B9\u9762\u8868\u73B0\u826F\u597D\uFF0C\u53EF\u4EE5\u7EE7\u7EED\u4FDD\u6301"));
      }
      if (normalDomains.length > 0) {
        recommendations.push("".concat(normalDomains.join('、'), "\u65B9\u9762\u5B8C\u5168\u8FBE\u6807\uFF0C\u662F\u5B69\u5B50\u7684\u4F18\u52BF\u9886\u57DF"));
      }

      // 添加通用建议
      recommendations.push('定期进行发育评估，追踪进步情况');
      recommendations.push('保持耐心和积极的态度，每个孩子都有自己的发育节奏');
      this.recommendations = recommendations;
    },
    // 查看历史记录
    viewHistory: function viewHistory() {
      uni.navigateTo({
        url: '/pages/history/history'
      });
    },
    // 重新评估
    newAssessment: function newAssessment() {
      uni.showModal({
        title: '重新评估',
        content: '确定要开始新的评估吗？当前评估结果将被覆盖。',
        success: function success(res) {
          if (res.confirm) {
            // 清除当前评估数据
            uni.removeStorageSync('assessmentForm');
            uni.removeStorageSync('assessmentResult');

            // 跳转到儿童信息页
            uni.redirectTo({
              url: '/pages/child-info/child-info'
            });
          }
        }
      });
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 77:
/*!****************************************************************************************************************!*\
  !*** C:/Users/86182/Documents/HBuilderProjects/前端小程序/pages/result/result.vue?vue&type=style&index=0&lang=css& ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_result_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Downloads/HBuilderX.4.76.2025082103/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./result.vue?vue&type=style&index=0&lang=css& */ 78);
/* harmony import */ var _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_result_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_result_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_result_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_result_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_4_76_2025082103_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_result_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 78:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/86182/Documents/HBuilderProjects/前端小程序/pages/result/result.vue?vue&type=style&index=0&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[71,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/result/result.js.map