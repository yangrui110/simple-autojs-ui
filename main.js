'ui';

var moduleRegister = require('./modules/register.js');

ui.layout(
    <vertical>
        <webview id="web" url="web/index.html" w="*" h="*"/>
    </vertical>,
);

ui.statusBarColor('#ffffff');

var web = ui['web'];



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
web.jsBridge
    // 处理读取本地文件的请求
    .handle('fetch', (event, args) => {
        return files.read(files.join(files.path('web'), args.path));
    })