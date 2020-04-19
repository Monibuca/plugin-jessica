(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["plugin-jessica"] = factory();
	else
		root["plugin-jessica"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "86f2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_467c9f3d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f0e4");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_467c9f3d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_467c9f3d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_467c9f3d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "f0e4":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"086ccc34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=467c9f3d&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.Rooms==null),expression:"Rooms==null"}]},[_c('mu-data-table',{attrs:{"columns":_vm.columns,"data":_vm.Rooms,"min-col-width":50},on:{"row-dblclick":_vm.preview,"row-click":function($event){return _vm.$toast.message('双击预览')}},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('td',{staticClass:"is-center"},[_vm._v(_vm._s(scope.row.StreamPath))]),_c('td',{staticClass:"is-center"},[_vm._v(_vm._s(scope.row.Type||"await"))]),_c('td',{staticClass:"is-center"},[_c('StartTime',{attrs:{"value":scope.row.StartTime}})],1),_c('td',{staticClass:"is-center"},[_vm._v(_vm._s(_vm.SoundFormat(scope.row.AudioInfo.SoundFormat)))]),_c('td',{staticClass:"is-center"},[_vm._v(_vm._s(_vm.SoundRate(scope.row.AudioInfo.SoundRate)))]),_c('td',{staticClass:"is-center"},[_vm._v(_vm._s(scope.row.AudioInfo.SoundType))]),_c('td',{staticClass:"is-center"},[_vm._v(_vm._s(_vm.CodecID(scope.row.VideoInfo.CodecID)))]),_c('td',{staticClass:"is-center"},[_vm._v(_vm._s(scope.row.VideoInfo.SPSInfo.Width)+"x"+_vm._s(scope.row.VideoInfo.SPSInfo.Height))]),_c('td',{staticClass:"is-center"},[_vm._v(_vm._s(scope.row.AudioInfo.PacketCount)+"/"+_vm._s(scope.row.VideoInfo.PacketCount))]),_c('td',{staticClass:"is-center"},[_vm._v(_vm._s(_vm.getSubscriberCount(scope.row)))])]}}])}),_c('Jessibuca',{ref:"jessibuca",attrs:{"videoCodec":_vm.currentStream && _vm.CodecID(_vm.currentStream.VideoInfo.CodecID),"audioCodec":_vm.currentStream && _vm.SoundFormat(_vm.currentStream.AudioInfo.SoundFormat)},model:{value:(_vm.showPreview),callback:function ($$v) {_vm.showPreview=$$v},expression:"showPreview"}}),_c('Subscribers',{attrs:{"data":_vm.currentStream && _vm.currentStream.SubscriberInfo || []},model:{value:(_vm.showSubscribers),callback:function ($$v) {_vm.showSubscribers=$$v},expression:"showSubscribers"}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/App.vue?vue&type=template&id=467c9f3d&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"086ccc34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Jessibuca.vue?vue&type=template&id=6ae4b67f&scoped=true&
var Jessibucavue_type_template_id_6ae4b67f_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('Modal',_vm._g(_vm._b({attrs:{"draggable":"","title":_vm.url},on:{"on-ok":_vm.onClosePreview,"on-cancel":_vm.onClosePreview}},'Modal',_vm.$attrs,false),_vm.$listeners),[_c('canvas',{staticStyle:{"background":"black"},attrs:{"id":"canvas","width":"488","height":"275"}}),_c('div',{attrs:{"slot":"footer"},slot:"footer"},[(_vm.audioEnabled)?_c('Button',{attrs:{"icon":"md-volume-up"},on:{"click":_vm.turnOff}}):_c('Button',{attrs:{"icon":"md-volume-off"},on:{"click":_vm.turnOn}})],1)])}
var Jessibucavue_type_template_id_6ae4b67f_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Jessibuca.vue?vue&type=template&id=6ae4b67f&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Jessibuca.vue?vue&type=script&lang=js&
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

let h5lc = null;
/* harmony default export */ var Jessibucavue_type_script_lang_js_ = ({
    name: "Jessibuca",
    props: {
        audioCodec: String,
        videoCodec: String
    },
    data() {
        return {
            audioEnabled: true,
            url: "",
            decoderTable: {
                AAC_AVC: "ff",
                AAC_H265: "hevc_aac",
                MP3_AVC: "ff_mp3",
                MP3_H265: "hevc_mp3",
                AVC: "ff",
                H265: "hevc_aac"
            }
        };
    },
    watch: {
        audioEnabled(value) {
            h5lc.audioEnabled(value);
        },
        decoder(value) {
            if (h5lc) {
                h5lc.destroy();
            }
            h5lc = new window.Jessibuca({
                canvas: document.getElementById("canvas"),
                decoder: value
            });
        }
    },
    computed: {
        decoder() {
            let js = this.decoderTable[this.audioCodec + "_" + this.videoCodec];
            if (!js) {
                js = this.decoderTable[this.videoCodec] || "ff";
            }
            return "jessibuca/" + js + ".js";
        }
    },
    mounted() {
        let s = document.createElement("script");
        s.src = "/jessibuca/renderer.js";
        s.onload = function() {
            s.onload = null;
            h5lc = new window.Jessibuca({
                canvas: document.getElementById("canvas"),
                decoder: "jessibuca/ff.js"
            });
        };
        this.$root.$el.append(s);
    },
    methods: {
        play(url) {
            this.url = url;
            h5lc.play(url);
        },
        onClosePreview() {
            h5lc.close();
        },
        destroy() {
            h5lc.destroy();
        },
        turnOn() {
            this.audioEnabled = true;
        },
        turnOff() {
            this.audioEnabled = false;
        }
    }
});

// CONCATENATED MODULE: ./src/components/Jessibuca.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Jessibucavue_type_script_lang_js_ = (Jessibucavue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/Jessibuca.vue





/* normalize component */

var component = normalizeComponent(
  components_Jessibucavue_type_script_lang_js_,
  Jessibucavue_type_template_id_6ae4b67f_scoped_true_render,
  Jessibucavue_type_template_id_6ae4b67f_scoped_true_staticRenderFns,
  false,
  null,
  "6ae4b67f",
  null
  
)

/* harmony default export */ var Jessibuca = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"086ccc34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Subscribers.vue?vue&type=template&id=e52213f4&
var Subscribersvue_type_template_id_e52213f4_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('Modal',_vm._g(_vm._b({attrs:{"draggable":"","title":"查看订阅者"}},'Modal',_vm.$attrs,false),_vm.$listeners),[_c('Table',{attrs:{"columns":_vm.subtableColumns,"data":_vm.data}})],1)}
var Subscribersvue_type_template_id_e52213f4_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Subscribers.vue?vue&type=template&id=e52213f4&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"086ccc34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/StartTime.vue?vue&type=template&id=062b9730&scoped=true&
var StartTimevue_type_template_id_062b9730_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('Poptip',{attrs:{"trigger":"hover","content":'⌚️'+ new Date(_vm.value).toLocaleString()}},[_c('Time',{attrs:{"time":new Date(_vm.value)}})],1)}
var StartTimevue_type_template_id_062b9730_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/StartTime.vue?vue&type=template&id=062b9730&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/StartTime.vue?vue&type=script&lang=js&
//
//
//
//
//
//

/* harmony default export */ var StartTimevue_type_script_lang_js_ = ({
    name: "StartTime",
    props:{
        value:String
    }
});

// CONCATENATED MODULE: ./src/components/StartTime.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_StartTimevue_type_script_lang_js_ = (StartTimevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/StartTime.vue





/* normalize component */

var StartTime_component = normalizeComponent(
  components_StartTimevue_type_script_lang_js_,
  StartTimevue_type_template_id_062b9730_scoped_true_render,
  StartTimevue_type_template_id_062b9730_scoped_true_staticRenderFns,
  false,
  null,
  "062b9730",
  null
  
)

/* harmony default export */ var StartTime = (StartTime_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Subscribers.vue?vue&type=script&lang=js&
//
//
//
//
//
//


/* harmony default export */ var Subscribersvue_type_script_lang_js_ = ({
  props: {
    data: Array
  },
  data() {
    return {
      subtableColumns: [
        {
          title: "类型",
          key: "Type"
        },
        {
          title: "Name",
          key: "ID"
        },
        {
          title: "订阅时间",
          render(h, { row }) {
            return h(StartTime, {
              props: {
                value: row.SubscribeTime
              }
            });
          }
        },
        {
          title: "丢帧",
          render(h, { row }) {
            return h(
              "span",
              row.TotalPacket ? row.TotalDrop + "/" + row.TotalPacket : ""
            );
          }
        },
        {
          title: "Buffer",
          render(h, { row }) {
            return h("Progress", {
              props: {
                percent: Math.floor((row.BufferLength * 99) / 1024),
                "text-inside": true,
                "stroke-width": 20,
                "stroke-color": ["#87d068", "#ff0000"]
              }
            });
          }
        }
      ]
    };
  }
});

// CONCATENATED MODULE: ./src/components/Subscribers.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Subscribersvue_type_script_lang_js_ = (Subscribersvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/Subscribers.vue





/* normalize component */

var Subscribers_component = normalizeComponent(
  components_Subscribersvue_type_script_lang_js_,
  Subscribersvue_type_template_id_e52213f4_render,
  Subscribersvue_type_template_id_e52213f4_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Subscribers = (Subscribers_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=script&lang=js&
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

const SoundFormat = {
    0: "Linear PCM, platform endian",
    1: "ADPCM",
    2: "MP3",
    3: "Linear PCM, little endian",
    4: "Nellymoser 16kHz mono",
    5: "Nellymoser 8kHz mono",
    6: "Nellymoser",
    7: "G.711 A-law logarithmic PCM",
    8: "G.711 mu-law logarithmic PCM",
    9: "reserved",
    10: "AAC",
    11: "Speex",
    14: "MP3 8Khz",
    15: "Device-specific sound"
};
const CodecID = {
    1: "JPEG (currently unused)",
    2: "Sorenson H.263",
    3: "Screen video",
    4: "On2 VP6",
    5: "On2 VP6 with alpha channel",
    6: "Screen video version 2",
    7: "AVC",
    12: "H265"
};



let summaryES = null;
/* harmony default export */ var Appvue_type_script_lang_js_ = ({
    components: {
        Jessibuca: Jessibuca,
        Subscribers: Subscribers,
        StartTime: StartTime
    },
    props:{
        ListenAddr:String
    },
    data() {
        return {
            showPreview: false,
            currentStream: null,
            showSubscribers: false,
            // typeMap: {
            //     Receiver: "📡",
            //     FlvFile: "🎥",
            //     TS: "🎬",
            //     HLS: "🍎",
            //     "": "⏳",
            //     Match365: "🏆",
            //     RTMP: "🚠"
            // },
            Rooms: null,
            columns: [
                {
                    title: "房间",
                    name: "StreamPath",
                    sortable: true,
                    align: "center",
                    cellAlign: "center"
                },
                {
                    title: "类型",
                    name: "Type",
                    sortable: true,
                    align: "center",
                    cellAlign: "center"
                },
                {
                    title: "开始时间",
                    name: "StartTime",
                    sortable: true,
                    align: "center",
                    cellAlign: "center"
                },
                {
                    title: "音频格式",
                    name: "AudioInfo",
                    align: "center",
                    cellAlign: "center"
                },
                {
                    title: "采样率",
                    name: "AudioInfo",
                    align: "center",
                    cellAlign: "center"
                },
                {
                    title: "声道",
                    name: "AudioInfo",
                    align: "center",
                    cellAlign: "center"
                },
                {
                    title: "视频格式",
                    name: "VideoInfo",
                    align: "center",
                    cellAlign: "center"
                },
                {
                    title: "分辨率",
                    name: "VideoInfo",
                    align: "center",
                    cellAlign: "center"
                },
                {
                    title: "数据包",
                    name: "",
                    align: "center",
                    cellAlign: "center"
                },
                {
                    title: "订阅者",
                    name: "Subscribes",
                    align: "center",
                    cellAlign: "center"
                }
            ]
        };
    },
    computed: {
        host() {
            return location.hostname + ":" + this.ListenAddr.split(":").pop();
        }
    },
    methods: {
        getSubscriberCount(item) {
            if (
                this.currentStream &&
                this.currentStream.StreamPath == item.StreamPath
            ) {
                this.currentStream = item;
            }
            return item.SubscriberInfo ? item.SubscriberInfo.length : 0;
        },
        preview(index, row, event) {
            this.currentStream = row;
            this.onPlay("ws://" + this.host + "/" + row.StreamPath);
        },
        onPlay(url) {
            this.showPreview = true;
            this.$nextTick(() => this.$refs.jessibuca.play(url));
        },
        SoundFormat(soundFormat) {
            return SoundFormat[soundFormat];
        },
        CodecID(codec) {
            return CodecID[codec];
        },
        SoundRate(rate) {
            return rate > 1000 ? rate / 1000 + "kHz" : rate + "Hz";
        },
        onShowDetail(item) {
            this.showSubscribers = true;
            this.currentStream = item;
        },
        fetchSummary() {
            summaryES = new EventSource("/api/summary");
            summaryES.onmessage = evt => {
                if (!evt.data) return;
                let summary = JSON.parse(evt.data);
                summary.Address = location.hostname;
                if (!summary.Rooms) summary.Rooms = [];
                summary.Rooms.sort((a, b) =>
                    a.StreamPath > b.StreamPath ? 1 : -1
                );
                this.Rooms = summary.Rooms;
            };
        }
    },
    mounted() {
        console.log(this);
        this.fetchSummary();
    },
    destroyed() {
        summaryES.close();
        this.$refs.jessibuca.destroy();
    }
});

// CONCATENATED MODULE: ./src/App.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_Appvue_type_script_lang_js_ = (Appvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/App.vue?vue&type=style&index=0&id=467c9f3d&scoped=true&lang=css&
var Appvue_type_style_index_0_id_467c9f3d_scoped_true_lang_css_ = __webpack_require__("86f2");

// CONCATENATED MODULE: ./src/App.vue






/* normalize component */

var App_component = normalizeComponent(
  src_Appvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "467c9f3d",
  null
  
)

/* harmony default export */ var App = (App_component.exports);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (App);



/***/ })

/******/ })["default"];
});
//# sourceMappingURL=plugin-jessica.umd.js.map