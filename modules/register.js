/**
 * 模块注册器 - 统一注册所有模块的 handlers
 */

var globalModule = require('./global.js');
var automatorModule = require('./automator.js');
var floatyModule = require('./floaty.js');
var autojsModule = require('./autojs.js');

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

        // TODO: 后续添加更多模块
        // uiModule.register(jsBridge);
        // fileModule.register(jsBridge);
        // appModule.register(jsBridge);
    },

    /**
     * 获取 floaty 管理器（供 main.js 使用）
     */
    getFloatyManager: function() {
        return floatyModule.floatyManager;
    }
};

