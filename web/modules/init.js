/**
 * AutoJS 模块初始化
 * 将所有模块从 __autojs_modules 组合到 window.autojs
 */

(function(window) {
    'use strict';
    
    // 确保所有模块都已加载
    if (!window.__autojs_modules) {
        console.error('AutoJS 模块未加载！请确保在此文件之前加载了所有模块文件。');
        return;
    }
    
    // 组合所有模块到 autojs 对象
    window.autojs = {
        global: window.__autojs_modules.global || {}
        
        // TODO: 后续添加更多模块
        // ui: window.__autojs_modules.ui || {},
        // files: window.__autojs_modules.files || {},
        // app: window.__autojs_modules.app || {},
    };
    
    // 清理临时命名空间（可选）
    // delete window.__autojs_modules;
    
    console.log('AutoJS 模块初始化完成');
    
})(window);

