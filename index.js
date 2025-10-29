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

// 初始化 WebView（使用通用方法）
pluginUtils.initWebView(web, moduleRegister, 'web/index.html');

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