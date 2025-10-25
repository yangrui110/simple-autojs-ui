/**
 * AutoJS 本体应用模块 - 封装 AutoJS6 应用相关的属性和方法
 */

module.exports = {
    /**
     * 注册 autojs 模块的所有 handlers
     * @param {Object} jsBridge - WebView 的 jsBridge 对象
     */
    register: function(jsBridge) {
        // ==================== 语言设置 ====================
        
        // 获取语言对象
        jsBridge.handle('autojs.getLanguage', function(event) {
            try {
                var locale = autojs.getLanguage();
                // 返回语言对象的可序列化信息
                return {
                    languageTag: locale.toLanguageTag(),
                    displayName: locale.getDisplayName(),
                    language: locale.getLanguage(),
                    country: locale.getCountry()
                };
            } catch (e) {
                console.error('autojs.getLanguage 错误:', e);
                return null;
            }
        });
        
        // 获取语言标签
        jsBridge.handle('autojs.getLanguageTag', function(event) {
            try {
                return autojs.getLanguageTag();
            } catch (e) {
                console.error('autojs.getLanguageTag 错误:', e);
                return 'en-US';
            }
        });
        
        // ==================== Root 权限 ====================
        
        // 检查 Root 权限有效性
        jsBridge.handle('autojs.isRootAvailable', function(event) {
            try {
                return autojs.isRootAvailable();
            } catch (e) {
                console.error('autojs.isRootAvailable 错误:', e);
                return false;
            }
        });
        
        // 获取 Root 模式
        jsBridge.handle('autojs.getRootMode', function(event) {
            try {
                var mode = autojs.getRootMode();
                // 返回 RootMode 枚举值
                return String(mode);
            } catch (e) {
                console.error('autojs.getRootMode 错误:', e);
                return 'AUTO_DETECT';
            }
        });
        
        // 设置 Root 模式
        jsBridge.handle('autojs.setRootMode', function(event) {
            try {
                var args = Array.prototype.slice.call(arguments, 1);
                var rootMode = args[0];
                var isWriteIntoPreference = args[1] || false;
                
                // 转换参数
                if (typeof rootMode === 'string') {
                    if (rootMode === 'auto') {
                        rootMode = RootMode.AUTO_DETECT;
                    } else if (rootMode === 'root') {
                        rootMode = RootMode.FORCE_ROOT;
                    } else if (rootMode === 'non-root') {
                        rootMode = RootMode.FORCE_NON_ROOT;
                    }
                } else if (typeof rootMode === 'boolean') {
                    rootMode = rootMode ? RootMode.FORCE_ROOT : RootMode.FORCE_NON_ROOT;
                } else if (typeof rootMode === 'number') {
                    // 0: AUTO_DETECT, 1: FORCE_ROOT, 2: FORCE_NON_ROOT
                    if (rootMode === 1) {
                        rootMode = RootMode.FORCE_ROOT;
                    } else if (rootMode === 2) {
                        rootMode = RootMode.FORCE_NON_ROOT;
                    } else {
                        rootMode = RootMode.AUTO_DETECT;
                    }
                }
                
                autojs.setRootMode(rootMode, isWriteIntoPreference);
                return true;
            } catch (e) {
                console.error('autojs.setRootMode 错误:', e);
                return false;
            }
        });
        
        // ==================== 权限状态 ====================
        
        // 检查修改系统设置权限
        jsBridge.handle('autojs.canModifySystemSettings', function(event) {
            try {
                return autojs.canModifySystemSettings();
            } catch (e) {
                console.error('autojs.canModifySystemSettings 错误:', e);
                return false;
            }
        });
        
        // 检查修改安全设置权限
        jsBridge.handle('autojs.canWriteSecureSettings', function(event) {
            try {
                return autojs.canWriteSecureSettings();
            } catch (e) {
                console.error('autojs.canWriteSecureSettings 错误:', e);
                return false;
            }
        });
        
        // 检查显示在其他应用上层权限
        jsBridge.handle('autojs.canDisplayOverOtherApps', function(event) {
            try {
                return autojs.canDisplayOverOtherApps();
            } catch (e) {
                console.error('autojs.canDisplayOverOtherApps 错误:', e);
                return false;
            }
        });
        
        // ==================== 版本信息 ====================
        
        // 获取版本名称
        jsBridge.handle('autojs.versionName', function(event) {
            try {
                return autojs.versionName;
            } catch (e) {
                console.error('autojs.versionName 错误:', e);
                return '未知版本';
            }
        });
        
        // 获取版本号
        jsBridge.handle('autojs.versionCode', function(event) {
            try {
                return autojs.versionCode;
            } catch (e) {
                console.error('autojs.versionCode 错误:', e);
                return 0;
            }
        });
        
        // 获取版本日期
        jsBridge.handle('autojs.versionDate', function(event) {
            try {
                return autojs.versionDate;
            } catch (e) {
                console.error('autojs.versionDate 错误:', e);
                return '';
            }
        });
        
        // ==================== version 对象方法 ====================
        
        // version.name
        jsBridge.handle('autojs.version.name', function(event) {
            try {
                return autojs.version.name;
            } catch (e) {
                console.error('autojs.version.name 错误:', e);
                return '未知版本';
            }
        });
        
        // version.code
        jsBridge.handle('autojs.version.code', function(event) {
            try {
                return autojs.version.code;
            } catch (e) {
                console.error('autojs.version.code 错误:', e);
                return 0;
            }
        });
        
        // version.date
        jsBridge.handle('autojs.version.date', function(event) {
            try {
                return autojs.version.date;
            } catch (e) {
                console.error('autojs.version.date 错误:', e);
                return '';
            }
        });
        
        // version.isEqual
        jsBridge.handle('autojs.version.isEqual', function(event, otherVersion) {
            try {
                return autojs.version.isEqual(otherVersion);
            } catch (e) {
                console.error('autojs.version.isEqual 错误:', e);
                return false;
            }
        });
        
        // version.isHigherThan
        jsBridge.handle('autojs.version.isHigherThan', function(event, otherVersion) {
            try {
                return autojs.version.isHigherThan(otherVersion);
            } catch (e) {
                console.error('autojs.version.isHigherThan 错误:', e);
                return false;
            }
        });
        
        // version.isLowerThan
        jsBridge.handle('autojs.version.isLowerThan', function(event, otherVersion) {
            try {
                return autojs.version.isLowerThan(otherVersion);
            } catch (e) {
                console.error('autojs.version.isLowerThan 错误:', e);
                return false;
            }
        });
        
        // version.isAtLeast
        jsBridge.handle('autojs.version.isAtLeast', function(event) {
            try {
                var args = Array.prototype.slice.call(arguments, 1);
                return autojs.version.isAtLeast.apply(autojs.version, args);
            } catch (e) {
                console.error('autojs.version.isAtLeast 错误:', e);
                return false;
            }
        });
        
        // ==================== 主题颜色 ====================
        
        // themeColor.getColorPrimary
        jsBridge.handle('autojs.themeColor.getColorPrimary', function(event) {
            try {
                return autojs.themeColor.getColorPrimary();
            } catch (e) {
                console.error('autojs.themeColor.getColorPrimary 错误:', e);
                return 0;
            }
        });
        
        // themeColor.getColorPrimaryDark
        jsBridge.handle('autojs.themeColor.getColorPrimaryDark', function(event) {
            try {
                return autojs.themeColor.getColorPrimaryDark();
            } catch (e) {
                console.error('autojs.themeColor.getColorPrimaryDark 错误:', e);
                return 0;
            }
        });
        
        // themeColor.getColorAccent
        jsBridge.handle('autojs.themeColor.getColorAccent', function(event) {
            try {
                return autojs.themeColor.getColorAccent();
            } catch (e) {
                console.error('autojs.themeColor.getColorAccent 错误:', e);
                return 0;
            }
        });
        
        // ==================== R 资源对象 ====================
        
        // R.string - 获取字符串资源
        jsBridge.handle('autojs.R.string', function(event, name) {
            try {
                if (typeof R !== 'undefined' && R.string && R.string[name]) {
                    return context.getString(R.string[name]);
                }
                return null;
            } catch (e) {
                console.error('autojs.R.string 错误:', e);
                return null;
            }
        });
        
        // R.id - 获取 ID 资源
        jsBridge.handle('autojs.R.id', function(event, name) {
            try {
                if (typeof R !== 'undefined' && R.id && R.id[name]) {
                    return R.id[name];
                }
                return null;
            } catch (e) {
                console.error('autojs.R.id 错误:', e);
                return null;
            }
        });
        
        // R.drawable - 获取可绘制资源
        jsBridge.handle('autojs.R.drawable', function(event, name) {
            try {
                if (typeof R !== 'undefined' && R.drawable && R.drawable[name]) {
                    return R.drawable[name];
                }
                return null;
            } catch (e) {
                console.error('autojs.R.drawable 错误:', e);
                return null;
            }
        });
        
        // R.layout - 获取布局资源
        jsBridge.handle('autojs.R.layout', function(event, name) {
            try {
                if (typeof R !== 'undefined' && R.layout && R.layout[name]) {
                    return R.layout[name];
                }
                return null;
            } catch (e) {
                console.error('autojs.R.layout 错误:', e);
                return null;
            }
        });
    }
};

