/**
 * 模块注册器 - 统一注册所有模块的 handlers
 */

var globalModule = require('./global.js');
var automatorModule = require('./automator.js');
var floatyModule = require('../floaty-manager/floaty-ui-manager.js');
var autojsModule = require('./autojs.js');
var appModule = require('./app.js');
var colorModule = require('./color.js');
var imageModule = require('./image.js');
var ocrModule = require('./ocr.js');
var keysModule = require('./keys.js');
var deviceModule = require('./device.js');
var storagesModule = require('./storages.js');
var filesModule = require('./files.js');
var enginesModule = require('./engines.js');
var noticeModule = require('./notice.js');

module.exports = {
    /**
     * 注册所有模块
     * @param {Object} jsBridge - WebView 的 jsBridge 对象
     */
    registerAll: function(jsBridge) {
        // 注册 global 模块
        globalModule.register(jsBridge);
        
        // 注册 automator 模块
        automatorModule.register(jsBridge);

        // 注册 floaty 模块
        floatyModule.register(jsBridge);
        
        // 注册 autojs 本体应用模块
        autojsModule.register(jsBridge);

        // 注册 app 模块
        appModule.register(jsBridge);

        // 注册 color 模块
        colorModule.register(jsBridge);

        // 注册 image 模块
        imageModule.register(jsBridge);

        // 注册 ocr 模块
        ocrModule.register(jsBridge);

        // 注册 keys 模块
        keysModule.register(jsBridge);

        // 注册 device 模块
        deviceModule.register(jsBridge);

        // 注册 storages 模块
        storagesModule.register(jsBridge);

        // 注册 files 模块
        filesModule.register(jsBridge);

        // 注册 engines 模块
        enginesModule.register(jsBridge);

        // 注册 notice 模块
        noticeModule.register(jsBridge);

        // TODO: 后续添加更多模块
        // uiModule.register(jsBridge);
    },

    /**
     * 获取 floaty 管理器（供 main.js 使用）
     */
    getFloatyManager: function() {
        return floatyModule.floatyManager;
    }
};

