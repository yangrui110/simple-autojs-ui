/**
 * AutoJS 模块初始化
 * 动态加载所有模块并初始化
 */

(function(window) {
    'use strict';
    
    // 模块配置列表
    var moduleFiles = [
        'modules/global.js',
        'modules/automator.js',
        'modules/uiselector.js',
        'modules/autojs.js',
        'modules/app.js',
        'modules/color.js',
        'modules/image.js',
        'modules/ocr.js',
        'modules/keys.js',
        'modules/device.js',
        'modules/storages.js',
        'modules/files.js',
        'modules/engines.js',
        'modules/notice.js',
        'modules/floaty.js',
        'modules/http.js',
        'modules/base64.js'
        // TODO: 后续添加更多模块
        // 'modules/ui.js'
    ];
    
    /**
     * 动态加载脚本文件
     * @param {string} url - 脚本路径
     * @returns {Promise}
     */
    function loadScript(url) {
        return new Promise(function(resolve, reject) {
            // 检测是否在 AutoJS WebView 环境中（插件模式或开发模式）
            if (typeof $autojs !== 'undefined') {
                // 使用 jsBridge 加载脚本内容
                $autojs.invoke('fetch', { path: url })
                    .then(function(content) {
                        if (!content) {
                            throw new Error('Empty content for: ' + url);
                        }
                        
                        try {
                            // 使用 eval 执行脚本内容
                            // 添加 sourceURL 以便调试
                            eval(content + '\n//# sourceURL=' + url);
                            console.log('模块已加载: ' + url);
                            resolve();
                        } catch (e) {
                            console.error('模块执行失败: ' + url, e);
                            reject(e);
                        }
                    })
                    .catch(function(error) {
                        console.error('模块加载失败: ' + url, error);
                        reject(new Error('Failed to load script: ' + url));
                    });
            } else {
                // 传统方式：创建 <script> 标签（用于浏览器调试）
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = url;
                
                script.onload = function() {
                    console.log('模块已加载: ' + url);
                    resolve();
                };
                
                script.onerror = function() {
                    console.error('模块加载失败: ' + url);
                    reject(new Error('Failed to load script: ' + url));
                };
                
                document.head.appendChild(script);
            }
        });
    }
    
    /**
     * 按顺序加载所有模块
     */
    function loadAllModules() {
        // 使用 reduce 来实现按顺序加载
        return moduleFiles.reduce(function(promise, file) {
            return promise.then(function() {
                return loadScript(file);
            });
        }, Promise.resolve());
    }
    
    /**
     * 初始化 autojs 对象
     */
    function initAutoJS() {
        // 确保所有模块都已加载
        if (!window.__autojs_modules) {
            console.error('AutoJS 模块未加载！');
            return;
        }
        
        // 先从 autojs 模块中获取本体应用的方法
        var autojsAppModule = window.__autojs_modules.autojs || {};
        
        // 组合所有模块到 autojs 对象
        window.autojs = {
            // global、automator、uiselector、app、color、image、ocr、keys、device、storages 和 files 作为子模块
            global: window.__autojs_modules.global || {},
            automator: window.__autojs_modules.automator || {},
            uiselector: window.__autojs_modules.uiselector || {},
            app: window.__autojs_modules.app || {},
            color: window.__autojs_modules.color || {},
            image: window.__autojs_modules.image || {},
            ocr: window.__autojs_modules.ocr || {},
            keys: window.__autojs_modules.keys || {},
            device: window.__autojs_modules.device || {},
            storages: window.__autojs_modules.storages || {},
            files: window.__autojs_modules.files || {},
            engines: window.__autojs_modules.engines || {},
            notice: window.__autojs_modules.notice || {},
            floaty: window.__autojs_modules.floaty || {},
            http: window.__autojs_modules.http || {},
            base64: window.__autojs_modules.base64 || {}
            
            // 模块会自动添加，无需手动维护
        };
        
        // 将 autojs 本体应用的方法直接挂载到 window.autojs 上
        for (var key in autojsAppModule) {
            if (autojsAppModule.hasOwnProperty(key)) {
                window.autojs[key] = autojsAppModule[key];
            }
        }
        
        // 清理临时命名空间（可选）
        // delete window.__autojs_modules;
        
        console.log('AutoJS 模块初始化完成');
        
        // 触发自定义事件，通知模块加载完成
        if (typeof Event === 'function') {
            window.dispatchEvent(new Event('autojs-ready'));
        }
    }
    
    // 开始加载模块
    loadAllModules()
        .then(function() {
            initAutoJS();
        })
        .catch(function(error) {
            console.error('模块加载失败:', error);
        });
    
})(window);
