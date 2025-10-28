'ui';

var moduleRegister = require('./modules/register.js');
var pluginUtils = require('./modules/plugin-utils.js');

// 打印调试信息
pluginUtils.printDebugInfo();

ui.layout(
    <vertical>
        <webview id="web" w="*" h="*"/>
    </vertical>,
);

ui.statusBarColor('#ffffff');

var web = ui['web'];

// 根据运行模式加载 WebView 内容
if (pluginUtils.isPluginMode()) {
    // 插件模式：从内存加载 HTML
    console.log('[Plugin] 从内存加载 WebView 内容...');
    var htmlContent = pluginUtils.readTextResource('web/index.html');
    if (htmlContent) {
        // 读取 init.js 并内联到 HTML 中
        // 因为 <script src> 标签不会触发 jsBridge fetch handler
        var initJs = pluginUtils.readTextResource('web/modules/init.js');
        if (initJs) {
            // 替换 <script src="modules/init.js"></script> 为内联脚本
            htmlContent = htmlContent.replace(
                '<script src="modules/init.js"></script>',
                '<script>\n' + initJs + '\n</script>'
            );
            console.log('[Plugin] 已内联 init.js');
        } else {
            console.warn('[Plugin] 无法读取 init.js，可能导致模块加载失败');
        }
        
        // 使用 memory:// 作为 baseURL，这样相对路径会被解析为 memory://web/xxx
        web.loadDataWithBaseURL(
            'memory://web/',
            htmlContent,
            'text/html',
            'UTF-8',
            null
        );
        console.log('[Plugin] WebView 内容加载完成');
    } else {
        console.error('[Plugin] 无法读取 web/index.html');
        toast('插件加载失败：无法读取HTML内容');
    }
} else {
    // 开发模式：使用文件路径
    console.log('[Dev] 使用文件路径加载 WebView...');
    web.loadUrl('file://' + files.path('web/index.html'));
}



// 注册所有模块的 handlers
moduleRegister.registerAll(web.jsBridge);

// 初始化悬浮窗
var floatyManager = moduleRegister.getFloatyManager();
var isScriptRunning = false;

// 延迟创建悬浮窗，确保 UI 已完全加载
setTimeout(function() {
    try {
        // 设置悬浮窗回调
        floatyManager.setGetScriptStatusCallback(function() {
            return isScriptRunning;
        });

        floatyManager.setOnActionCallback(function(action) {
            console.log("悬浮窗按钮点击:", action);
            
            switch(action) {
                case "toggle":
                    // 切换脚本运行状态
                    isScriptRunning = !isScriptRunning;
                    floatyManager.collapseFloatyMenu();
                    toast(isScriptRunning ? "脚本已启动" : "脚本已停止");
                    
                    // 重新展开菜单以更新按钮状态
                    setTimeout(function() {
                        floatyManager.expandFloatyMenu();
                    }, 100);
                    break;
                    
                case "log":
                    // 显示日志
                    floatyManager.collapseFloatyMenu();
                    app.startActivity('console');
                    break;
                    
                case "config":
                    // 显示配置界面（这里可以跳转到配置页面）
                    floatyManager.collapseFloatyMenu();
                    toast("打开配置界面");
                    break;
                    
                case "close":
                    // 关闭悬浮窗
                    floatyManager.removeFloatyWindow();
                    break;
                    
                default:
                    console.log("未知操作:", action);
            }
        });

        // 创建悬浮窗
        floatyManager.createFloatyWindow();
        console.log("悬浮窗已初始化");
    } catch (e) {
        console.error("初始化悬浮窗失败:", e);
    }
}, 1000);

// 监听 WebView 的控制台消息, 打印到控制台
web.events.on('console_message', (event, msg) => {
    console.log(`${files.getName(msg.sourceId())}:${msg.lineNumber()}: ${msg.message()}`);
});

// 处理读取本地文件的请求（兼容插件和开发模式）
web.jsBridge.handle('fetch', (event, args) => {
    var requestPath = args.path;
    console.log('[Fetch] 请求资源:', requestPath);
    
     // 移除前导斜杠（如果有）
     if (requestPath.startsWith('/')) {
        requestPath = requestPath.substring(1);
    }
    
    
    // 构建完整的相对路径
    var resourcePath = 'web/' + requestPath;
    
    // 检查是否为二进制文件（图片、字体等）
    if (pluginUtils.isBinaryFile(requestPath)) {
        // 二进制文件：返回 Data URI
        console.log('[Fetch] 处理二进制资源:', requestPath);
        var dataUri = pluginUtils.readResource(resourcePath, true);
        if (dataUri) {
            console.log('[Fetch] 二进制资源加载成功 (Data URI)');
            return dataUri;
        } else {
            console.error('[Fetch] 二进制资源加载失败:', requestPath);
            return null;
        }
    } else {
        // 文本文件：直接返回内容
        console.log('[Fetch] 处理文本资源:', requestPath);
        var content = pluginUtils.readTextResource(resourcePath);
        if (content) {
            console.log('[Fetch] 文本资源加载成功 (' + content.length + ' 字符)');
            return content;
        } else {
            console.error('[Fetch] 文本资源加载失败:', requestPath);
            return null;
        }
    }
});