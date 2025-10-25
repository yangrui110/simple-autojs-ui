/**
 * 模块注册器 - 统一注册所有模块的 handlers
 */

const globalModule = require('./global.js');

module.exports = {
    /**
     * 注册所有模块
     * @param {Object} jsBridge - WebView 的 jsBridge 对象
     */
    registerAll(jsBridge) {
        // 注册 global 模块
        globalModule.register(jsBridge);

        // TODO: 后续添加更多模块
        // uiModule.register(jsBridge);
        // fileModule.register(jsBridge);
        // appModule.register(jsBridge);
    }
};

