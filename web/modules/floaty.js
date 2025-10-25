/**
 * Floaty 模块 - Web 端封装
 */

(function(window) {
    'use strict';
    
    // 确保命名空间存在
    window.__autojs_modules = window.__autojs_modules || {};
    
    /**
     * FloatyWindow 类 - 封装悬浮窗实例操作
     */
    function FloatyWindow(instanceId) {
        this.instanceId = instanceId;
    }
    
    /**
     * 设置是否启用悬浮窗调整功能
     * @param {boolean} enabled - 是否启用
     * @returns {Promise<boolean>}
     */
    FloatyWindow.prototype.setAdjustEnabled = function(enabled) {
        return $autojs.invoke('floaty.setAdjustEnabled', this.instanceId, enabled);
    };
    
    /**
     * 设置悬浮窗位置
     * @param {number} x - X 坐标
     * @param {number} y - Y 坐标
     * @returns {Promise<boolean>}
     */
    FloatyWindow.prototype.setPosition = function(x, y) {
        return $autojs.invoke('floaty.setPosition', this.instanceId, x, y);
    };
    
    /**
     * 获取悬浮窗 X 坐标
     * @returns {Promise<number>}
     */
    FloatyWindow.prototype.getX = function() {
        return $autojs.invoke('floaty.getX', this.instanceId);
    };
    
    /**
     * 获取悬浮窗 Y 坐标
     * @returns {Promise<number>}
     */
    FloatyWindow.prototype.getY = function() {
        return $autojs.invoke('floaty.getY', this.instanceId);
    };
    
    /**
     * 设置悬浮窗大小
     * @param {number} width - 宽度
     * @param {number} height - 高度
     * @returns {Promise<boolean>}
     */
    FloatyWindow.prototype.setSize = function(width, height) {
        return $autojs.invoke('floaty.setSize', this.instanceId, width, height);
    };
    
    /**
     * 获取悬浮窗宽度
     * @returns {Promise<number>}
     */
    FloatyWindow.prototype.getWidth = function() {
        return $autojs.invoke('floaty.getWidth', this.instanceId);
    };
    
    /**
     * 获取悬浮窗高度
     * @returns {Promise<number>}
     */
    FloatyWindow.prototype.getHeight = function() {
        return $autojs.invoke('floaty.getHeight', this.instanceId);
    };
    
    /**
     * 关闭悬浮窗
     * @returns {Promise<boolean>}
     */
    FloatyWindow.prototype.close = function() {
        return $autojs.invoke('floaty.close', this.instanceId);
    };
    
    /**
     * 设置悬浮窗关闭时退出脚本
     * @returns {Promise<boolean>}
     */
    FloatyWindow.prototype.exitOnClose = function() {
        return $autojs.invoke('floaty.exitOnClose', this.instanceId);
    };
    
    /**
     * FloatyRawWindow 类 - 封装原始悬浮窗实例操作
     */
    function FloatyRawWindow(instanceId) {
        this.instanceId = instanceId;
    }
    
    // FloatyRawWindow 继承 FloatyWindow 的所有方法
    FloatyRawWindow.prototype = Object.create(FloatyWindow.prototype);
    FloatyRawWindow.prototype.constructor = FloatyRawWindow;
    
    /**
     * 设置悬浮窗是否可触摸
     * @param {boolean} touchable - 是否可触摸
     * @returns {Promise<boolean>}
     */
    FloatyRawWindow.prototype.setTouchable = function(touchable) {
        return $autojs.invoke('floaty.setTouchable', this.instanceId, touchable);
    };
    
    // Floaty 模块定义
    var floatyModule = {
        /**
         * 创建带调整功能的悬浮窗
         * @param {string} layout - XML 布局字符串
         * @returns {Promise<FloatyWindow>}
         */
        window: function(layout) {
            return $autojs.invoke('floaty.window', layout).then(function(instanceId) {
                if (!instanceId) {
                    throw new Error('创建悬浮窗失败');
                }
                return new FloatyWindow(instanceId);
            });
        },
        
        /**
         * 创建原始悬浮窗
         * @param {string} layout - XML 布局字符串
         * @returns {Promise<FloatyRawWindow>}
         */
        rawWindow: function(layout) {
            return $autojs.invoke('floaty.rawWindow', layout).then(function(instanceId) {
                if (!instanceId) {
                    throw new Error('创建原始悬浮窗失败');
                }
                return new FloatyRawWindow(instanceId);
            });
        },
        
        /**
         * 关闭所有悬浮窗
         * @returns {Promise<boolean>}
         */
        closeAll: function() {
            return $autojs.invoke('floaty.closeAll');
        }
    };
    
    // 挂载到临时命名空间
    window.__autojs_modules.floaty = floatyModule;
    
})(window);

