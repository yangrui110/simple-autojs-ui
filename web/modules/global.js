/**
 * Global 模块 - Web 端封装
 */

export default {
    /**
     * 暂停执行
     * @param {number} ms - 毫秒数
     * @returns {Promise<any>}
     */
    sleep(ms) {
        return $autojs.invoke('global.sleep', ms);
    },

    /**
     * 显示 Toast 提示
     * @param {string} msg - 提示消息
     * @returns {Promise<any>}
     */
    toast(msg) {
        return $autojs.invoke('global.toast', msg);
    },

    // TODO: 后续添加更多 global 方法
};

