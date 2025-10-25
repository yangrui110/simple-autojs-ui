'ui';

var moduleRegister = require('./modules/register.js');

ui.layout(
    <vertical>
        <webview id="web" url="web/index.html" w="*" h="*"/>
    </vertical>,
);

ui.statusBarColor('#ffffff');

var FILE_REQ_CODE = 11525;
var fileChooserResolve = null;
var web = ui['web'];

// 监听 WebView 的控制台消息, 打印到控制台
web.events.on('console_message', (event, msg) => {
    console.log(`${files.getName(msg.sourceId())}:${msg.lineNumber()}: ${msg.message()}`);
});

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

// ===== 以下是示例项目原有的 UI 相关 handlers，可以根据需要保留或移到其他模块 =====

// 处理来自 Web 的请求
web.jsBridge
    // 处理读取本地文件的请求
    .handle('fetch', (event, args) => {
        return files.read(files.join(files.path('web'), args.path));
    })
    // 处理显示日志界面的请求
    .handle('show-log', (event) => {
        app.startActivity('console');
    })
    // 处理 toastLog 消息
    .handle('toast-log', (event, msg) => {
        toastLog(msg);
    })
    // 处理设置无障碍服务的请求
    .handle('set-accessibility-enabled', (event, enabled) => {
        enabled ? auto.enable() : auto.disable();
    })
    // 处理获取无障碍服务状态的请求
    .handle('get-accessibility-enabled', (event) => {
        return auto.isRunning();
    })
    // 处理获取应用版本名称的请求
    .handle('get-app-version-name', (event) => {
        return app.autojs.versionName;
    })
    // 处理文件选择的请求
    .handle('select-file', (event, mimeType) => {
        return new Promise((resolve, reject) => {
            if (fileChooserResolve) {
                toastLog('File chooser is already open.');
                return;
            }
            fileChooserResolve = resolve;

            let intent = new Intent(Intent.ACTION_GET_CONTENT);
            intent.setType(mimeType);
            intent.addCategory(android.content.Intent.CATEGORY_OPENABLE);
            activity.startActivityForResult(intent, FILE_REQ_CODE);
        });

    })
    // 处理显示设备信息的请求
    .handle('show-device-info-dialog', (event) => {
        new MaterialDialog.Builder(activity)
            .title(R.strings.text_app_and_device_info)
            .content(DeviceUtils.getDeviceSummaryWithSimpleAppInfo(activity))
            .neutralText(R.strings.dialog_button_copy)
            .onNeutral((dialog, which) => {
                setClip(dialog.contentView.text);
                toast(activity.getString(R.strings.text_already_copied_to_clip));
            })
            .neutralColorRes(R.color.dialog_button_hint)
            .negativeText(R.strings.dialog_button_dismiss)
            .build()
            .show();
    })
    // 处理打开链接的请求. 这里用广播方式, 也可以使用 handle 的 "请求-响应" 方式
    .on('open-url', (event, url) => {
        app.openUrl(url);
    });

ui.emitter.on('activity_result', (requestCode, resultCode, data) => {
    if (requestCode === FILE_REQ_CODE && fileChooserResolve) {
        if (resultCode === android.app.Activity.RESULT_OK && data) {
            let uri = data.getData();
            let path = IntentUtils.getFileName(activity, uri);
            fileChooserResolve(path);
        } else {
            fileChooserResolve(null);
        }
        fileChooserResolve = null;
    }
});