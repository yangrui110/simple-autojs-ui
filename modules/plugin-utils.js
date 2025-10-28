/**
 * 插件工具模块 - 处理插件模式和开发模式的兼容性
 */

module.exports = {
    /**
     * 检测是否运行在插件模式下
     * @returns {boolean} 是否为插件模式
     */
    isPluginMode: function() {
        return typeof $registry !== 'undefined' && $registry !== null;
    },
    
    /**
     * 读取文本资源（兼容插件和开发模式）
     * @param {string} relativePath - 相对路径，如 'web/index.html'
     * @returns {string|null} 文本内容
     */
    readTextResource: function(relativePath) {
        if (this.isPluginMode()) {
            // 插件模式：从加密的 registry 读取
            try {
                var content = $registry.getDecryptedScript(relativePath);
                if (content !== null) {
                    console.log('[Plugin] 从内存读取: ' + relativePath);
                    return content;
                }
            } catch (e) {
                console.error('[Plugin] 读取失败: ' + relativePath, e);
            }
        }
        
        // 开发模式：从文件系统读取
        try {
            var fullPath = files.path(relativePath);
            if (files.exists(fullPath)) {
                console.log('[Dev] 从文件系统读取: ' + fullPath);
                return files.read(fullPath);
            }
        } catch (e) {
            console.error('[Dev] 读取失败: ' + relativePath, e);
        }
        
        return null;
    },
    
    /**
     * 读取二进制资源（如图片、字体）
     * @param {string} relativePath - 相对路径
     * @returns {ByteArray|null} 字节数组
     */
    readBinaryResource: function(relativePath) {
        if (this.isPluginMode()) {
            // 插件模式：从加密的 registry 读取
            try {
                var bytes = $registry.getDecryptedBytes(relativePath);
                if (bytes !== null) {
                    console.log('[Plugin] 从内存读取二进制: ' + relativePath);
                    return bytes;
                }
            } catch (e) {
                console.error('[Plugin] 读取二进制失败: ' + relativePath, e);
            }
        }
        
        // 开发模式：从文件系统读取
        try {
            var fullPath = files.path(relativePath);
            if (files.exists(fullPath)) {
                console.log('[Dev] 从文件系统读取二进制: ' + fullPath);
                return files.readBytes(fullPath);
            }
        } catch (e) {
            console.error('[Dev] 读取二进制失败: ' + relativePath, e);
        }
        
        return null;
    },
    
    /**
     * 将二进制数据转换为 Base64 Data URI
     * @param {ByteArray} bytes - 字节数组
     * @param {string} mimeType - MIME类型，如 'image/png'
     * @returns {string} Data URI
     */
    toDataUri: function(bytes, mimeType) {
        if (!bytes) return null;
        
        try {
            // 使用 Android 的 Base64 编码
            var base64 = android.util.Base64.encodeToString(
                bytes, 
                android.util.Base64.NO_WRAP
            );
            return 'data:' + mimeType + ';base64,' + base64;
        } catch (e) {
            console.error('Base64编码失败:', e);
            return null;
        }
    },
    
    /**
     * 根据文件扩展名获取 MIME 类型
     * @param {string} filename - 文件名或路径
     * @returns {string} MIME类型
     */
    getMimeType: function(filename) {
        var ext = filename.split('.').pop().toLowerCase();
        
        var mimeTypes = {
            // 图片
            'png': 'image/png',
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'gif': 'image/gif',
            'svg': 'image/svg+xml',
            'webp': 'image/webp',
            'ico': 'image/x-icon',
            
            // 文本/脚本
            'html': 'text/html',
            'htm': 'text/html',
            'css': 'text/css',
            'js': 'application/javascript',
            'json': 'application/json',
            'vue': 'text/plain',
            'txt': 'text/plain',
            'md': 'text/markdown',
            
            // 字体
            'ttf': 'font/ttf',
            'otf': 'font/otf',
            'woff': 'font/woff',
            'woff2': 'font/woff2',
            'eot': 'application/vnd.ms-fontobject'
        };
        
        return mimeTypes[ext] || 'application/octet-stream';
    },
    
    /**
     * 检查是否为二进制文件
     * @param {string} filename - 文件名或路径
     * @returns {boolean}
     */
    isBinaryFile: function(filename) {
        var ext = filename.split('.').pop().toLowerCase();
        var binaryExts = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'ico', 'ttf', 'otf', 'woff', 'woff2', 'eot'];
        return binaryExts.indexOf(ext) !== -1;
    },
    
    /**
     * 智能读取资源（自动判断文本/二进制）
     * @param {string} relativePath - 相对路径
     * @param {boolean} asDataUri - 如果是二进制文件，是否返回 Data URI（默认 false）
     * @returns {string|ByteArray|null}
     */
    readResource: function(relativePath, asDataUri) {
        if (this.isBinaryFile(relativePath)) {
            var bytes = this.readBinaryResource(relativePath);
            if (asDataUri && bytes) {
                var mimeType = this.getMimeType(relativePath);
                return this.toDataUri(bytes, mimeType);
            }
            return bytes;
        } else {
            return this.readTextResource(relativePath);
        }
    },
    
    /**
     * 获取工作目录路径（仅开发模式有效）
     * @returns {string}
     */
    getCwd: function() {
        if (this.isPluginMode()) {
            return 'memory://';
        }
        return files.cwd();
    },
    
    /**
     * 获取脚本列表（仅插件模式）
     * @returns {Array<string>}
     */
    getScriptPaths: function() {
        if (this.isPluginMode() && typeof $registry.getScriptPaths === 'function') {
            try {
                var paths = $registry.getScriptPaths();
                // 转换 Java 数组为 JS 数组
                var arr = [];
                for (var i = 0; i < paths.length; i++) {
                    arr.push(String(paths[i]));
                }
                return arr;
            } catch (e) {
                console.error('获取脚本列表失败:', e);
            }
        }
        return [];
    },
    
    /**
     * 打印调试信息
     */
    printDebugInfo: function() {
        console.log('===== 插件工具调试信息 =====');
        console.log('运行模式:', this.isPluginMode() ? '插件模式' : '开发模式');
        console.log('工作目录:', this.getCwd());
        
        if (this.isPluginMode()) {
            console.log('可用脚本数:', this.getScriptPaths().length);
            console.log('脚本列表:', JSON.stringify(this.getScriptPaths(), null, 2));
        }
        
        console.log('============================');
    }
};

