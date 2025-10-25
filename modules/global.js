/**
 * Global 模块 - 封装 AutoJS 的全局方法
 */

module.exports = {
    /**
     * 注册 global 模块的所有 handlers
     * @param {Object} jsBridge - WebView 的 jsBridge 对象
     */
    register: function(jsBridge) {
        // ==================== 基础方法 ====================
        
        // 睡眠
        jsBridge.handle('global.sleep', function(event, ms, millisMax, bounds) {
            if (arguments.length === 2) {
                return sleep(ms);
            } else if (arguments.length === 3) {
                return sleep(ms, millisMax);
            } else if (arguments.length === 4) {
                return sleep(ms, millisMax, bounds);
            }
            return sleep(ms);
        });

        // 显示 Toast
        jsBridge.handle('global.toast', function(event, text, isLong, isForcible) {
            if (arguments.length === 2) {
                return toast(text);
            } else if (arguments.length === 3) {
                return toast(text, isLong);
            } else if (arguments.length === 4) {
                return toast(text, isLong, isForcible);
            }
            return toast(text);
        });

        // 显示 Toast 并打印日志
        jsBridge.handle('global.toastLog', function(event, text, isLong, isForcible) {
            if (arguments.length === 2) {
                return toastLog(text);
            } else if (arguments.length === 3) {
                return toastLog(text, isLong);
            } else if (arguments.length === 4) {
                return toastLog(text, isLong, isForcible);
            }
            return toastLog(text);
        });

        // 随机数
        jsBridge.handle('global.random', function(event, min, max) {
            if (arguments.length === 1) {
                return random();
            } else if (arguments.length === 3) {
                return random(min, max);
            }
            return random();
        });

        // ==================== 等待方法 ====================
        
        // 等待条件满足
        jsBridge.handle('global.wait', function(event, condition, limit, interval, callback) {
            if (arguments.length === 2) {
                return wait(condition);
            } else if (arguments.length === 3) {
                return wait(condition, limit);
            } else if (arguments.length === 4) {
                return wait(condition, limit, interval);
            } else if (arguments.length === 5) {
                return wait(condition, limit, interval, callback);
            }
            return wait(condition);
        });

        // 等待指定 Activity
        jsBridge.handle('global.waitForActivity', function(event, activityName, limit, interval, callback) {
            if (arguments.length === 2) {
                return waitForActivity(activityName);
            } else if (arguments.length === 3) {
                return waitForActivity(activityName, limit);
            } else if (arguments.length === 4) {
                return waitForActivity(activityName, limit, interval);
            } else if (arguments.length === 5) {
                return waitForActivity(activityName, limit, interval, callback);
            }
            return waitForActivity(activityName);
        });

        // 等待指定包名
        jsBridge.handle('global.waitForPackage', function(event, packageName, limit, interval, callback) {
            if (arguments.length === 2) {
                return waitForPackage(packageName);
            } else if (arguments.length === 3) {
                return waitForPackage(packageName, limit);
            } else if (arguments.length === 4) {
                return waitForPackage(packageName, limit, interval);
            } else if (arguments.length === 5) {
                return waitForPackage(packageName, limit, interval, callback);
            }
            return waitForPackage(packageName);
        });

        // ==================== 脚本控制 ====================
        
        // 退出脚本
        jsBridge.handle('global.exit', function(event, e) {
            if (arguments.length === 1) {
                return exit();
            } else {
                return exit(e);
            }
        });

        // 停止脚本
        jsBridge.handle('global.stop', function(event) {
            return stop();
        });

        // 检测脚本是否已停止
        jsBridge.handle('global.isStopped', function(event) {
            return isStopped();
        });

        // 检测脚本是否正在运行
        jsBridge.handle('global.isRunning', function(event) {
            return isRunning();
        });

        // 检测脚本是否正在关闭（已弃用）
        jsBridge.handle('global.isShuttingDown', function(event) {
            return isShuttingDown();
        });

        // 检测脚本是否未停止（已弃用）
        jsBridge.handle('global.notStopped', function(event) {
            return notStopped();
        });

        // ==================== 版本要求 ====================
        
        // 要求最低 API 级别
        jsBridge.handle('global.requiresApi', function(event, api) {
            return requiresApi(api);
        });

        // 要求最低 AutoJS 版本
        jsBridge.handle('global.requiresAutojsVersion', function(event, version) {
            return requiresAutojsVersion(version);
        });

        // ==================== Java 互操作 ====================
        
        // 导入 Java 包
        jsBridge.handle('global.importPackage', function(event, pkg) {
            return importPackage(pkg);
        });

        // 导入 Java 类
        jsBridge.handle('global.importClass', function(event, cls) {
            return importClass(cls);
        });

        // ==================== 系统信息 ====================
        
        // 获取当前包名
        jsBridge.handle('global.currentPackage', function(event) {
            return currentPackage();
        });

        // 获取当前 Activity
        jsBridge.handle('global.currentActivity', function(event) {
            return currentActivity();
        });

        // ==================== 剪贴板 ====================
        
        // 设置剪贴板内容
        jsBridge.handle('global.setClip', function(event, text) {
            return setClip(text);
        });

        // 获取剪贴板内容
        jsBridge.handle('global.getClip', function(event) {
            return getClip();
        });

        // ==================== 选择器相关 ====================
        
        // 构建选择器
        jsBridge.handle('global.selector', function(event) {
            return selector();
        });

        // 拾取选择器
        jsBridge.handle('global.pickup', function(event, selector, compass) {
            if (arguments.length === 2) {
                return pickup(selector);
            } else {
                return pickup(selector, compass);
            }
        });

        // 控件探测
        jsBridge.handle('global.detect', function(event, selector, compass) {
            if (arguments.length === 2) {
                return detect(selector);
            } else {
                return detect(selector, compass);
            }
        });

        // 检查所有选择器是否存在
        jsBridge.handle('global.existsAll', function(event, selectors) {
            return existsAll(selectors);
        });

        // 检查任一选择器是否存在
        jsBridge.handle('global.existsOne', function(event, selectors) {
            return existsOne(selectors);
        });

        // ==================== 坐标标度 ====================
        
        // X 坐标标度
        jsBridge.handle('global.cX', function(event, x, baseOrIsRatio) {
            if (arguments.length === 1) {
                return cX();
            } else if (arguments.length === 2) {
                return cX(x);
            } else {
                return cX(x, baseOrIsRatio);
            }
        });

        // Y 坐标标度
        jsBridge.handle('global.cY', function(event, y, baseOrIsRatio) {
            if (arguments.length === 1) {
                return cY();
            } else if (arguments.length === 2) {
                return cY(y);
            } else {
                return cY(y, baseOrIsRatio);
            }
        });

        // 以 X 度量的 Y 坐标标度
        jsBridge.handle('global.cYx', function(event, y, baseXOrRatio, isRatio) {
            if (arguments.length === 2) {
                return cYx(y);
            } else if (arguments.length === 3) {
                return cYx(y, baseXOrRatio);
            } else {
                return cYx(y, baseXOrRatio, isRatio);
            }
        });

        // 以 Y 度量的 X 坐标标度
        jsBridge.handle('global.cXy', function(event, x, baseYOrRatio, isRatio) {
            if (arguments.length === 2) {
                return cXy(x);
            } else if (arguments.length === 3) {
                return cXy(x, baseYOrRatio);
            } else {
                return cXy(x, baseYOrRatio, isRatio);
            }
        });

        // ==================== 类型判断 ====================
        
        // 获取对象种类
        jsBridge.handle('global.species', function(event, o) {
            return species(o);
        });

        // 类型判断方法
        // 注意: species 是 AutoJS6 的全局对象，species.isXxx 是其扩展方法
        var typeCheckers = [
            'isArray', 'isArrayBuffer', 'isBigInt', 'isBoolean', 'isContinuation',
            'isDataView', 'isDate', 'isError', 'isFloat32Array', 'isFloat64Array',
            'isFunction', 'isHTMLDocument', 'isInt16Array', 'isInt32Array', 'isInt8Array',
            'isJavaObject', 'isJavaPackage', 'isMap', 'isNamespace', 'isNull',
            'isNumber', 'isObject', 'isQName', 'isRegExp', 'isSet',
            'isString', 'isUint16Array', 'isUint32Array', 'isUint8Array', 'isUint8ClampedArray',
            'isUndefined', 'isWeakMap', 'isWeakSet', 'isWindow', 'isXML', 'isXMLList'
        ];

        for (var i = 0; i < typeCheckers.length; i++) {
            (function(method) {
                jsBridge.handle('global.' + method, function(event, o) {
                    // species 是 AutoJS6 全局对象，检查其子方法是否存在
                    if (typeof species !== 'undefined' && typeof species[method] === 'function') {
                        return species[method](o);
                    }
                    // 如果不存在，返回 false
                    return false;
                });
            })(typeCheckers[i]);
        }

        // ==================== 设备属性 ====================
        
        // 屏幕宽度
        jsBridge.handle('global.WIDTH', function(event) {
            return WIDTH;
        });

        // 屏幕高度
        jsBridge.handle('global.HEIGHT', function(event) {
            return HEIGHT;
        });
    }
};
