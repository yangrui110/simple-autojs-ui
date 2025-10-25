/**
 * Device 模块 - Web 端封装
 */

(function(window) {
    'use strict';
    
    // 确保命名空间存在
    window.__autojs_modules = window.__autojs_modules || {};
    
    // Device 模块定义
    var deviceModule = {
        // ==================== 设备信息属性 ====================
        
        /**
         * 获取设备屏幕宽度
         * @returns {Promise<number>}
         */
        get width() {
            return $autojs.invoke('device.width');
        },
        
        /**
         * 获取设备屏幕高度
         * @returns {Promise<number>}
         */
        get height() {
            return $autojs.invoke('device.height');
        },
        
        /**
         * 获取修订版本号
         * @returns {Promise<string>}
         */
        get buildId() {
            return $autojs.invoke('device.buildId');
        },
        
        /**
         * 获取设备主板型号
         * @returns {Promise<string>}
         */
        get broad() {
            return $autojs.invoke('device.broad');
        },
        
        /**
         * 获取厂商品牌
         * @returns {Promise<string>}
         */
        get brand() {
            return $autojs.invoke('device.brand');
        },
        
        /**
         * 获取设备工业设计名称
         * @returns {Promise<string>}
         */
        get device() {
            return $autojs.invoke('device.device');
        },
        
        /**
         * 获取设备型号
         * @returns {Promise<string>}
         */
        get model() {
            return $autojs.invoke('device.model');
        },
        
        /**
         * 获取产品名称
         * @returns {Promise<string>}
         */
        get product() {
            return $autojs.invoke('device.product');
        },
        
        /**
         * 获取Bootloader版本
         * @returns {Promise<string>}
         */
        get bootloader() {
            return $autojs.invoke('device.bootloader');
        },
        
        /**
         * 获取硬件名称
         * @returns {Promise<string>}
         */
        get hardware() {
            return $autojs.invoke('device.hardware');
        },
        
        /**
         * 获取构建唯一标识码
         * @returns {Promise<string>}
         */
        get fingerprint() {
            return $autojs.invoke('device.fingerprint');
        },
        
        /**
         * 获取硬件序列号
         * @returns {Promise<string>}
         */
        get serial() {
            return $autojs.invoke('device.serial');
        },
        
        /**
         * 获取安卓系统API版本
         * @returns {Promise<number>}
         */
        get sdkInt() {
            return $autojs.invoke('device.sdkInt');
        },
        
        /**
         * 获取内部版本控制值
         * @returns {Promise<string>}
         */
        get incremental() {
            return $autojs.invoke('device.incremental');
        },
        
        /**
         * 获取Android系统版本号
         * @returns {Promise<string>}
         */
        get release() {
            return $autojs.invoke('device.release');
        },
        
        /**
         * 获取基础OS构建
         * @returns {Promise<string>}
         */
        get baseOS() {
            return $autojs.invoke('device.baseOS');
        },
        
        /**
         * 获取安全补丁级别
         * @returns {Promise<string>}
         */
        get securityPatch() {
            return $autojs.invoke('device.securityPatch');
        },
        
        /**
         * 获取开发代号
         * @returns {Promise<string>}
         */
        get codename() {
            return $autojs.invoke('device.codename');
        },
        
        // ==================== 设备信息获取 ====================
        
        /**
         * 获取设备IMEI
         * @returns {Promise<string>}
         */
        getIMEI: function() {
            return $autojs.invoke('device.getIMEI');
        },
        
        /**
         * 获取设备Android ID
         * @returns {Promise<string>}
         */
        getAndroidId: function() {
            return $autojs.invoke('device.getAndroidId');
        },
        
        /**
         * 获取设备Mac地址
         * @returns {Promise<string>}
         */
        getMacAddress: function() {
            return $autojs.invoke('device.getMacAddress');
        },
        
        // ==================== 亮度控制 ====================
        
        /**
         * 获取当前手动亮度 (0-255)
         * @returns {Promise<number>}
         */
        getBrightness: function() {
            return $autojs.invoke('device.getBrightness');
        },
        
        /**
         * 获取当前亮度模式 (0=手动, 1=自动)
         * @returns {Promise<number>}
         */
        getBrightnessMode: function() {
            return $autojs.invoke('device.getBrightnessMode');
        },
        
        /**
         * 设置当前手动亮度
         * @param {number} brightness - 亮度值 (0-255)
         * @returns {Promise<void>}
         */
        setBrightness: function(brightness) {
            return $autojs.invoke('device.setBrightness', brightness);
        },
        
        /**
         * 设置亮度模式
         * @param {number} mode - 亮度模式 (0=手动, 1=自动)
         * @returns {Promise<void>}
         */
        setBrightnessMode: function(mode) {
            return $autojs.invoke('device.setBrightnessMode', mode);
        },
        
        // ==================== 音量控制 ====================
        
        /**
         * 获取当前媒体音量
         * @returns {Promise<number>}
         */
        getMusicVolume: function() {
            return $autojs.invoke('device.getMusicVolume');
        },
        
        /**
         * 获取当前通知音量
         * @returns {Promise<number>}
         */
        getNotificationVolume: function() {
            return $autojs.invoke('device.getNotificationVolume');
        },
        
        /**
         * 获取当前闹钟音量
         * @returns {Promise<number>}
         */
        getAlarmVolume: function() {
            return $autojs.invoke('device.getAlarmVolume');
        },
        
        /**
         * 获取媒体音量最大值
         * @returns {Promise<number>}
         */
        getMusicMaxVolume: function() {
            return $autojs.invoke('device.getMusicMaxVolume');
        },
        
        /**
         * 获取通知音量最大值
         * @returns {Promise<number>}
         */
        getNotificationMaxVolume: function() {
            return $autojs.invoke('device.getNotificationMaxVolume');
        },
        
        /**
         * 获取闹钟音量最大值
         * @returns {Promise<number>}
         */
        getAlarmMaxVolume: function() {
            return $autojs.invoke('device.getAlarmMaxVolume');
        },
        
        /**
         * 设置媒体音量
         * @param {number} volume - 音量值
         * @returns {Promise<void>}
         */
        setMusicVolume: function(volume) {
            return $autojs.invoke('device.setMusicVolume', volume);
        },
        
        /**
         * 设置通知音量
         * @param {number} volume - 音量值
         * @returns {Promise<void>}
         */
        setNotificationVolume: function(volume) {
            return $autojs.invoke('device.setNotificationVolume', volume);
        },
        
        /**
         * 设置闹钟音量
         * @param {number} volume - 音量值
         * @returns {Promise<void>}
         */
        setAlarmVolume: function(volume) {
            return $autojs.invoke('device.setAlarmVolume', volume);
        },
        
        // ==================== 电池信息 ====================
        
        /**
         * 获取当前电量百分比
         * @returns {Promise<number>} 0.0-100.0的浮点数
         */
        getBattery: function() {
            return $autojs.invoke('device.getBattery');
        },
        
        /**
         * 检查设备是否正在充电
         * @returns {Promise<boolean>}
         */
        isCharging: function() {
            return $autojs.invoke('device.isCharging');
        },
        
        // ==================== 内存信息 ====================
        
        /**
         * 获取设备内存总量 (字节)
         * @returns {Promise<number>}
         */
        getTotalMem: function() {
            return $autojs.invoke('device.getTotalMem');
        },
        
        /**
         * 获取设备当前可用内存 (字节)
         * @returns {Promise<number>}
         */
        getAvailMem: function() {
            return $autojs.invoke('device.getAvailMem');
        },
        
        // ==================== 屏幕控制 ====================
        
        /**
         * 检查屏幕是否点亮
         * @returns {Promise<boolean>}
         */
        isScreenOn: function() {
            return $autojs.invoke('device.isScreenOn');
        },
        
        /**
         * 唤醒设备
         * @returns {Promise<void>}
         */
        wakeUp: function() {
            return $autojs.invoke('device.wakeUp');
        },
        
        /**
         * 如果屏幕没有点亮则唤醒设备
         * @returns {Promise<void>}
         */
        wakeUpIfNeeded: function() {
            return $autojs.invoke('device.wakeUpIfNeeded');
        },
        
        /**
         * 保持屏幕常亮
         * @param {number} [timeout] - 保持时长(毫秒), 不传则一直保持
         * @returns {Promise<void>}
         */
        keepScreenOn: function(timeout) {
            if (timeout !== undefined) {
                return $autojs.invoke('device.keepScreenOn', timeout);
            }
            return $autojs.invoke('device.keepScreenOn');
        },
        
        /**
         * 保持屏幕常亮但允许变暗
         * @param {number} [timeout] - 保持时长(毫秒), 不传则一直保持
         * @returns {Promise<void>}
         */
        keepScreenDim: function(timeout) {
            if (timeout !== undefined) {
                return $autojs.invoke('device.keepScreenDim', timeout);
            }
            return $autojs.invoke('device.keepScreenDim');
        },
        
        /**
         * 取消设备保持唤醒状态
         * @returns {Promise<void>}
         */
        cancelKeepingAwake: function() {
            return $autojs.invoke('device.cancelKeepingAwake');
        },
        
        // ==================== 振动控制 ====================
        
        /**
         * 使设备振动
         * @param {number} millis - 振动时长(毫秒)
         * @returns {Promise<void>}
         */
        vibrate: function(millis) {
            return $autojs.invoke('device.vibrate', millis);
        },
        
        /**
         * 取消振动
         * @returns {Promise<void>}
         */
        cancelVibration: function() {
            return $autojs.invoke('device.cancelVibration');
        }
    };
    
    // 挂载到临时命名空间
    window.__autojs_modules.device = deviceModule;
    
})(window);


