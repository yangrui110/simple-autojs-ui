/**
 * Global 模块 - Web 端封装
 * 使用 IIFE 将模块挂载到 window.__autojs_modules
 */

(function(window) {
    'use strict';
    
    // 确保命名空间存在
    window.__autojs_modules = window.__autojs_modules || {};
    
    // Global 模块定义
    var globalModule = {
        // ==================== 基础方法 ====================
        
        sleep: function(ms, millisMax, bounds) {
            var args = Array.prototype.slice.call(arguments);
            return $autojs.invoke('global.sleep', args[0], args[1], args[2]);
        },
        
        toast: function(text, isLong, isForcible) {
            var args = Array.prototype.slice.call(arguments);
            return $autojs.invoke('global.toast', args[0], args[1], args[2]);
        },
        
        toastLog: function(text, isLong, isForcible) {
            var args = Array.prototype.slice.call(arguments);
            return $autojs.invoke('global.toastLog', args[0], args[1], args[2]);
        },
        
        random: function(min, max) {
            var args = Array.prototype.slice.call(arguments);
            return $autojs.invoke('global.random', args[0], args[1]);
        },
        
        // ==================== 等待方法 ====================
        
        wait: function(condition, limit, interval, callback) {
            var args = Array.prototype.slice.call(arguments);
            return $autojs.invoke('global.wait', args[0], args[1], args[2], args[3]);
        },
        
        waitForActivity: function(activityName, limit, interval, callback) {
            var args = Array.prototype.slice.call(arguments);
            return $autojs.invoke('global.waitForActivity', args[0], args[1], args[2], args[3]);
        },
        
        waitForPackage: function(packageName, limit, interval, callback) {
            var args = Array.prototype.slice.call(arguments);
            return $autojs.invoke('global.waitForPackage', args[0], args[1], args[2], args[3]);
        },
        
        // ==================== 脚本控制 ====================
        
        exit: function(e) {
            var args = Array.prototype.slice.call(arguments);
            return $autojs.invoke('global.exit', args[0]);
        },
        
        stop: function() {
            return $autojs.invoke('global.stop');
        },
        
        isStopped: function() {
            return $autojs.invoke('global.isStopped');
        },
        
        isRunning: function() {
            return $autojs.invoke('global.isRunning');
        },
        
        isShuttingDown: function() {
            return $autojs.invoke('global.isShuttingDown');
        },
        
        notStopped: function() {
            return $autojs.invoke('global.notStopped');
        },
        
        // ==================== 版本要求 ====================
        
        requiresApi: function(api) {
            return $autojs.invoke('global.requiresApi', api);
        },
        
        requiresAutojsVersion: function(version) {
            return $autojs.invoke('global.requiresAutojsVersion', version);
        },
        
        // ==================== Java 互操作 ====================
        
        importPackage: function(pkg) {
            return $autojs.invoke('global.importPackage', pkg);
        },
        
        importClass: function(cls) {
            return $autojs.invoke('global.importClass', cls);
        },
        
        // ==================== 系统信息 ====================
        
        currentPackage: function() {
            return $autojs.invoke('global.currentPackage');
        },
        
        currentActivity: function() {
            return $autojs.invoke('global.currentActivity');
        },
        
        // ==================== 剪贴板 ====================
        
        setClip: function(text) {
            return $autojs.invoke('global.setClip', text);
        },
        
        getClip: function() {
            return $autojs.invoke('global.getClip');
        },
        
        // ==================== 选择器相关 ====================
        
        selector: function() {
            return $autojs.invoke('global.selector');
        },
        
        pickup: function(selector, compass) {
            var args = Array.prototype.slice.call(arguments);
            return $autojs.invoke('global.pickup', args[0], args[1]);
        },
        
        detect: function(selector, compass) {
            var args = Array.prototype.slice.call(arguments);
            return $autojs.invoke('global.detect', args[0], args[1]);
        },
        
        existsAll: function(selectors) {
            return $autojs.invoke('global.existsAll', selectors);
        },
        
        existsOne: function(selectors) {
            return $autojs.invoke('global.existsOne', selectors);
        },
        
        // ==================== 坐标标度 ====================
        
        cX: function(x, baseOrIsRatio) {
            var args = Array.prototype.slice.call(arguments);
            return $autojs.invoke('global.cX', args[0], args[1]);
        },
        
        cY: function(y, baseOrIsRatio) {
            var args = Array.prototype.slice.call(arguments);
            return $autojs.invoke('global.cY', args[0], args[1]);
        },
        
        cYx: function(y, baseXOrRatio, isRatio) {
            var args = Array.prototype.slice.call(arguments);
            return $autojs.invoke('global.cYx', args[0], args[1], args[2]);
        },
        
        cXy: function(x, baseYOrRatio, isRatio) {
            var args = Array.prototype.slice.call(arguments);
            return $autojs.invoke('global.cXy', args[0], args[1], args[2]);
        },
        
        // ==================== 类型判断 ====================
        
        species: function(o) {
            return $autojs.invoke('global.species', o);
        },
        
        isArray: function(o) {
            return $autojs.invoke('global.isArray', o);
        },
        
        isArrayBuffer: function(o) {
            return $autojs.invoke('global.isArrayBuffer', o);
        },
        
        isBigInt: function(o) {
            return $autojs.invoke('global.isBigInt', o);
        },
        
        isBoolean: function(o) {
            return $autojs.invoke('global.isBoolean', o);
        },
        
        isContinuation: function(o) {
            return $autojs.invoke('global.isContinuation', o);
        },
        
        isDataView: function(o) {
            return $autojs.invoke('global.isDataView', o);
        },
        
        isDate: function(o) {
            return $autojs.invoke('global.isDate', o);
        },
        
        isError: function(o) {
            return $autojs.invoke('global.isError', o);
        },
        
        isFloat32Array: function(o) {
            return $autojs.invoke('global.isFloat32Array', o);
        },
        
        isFloat64Array: function(o) {
            return $autojs.invoke('global.isFloat64Array', o);
        },
        
        isFunction: function(o) {
            return $autojs.invoke('global.isFunction', o);
        },
        
        isHTMLDocument: function(o) {
            return $autojs.invoke('global.isHTMLDocument', o);
        },
        
        isInt16Array: function(o) {
            return $autojs.invoke('global.isInt16Array', o);
        },
        
        isInt32Array: function(o) {
            return $autojs.invoke('global.isInt32Array', o);
        },
        
        isInt8Array: function(o) {
            return $autojs.invoke('global.isInt8Array', o);
        },
        
        isJavaObject: function(o) {
            return $autojs.invoke('global.isJavaObject', o);
        },
        
        isJavaPackage: function(o) {
            return $autojs.invoke('global.isJavaPackage', o);
        },
        
        isMap: function(o) {
            return $autojs.invoke('global.isMap', o);
        },
        
        isNamespace: function(o) {
            return $autojs.invoke('global.isNamespace', o);
        },
        
        isNull: function(o) {
            return $autojs.invoke('global.isNull', o);
        },
        
        isNumber: function(o) {
            return $autojs.invoke('global.isNumber', o);
        },
        
        isObject: function(o) {
            return $autojs.invoke('global.isObject', o);
        },
        
        isQName: function(o) {
            return $autojs.invoke('global.isQName', o);
        },
        
        isRegExp: function(o) {
            return $autojs.invoke('global.isRegExp', o);
        },
        
        isSet: function(o) {
            return $autojs.invoke('global.isSet', o);
        },
        
        isString: function(o) {
            return $autojs.invoke('global.isString', o);
        },
        
        isUint16Array: function(o) {
            return $autojs.invoke('global.isUint16Array', o);
        },
        
        isUint32Array: function(o) {
            return $autojs.invoke('global.isUint32Array', o);
        },
        
        isUint8Array: function(o) {
            return $autojs.invoke('global.isUint8Array', o);
        },
        
        isUint8ClampedArray: function(o) {
            return $autojs.invoke('global.isUint8ClampedArray', o);
        },
        
        isUndefined: function(o) {
            return $autojs.invoke('global.isUndefined', o);
        },
        
        isWeakMap: function(o) {
            return $autojs.invoke('global.isWeakMap', o);
        },
        
        isWeakSet: function(o) {
            return $autojs.invoke('global.isWeakSet', o);
        },
        
        isWindow: function(o) {
            return $autojs.invoke('global.isWindow', o);
        },
        
        isXML: function(o) {
            return $autojs.invoke('global.isXML', o);
        },
        
        isXMLList: function(o) {
            return $autojs.invoke('global.isXMLList', o);
        }
    };
    
    // 添加 WIDTH 和 HEIGHT 属性
    Object.defineProperty(globalModule, 'WIDTH', {
        get: function() {
            return $autojs.invoke('global.WIDTH');
        }
    });
    
    Object.defineProperty(globalModule, 'HEIGHT', {
        get: function() {
            return $autojs.invoke('global.HEIGHT');
        }
    });
    
    // 挂载到临时命名空间
    window.__autojs_modules.global = globalModule;
    
})(window);
