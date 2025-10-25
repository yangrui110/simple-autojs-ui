/**
 * Global 模块 - 封装 AutoJS 的全局方法
 */

module.exports = {
    /**
     * 注册 global 模块的所有 handlers
     * @param {Object} jsBridge - WebView 的 jsBridge 对象
     */
    register(jsBridge) {
        // 睡眠
        jsBridge.handle('global.sleep', (event, ms) => {
            return sleep(ms);
        });

        // 显示 Toast
        jsBridge.handle('global.toast', (event, msg) => {
            return toast(msg);
        });

        // TODO: 后续添加更多 global 方法
    }
};
