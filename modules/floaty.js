/**
 * Floaty 模块 - 封装 AutoJS 的悬浮窗方法
 */

module.exports = {
    /**
     * 注册 floaty 模块的所有 handlers
     * @param {Object} jsBridge - WebView 的 jsBridge 对象
     */
    register: function(jsBridge) {
        // 存储悬浮窗实例的映射表
        var floatyInstances = {};
        var instanceCounter = 0;
        
        // ==================== 创建悬浮窗 ====================
        
        // 创建带调整功能的悬浮窗
        jsBridge.handle('floaty.window', function(event, layout) {
            try {
                // 注意: 这里需要根据实际情况处理 XML 布局
                // 由于 layout 是字符串形式的 XML, 可能需要特殊处理
                var window = floaty.window(layout);
                
                // 生成唯一ID并存储实例
                var instanceId = 'floaty_' + (++instanceCounter);
                floatyInstances[instanceId] = window;
                
                return instanceId;
            } catch (e) {
                console.error('创建悬浮窗失败:', e);
                return null;
            }
        });
        
        // 创建原始悬浮窗
        jsBridge.handle('floaty.rawWindow', function(event, layout) {
            try {
                var window = floaty.rawWindow(layout);
                
                // 生成唯一ID并存储实例
                var instanceId = 'floaty_raw_' + (++instanceCounter);
                floatyInstances[instanceId] = window;
                
                return instanceId;
            } catch (e) {
                console.error('创建原始悬浮窗失败:', e);
                return null;
            }
        });
        
        // 关闭所有悬浮窗
        jsBridge.handle('floaty.closeAll', function(event) {
            try {
                floaty.closeAll();
                // 清空实例映射表
                floatyInstances = {};
                return true;
            } catch (e) {
                console.error('关闭所有悬浮窗失败:', e);
                return false;
            }
        });
        
        // ==================== FloatyWindow 方法 ====================
        
        // 设置是否启用调整功能
        jsBridge.handle('floaty.setAdjustEnabled', function(event, instanceId, enabled) {
            var window = floatyInstances[instanceId];
            if (!window) {
                console.error('悬浮窗实例不存在:', instanceId);
                return false;
            }
            try {
                window.setAdjustEnabled(enabled);
                return true;
            } catch (e) {
                console.error('设置调整功能失败:', e);
                return false;
            }
        });
        
        // 设置悬浮窗位置
        jsBridge.handle('floaty.setPosition', function(event, instanceId, x, y) {
            var window = floatyInstances[instanceId];
            if (!window) {
                console.error('悬浮窗实例不存在:', instanceId);
                return false;
            }
            try {
                window.setPosition(x, y);
                return true;
            } catch (e) {
                console.error('设置悬浮窗位置失败:', e);
                return false;
            }
        });
        
        // 获取悬浮窗 X 坐标
        jsBridge.handle('floaty.getX', function(event, instanceId) {
            var window = floatyInstances[instanceId];
            if (!window) {
                console.error('悬浮窗实例不存在:', instanceId);
                return 0;
            }
            try {
                return window.getX();
            } catch (e) {
                console.error('获取 X 坐标失败:', e);
                return 0;
            }
        });
        
        // 获取悬浮窗 Y 坐标
        jsBridge.handle('floaty.getY', function(event, instanceId) {
            var window = floatyInstances[instanceId];
            if (!window) {
                console.error('悬浮窗实例不存在:', instanceId);
                return 0;
            }
            try {
                return window.getY();
            } catch (e) {
                console.error('获取 Y 坐标失败:', e);
                return 0;
            }
        });
        
        // 设置悬浮窗大小
        jsBridge.handle('floaty.setSize', function(event, instanceId, width, height) {
            var window = floatyInstances[instanceId];
            if (!window) {
                console.error('悬浮窗实例不存在:', instanceId);
                return false;
            }
            try {
                window.setSize(width, height);
                return true;
            } catch (e) {
                console.error('设置悬浮窗大小失败:', e);
                return false;
            }
        });
        
        // 获取悬浮窗宽度
        jsBridge.handle('floaty.getWidth', function(event, instanceId) {
            var window = floatyInstances[instanceId];
            if (!window) {
                console.error('悬浮窗实例不存在:', instanceId);
                return 0;
            }
            try {
                return window.getWidth();
            } catch (e) {
                console.error('获取宽度失败:', e);
                return 0;
            }
        });
        
        // 获取悬浮窗高度
        jsBridge.handle('floaty.getHeight', function(event, instanceId) {
            var window = floatyInstances[instanceId];
            if (!window) {
                console.error('悬浮窗实例不存在:', instanceId);
                return 0;
            }
            try {
                return window.getHeight();
            } catch (e) {
                console.error('获取高度失败:', e);
                return 0;
            }
        });
        
        // 关闭悬浮窗
        jsBridge.handle('floaty.close', function(event, instanceId) {
            var window = floatyInstances[instanceId];
            if (!window) {
                console.error('悬浮窗实例不存在:', instanceId);
                return false;
            }
            try {
                window.close();
                // 从映射表中删除
                delete floatyInstances[instanceId];
                return true;
            } catch (e) {
                console.error('关闭悬浮窗失败:', e);
                return false;
            }
        });
        
        // 设置悬浮窗关闭时退出脚本
        jsBridge.handle('floaty.exitOnClose', function(event, instanceId) {
            var window = floatyInstances[instanceId];
            if (!window) {
                console.error('悬浮窗实例不存在:', instanceId);
                return false;
            }
            try {
                window.exitOnClose();
                return true;
            } catch (e) {
                console.error('设置 exitOnClose 失败:', e);
                return false;
            }
        });
        
        // ==================== FloatyRawWindow 特有方法 ====================
        
        // 设置是否可触摸
        jsBridge.handle('floaty.setTouchable', function(event, instanceId, touchable) {
            var window = floatyInstances[instanceId];
            if (!window) {
                console.error('悬浮窗实例不存在:', instanceId);
                return false;
            }
            try {
                window.setTouchable(touchable);
                return true;
            } catch (e) {
                console.error('设置触摸属性失败:', e);
                return false;
            }
        });
    }
};

