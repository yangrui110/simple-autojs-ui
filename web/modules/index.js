/**
 * AutoJS Web 端模块入口
 * 统一导出所有模块
 */

import globalModule from './global.js';

/**
 * 初始化 autojs 对象
 */
export function initAutoJS() {
    window.autojs = {
        global: globalModule,
        
        // TODO: 后续添加更多模块
        // ui: uiModule,
        // files: filesModule,
        // app: appModule,
    };
}

