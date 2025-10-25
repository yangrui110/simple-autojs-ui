/**
 * Keys 模块 - Web 端封装
 */

(function(window) {
    'use strict';
    
    // 确保命名空间存在
    window.__autojs_modules = window.__autojs_modules || {};
    
    // Keys 模块定义
    var keysModule = {
        // ==================== 基于无障碍服务的按键模拟 ====================
        
        /**
         * 模拟按下返回键
         * @returns {Promise<boolean>} 是否执行成功
         */
        back: function() {
            return $autojs.invoke('keys.back');
        },
        
        /**
         * 模拟按下 Home 键
         * @returns {Promise<boolean>} 是否执行成功
         */
        home: function() {
            return $autojs.invoke('keys.home');
        },
        
        /**
         * 弹出电源键菜单
         * @returns {Promise<boolean>} 是否执行成功
         */
        powerDialog: function() {
            return $autojs.invoke('keys.powerDialog');
        },
        
        /**
         * 拉出通知栏
         * @returns {Promise<boolean>} 是否执行成功
         */
        notifications: function() {
            return $autojs.invoke('keys.notifications');
        },
        
        /**
         * 显示快速设置(下拉通知栏到底)
         * @returns {Promise<boolean>} 是否执行成功
         */
        quickSettings: function() {
            return $autojs.invoke('keys.quickSettings');
        },
        
        /**
         * 显示最近任务
         * @returns {Promise<boolean>} 是否执行成功
         */
        recents: function() {
            return $autojs.invoke('keys.recents');
        },
        
        /**
         * 分屏
         * @returns {Promise<boolean>} 是否执行成功
         */
        splitScreen: function() {
            return $autojs.invoke('keys.splitScreen');
        },
        
        // ==================== 基于 Root 权限的按键模拟 ====================
        
        /**
         * 模拟按下 Home 键 (Root)
         * @returns {Promise<void>}
         */
        Home: function() {
            return $autojs.invoke('keys.Home');
        },
        
        /**
         * 模拟按下返回键 (Root)
         * @returns {Promise<void>}
         */
        Back: function() {
            return $autojs.invoke('keys.Back');
        },
        
        /**
         * 模拟按下电源键 (Root)
         * @returns {Promise<void>}
         */
        Power: function() {
            return $autojs.invoke('keys.Power');
        },
        
        /**
         * 模拟按下菜单键 (Root)
         * @returns {Promise<void>}
         */
        Menu: function() {
            return $autojs.invoke('keys.Menu');
        },
        
        /**
         * 按下音量上键 (Root)
         * @returns {Promise<void>}
         */
        VolumeUp: function() {
            return $autojs.invoke('keys.VolumeUp');
        },
        
        /**
         * 按键音量下键 (Root)
         * @returns {Promise<void>}
         */
        VolumeDown: function() {
            return $autojs.invoke('keys.VolumeDown');
        },
        
        /**
         * 模拟按下照相键 (Root)
         * @returns {Promise<void>}
         */
        Camera: function() {
            return $autojs.invoke('keys.Camera');
        },
        
        /**
         * 模拟按下物理按键上 (Root)
         * @returns {Promise<void>}
         */
        Up: function() {
            return $autojs.invoke('keys.Up');
        },
        
        /**
         * 模拟按下物理按键下 (Root)
         * @returns {Promise<void>}
         */
        Down: function() {
            return $autojs.invoke('keys.Down');
        },
        
        /**
         * 模拟按下物理按键左 (Root)
         * @returns {Promise<void>}
         */
        Left: function() {
            return $autojs.invoke('keys.Left');
        },
        
        /**
         * 模拟按下物理按键右 (Root)
         * @returns {Promise<void>}
         */
        Right: function() {
            return $autojs.invoke('keys.Right');
        },
        
        /**
         * 模拟按下物理按键确定 (Root)
         * @returns {Promise<void>}
         */
        OK: function() {
            return $autojs.invoke('keys.OK');
        },
        
        /**
         * 输入文字 (Root)
         * @param {string} text - 要输入的文字，只能为英文或英文符号
         * @returns {Promise<void>}
         */
        Text: function(text) {
            return $autojs.invoke('keys.Text', text);
        },
        
        /**
         * 模拟物理按键 (Root)
         * @param {number|string} code - 要按下的按键的数字代码或名称
         * @returns {Promise<void>}
         */
        KeyCode: function(code) {
            return $autojs.invoke('keys.KeyCode', code);
        }
    };
    
    // 挂载到临时命名空间
    window.__autojs_modules.keys = keysModule;
    
})(window);

