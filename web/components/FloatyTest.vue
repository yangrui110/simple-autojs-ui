<template>
    <div>
        <van-cell-group title="创建悬浮窗">
            <van-row type="flex" justify="center">
                <van-button type="primary" @click="testCreateWindow" style="margin: 8px;">创建带调整按钮的悬浮窗</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button type="primary" @click="testCreateRawWindow" style="margin: 8px;">创建原始悬浮窗</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button type="danger" @click="testCloseAll" style="margin: 8px;">关闭所有悬浮窗</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="悬浮窗控制" v-if="currentWindow">
            <van-row type="flex" justify="center">
                <van-button @click="testSetPosition" style="margin: 8px;">移动到屏幕中心</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testGetPosition" style="margin: 8px;">获取当前位置</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testSetSize" style="margin: 8px;">设置大小</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testGetSize" style="margin: 8px;">获取当前大小</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testSetAdjustEnabled" style="margin: 8px;">切换调整按钮</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button type="warning" @click="testClose" style="margin: 8px;">关闭当前悬浮窗</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="原始悬浮窗特性" v-if="currentRawWindow">
            <van-row type="flex" justify="center">
                <van-button @click="testSetTouchable" style="margin: 8px;">切换触摸穿透</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testFullScreen" style="margin: 8px;">设置全屏</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="高级示例">
            <van-row type="flex" justify="center">
                <van-button type="info" @click="testProtectEyes" style="margin: 8px;">护眼模式示例</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button type="info" @click="testMovingText" style="margin: 8px;">移动文字示例</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="HTML/Vue 悬浮窗">
            <van-row type="flex" justify="center">
                <van-button type="success" @click="testHtmlFloaty" style="margin: 8px;">HTML 悬浮窗</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button type="success" @click="testVueFloaty" style="margin: 8px;">Vue 悬浮窗</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button type="success" @click="testUrlFloaty" style="margin: 8px;">URL 悬浮窗</van-button>
            </van-row>
        </van-cell-group>
    </div>
</template>

<script>
export default {
    name: 'FloatyTest',
    data() {
        return {
            currentWindow: null,
            currentRawWindow: null,
            adjustEnabled: true,
            touchable: true
        };
    },
    methods: {
        // ==================== 创建悬浮窗 ====================
        
        // 测试创建带调整功能的悬浮窗
        async testCreateWindow() {
            try {
                autojs.global.toastLog('正在创建悬浮窗...');
                
                const layout = `
                    <frame gravity="center" bg="#77ff0000">
                        <vertical>
                            <text id="text" textSize="20sp" textColor="#ffffff">悬浮窗测试</text>
                            <text id="time" textSize="14sp" textColor="#ffffff" marginTop="8dp">00:00:00</text>
                        </vertical>
                    </frame>
                `;
                
                this.currentWindow = await autojs.floaty.window(layout);
                autojs.global.toastLog('悬浮窗创建成功！');
                
                // 设置初始位置
                await this.currentWindow.setPosition(100, 100);
                
            } catch (err) {
                autojs.global.toastLog('创建悬浮窗失败: ' + err);
            }
        },
        
        // 测试创建原始悬浮窗
        async testCreateRawWindow() {
            try {
                autojs.global.toastLog('正在创建原始悬浮窗...');
                
                const layout = `
                    <frame gravity="center" bg="#7700ff00">
                        <text id="text" textSize="24sp" textColor="#ffffff">原始悬浮窗</text>
                    </frame>
                `;
                
                this.currentRawWindow = await autojs.floaty.rawWindow(layout);
                autojs.global.toastLog('原始悬浮窗创建成功！');
                
                // 设置初始位置和大小
                await this.currentRawWindow.setPosition(200, 200);
                await this.currentRawWindow.setSize(300, 200);
                
            } catch (err) {
                autojs.global.toastLog('创建原始悬浮窗失败: ' + err);
            }
        },
        
        // ==================== 悬浮窗控制 ====================
        
        // 测试设置位置
        async testSetPosition() {
            if (!this.currentWindow && !this.currentRawWindow) {
                autojs.global.toastLog('请先创建悬浮窗');
                return;
            }
            
            try {
                const width = await autojs.device.getWidth();
                const height = await autojs.device.getHeight();
                const x = width / 2 - 100;
                const y = height / 2 - 100;
                
                const window = this.currentWindow || this.currentRawWindow;
                await window.setPosition(x, y);
                autojs.global.toastLog(`悬浮窗已移动到: (${Math.round(x)}, ${Math.round(y)})`);
            } catch (err) {
                autojs.global.toastLog('移动失败: ' + err);
            }
        },
        
        // 测试获取位置
        async testGetPosition() {
            if (!this.currentWindow && !this.currentRawWindow) {
                autojs.global.toastLog('请先创建悬浮窗');
                return;
            }
            
            try {
                const window = this.currentWindow || this.currentRawWindow;
                const x = await window.getX();
                const y = await window.getY();
                autojs.global.toastLog(`当前位置: (${x}, ${y})`);
            } catch (err) {
                autojs.global.toastLog('获取位置失败: ' + err);
            }
        },
        
        // 测试设置大小
        async testSetSize() {
            if (!this.currentWindow && !this.currentRawWindow) {
                autojs.global.toastLog('请先创建悬浮窗');
                return;
            }
            
            try {
                const window = this.currentWindow || this.currentRawWindow;
                await window.setSize(400, 300);
                autojs.global.toastLog('悬浮窗大小已设置为: 400x300');
            } catch (err) {
                autojs.global.toastLog('设置大小失败: ' + err);
            }
        },
        
        // 测试获取大小
        async testGetSize() {
            if (!this.currentWindow && !this.currentRawWindow) {
                autojs.global.toastLog('请先创建悬浮窗');
                return;
            }
            
            try {
                const window = this.currentWindow || this.currentRawWindow;
                const width = await window.getWidth();
                const height = await window.getHeight();
                autojs.global.toastLog(`当前大小: ${width}x${height}`);
            } catch (err) {
                autojs.global.toastLog('获取大小失败: ' + err);
            }
        },
        
        // 测试切换调整按钮
        async testSetAdjustEnabled() {
            if (!this.currentWindow) {
                autojs.global.toastLog('此功能仅适用于带调整功能的悬浮窗');
                return;
            }
            
            try {
                this.adjustEnabled = !this.adjustEnabled;
                await this.currentWindow.setAdjustEnabled(this.adjustEnabled);
                autojs.global.toastLog(`调整按钮已${this.adjustEnabled ? '启用' : '禁用'}`);
            } catch (err) {
                autojs.global.toastLog('切换失败: ' + err);
            }
        },
        
        // 测试关闭当前悬浮窗
        async testClose() {
            if (!this.currentWindow && !this.currentRawWindow) {
                autojs.global.toastLog('没有可关闭的悬浮窗');
                return;
            }
            
            try {
                if (this.currentWindow) {
                    await this.currentWindow.close();
                    this.currentWindow = null;
                    autojs.global.toastLog('悬浮窗已关闭');
                } else if (this.currentRawWindow) {
                    await this.currentRawWindow.close();
                    this.currentRawWindow = null;
                    autojs.global.toastLog('原始悬浮窗已关闭');
                }
            } catch (err) {
                autojs.global.toastLog('关闭失败: ' + err);
            }
        },
        
        // ==================== 原始悬浮窗特性 ====================
        
        // 测试触摸穿透
        async testSetTouchable() {
            if (!this.currentRawWindow) {
                autojs.global.toastLog('此功能仅适用于原始悬浮窗');
                return;
            }
            
            try {
                this.touchable = !this.touchable;
                await this.currentRawWindow.setTouchable(this.touchable);
                autojs.global.toastLog(`触摸${this.touchable ? '已启用' : '已禁用（穿透）'}`);
            } catch (err) {
                autojs.global.toastLog('设置失败: ' + err);
            }
        },
        
        // 测试全屏
        async testFullScreen() {
            if (!this.currentRawWindow) {
                autojs.global.toastLog('此功能仅适用于原始悬浮窗');
                return;
            }
            
            try {
                await this.currentRawWindow.setSize(-1, -1);
                autojs.global.toastLog('悬浮窗已设置为全屏');
            } catch (err) {
                autojs.global.toastLog('设置全屏失败: ' + err);
            }
        },
        
        // 关闭所有悬浮窗
        async testCloseAll() {
            try {
                await autojs.floaty.closeAll();
                this.currentWindow = null;
                this.currentRawWindow = null;
                autojs.global.toastLog('所有悬浮窗已关闭');
            } catch (err) {
                autojs.global.toastLog('关闭失败: ' + err);
            }
        },
        
        // ==================== 高级示例 ====================
        
        // 护眼模式示例
        async testProtectEyes() {
            try {
                autojs.global.toastLog('启动护眼模式 (3秒后自动关闭)');
                
                const layout = `
                    <frame gravity="center" bg="#44ffcc00"/>
                `;
                
                const window = await autojs.floaty.rawWindow(layout);
                await window.setSize(-1, -1);
                await window.setTouchable(false);
                
                // 3秒后自动关闭
                setTimeout(async () => {
                    await window.close();
                    autojs.global.toastLog('护眼模式已关闭');
                }, 3000);
                
            } catch (err) {
                autojs.global.toastLog('护眼模式失败: ' + err);
            }
        },
        
        // 移动文字示例
        async testMovingText() {
            try {
                autojs.global.toastLog('启动移动文字示例 (5秒)');
                
                const layout = `
                    <frame gravity="center" bg="#77ff0000">
                        <text id="text" textSize="20sp" textColor="#ffffff">移动中...</text>
                    </frame>
                `;
                
                const window = await autojs.floaty.window(layout);
                await window.setAdjustEnabled(false);
                
                const width = await autojs.device.getWidth();
                const height = await autojs.device.getHeight();
                
                let x = 0;
                let y = height / 2;
                let dx = 5;
                
                // 动画循环
                const intervalId = setInterval(async () => {
                    x += dx;
                    if (x <= 0 || x >= width - 200) {
                        dx = -dx;
                    }
                    await window.setPosition(x, y);
                }, 50);
                
                // 5秒后停止并关闭
                setTimeout(async () => {
                    clearInterval(intervalId);
                    await window.close();
                    autojs.global.toastLog('移动文字示例已结束');
                }, 5000);
                
            } catch (err) {
                autojs.global.toastLog('移动文字失败: ' + err);
            }
        },
        
        // ==================== HTML/Vue 悬浮窗示例 ====================
        
        // 测试 HTML 悬浮窗
        async testHtmlFloaty() {
            try {
                autojs.global.toastLog('正在创建 HTML 悬浮窗...');
                
                // 使用数组 join 方法避免 Vue SFC 解析器对 script 标签的误解析
                const htmlContent = [
                    '<!DOCTYPE html>',
                    '<html>',
                    '<head>',
                    '<meta charset="UTF-8">',
                    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
                    '<style>',
                    'body { margin: 0; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-family: Arial, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; }',
                    'h1 { margin: 0 0 10px 0; font-size: 24px; }',
                    'p { margin: 5px 0; font-size: 14px; opacity: 0.9; }',
                    '.time { font-size: 32px; font-weight: bold; margin: 20px 0; }',
                    'button { background: rgba(255,255,255,0.2); border: 2px solid white; color: white; padding: 10px 20px; border-radius: 20px; font-size: 16px; cursor: pointer; margin-top: 10px; }',
                    '</' + 'style>',  // 分割避免被识别
                    '</' + 'head>',
                    '<body>',
                    '<h1>🎨 HTML 悬浮窗</h1>',
                    '<p>这是一个使用 HTML 创建的悬浮窗</p>',
                    '<div class="time" id="time">00:00:00</div>',
                    '<button onclick="alert(\'你好，AutoJS!\')">点击我</button>',
                    '<' + 'script>',  // 分割避免被 Vue 解析器误解析
                    'function updateTime() {',
                    '  const now = new Date();',
                    '  const time = now.toLocaleTimeString("zh-CN");',
                    '  document.getElementById("time").textContent = time;',
                    '}',
                    'setInterval(updateTime, 1000);',
                    'updateTime();',
                    '</' + 'script>',  // 分割避免被识别为脚本结束标签
                    '</' + 'body>',
                    '</' + 'html>'
                ].join('');
                
                this.currentWindow = await autojs.floaty.window(htmlContent, {
                    type: 'html',
                    width: '350',
                    height: '500'
                });
                
                autojs.global.toastLog('HTML 悬浮窗创建成功！');
                
                // 设置初始位置
                await this.currentWindow.setPosition(50, 100);
                
            } catch (err) {
                autojs.global.toastLog('创建 HTML 悬浮窗失败: ' + err);
            }
        },
        
        // 测试 Vue 悬浮窗
        async testVueFloaty() {
            try {
                autojs.global.toastLog('正在创建 Vue 悬浮窗...');
                
                const vueTemplate = '<div style="padding: 20px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; text-align: center;">' +
                    '<h2>⚡ Vue 悬浮窗</h2>' +
                    '<p>计数器: {{ count }}</p>' +
                    '<button @click="increment" style="margin: 10px; padding: 10px 20px; background: white; color: #f5576c; border: none; border-radius: 20px; cursor: pointer;">' +
                    '点击 +1' +
                    '</button>' +
                    '<button @click="decrement" style="margin: 10px; padding: 10px 20px; background: white; color: #f5576c; border: none; border-radius: 20px; cursor: pointer;">' +
                    '点击 -1' +
                    '</button>' +
                    '<p style="margin-top: 20px; font-size: 12px;">{{ message }}</p>' +
                    '</div>';
                
                const vueScript = 'data() { return { count: 0, message: "这是一个 Vue 组件悬浮窗" } }, ' +
                    'methods: { increment() { this.count++; }, decrement() { this.count--; } }';
                
                this.currentWindow = await autojs.floaty.window(vueTemplate, {
                    type: 'vue',
                    vueScript: vueScript,
                    width: '350',
                    height: '450'
                });
                
                autojs.global.toastLog('Vue 悬浮窗创建成功！');
                
                // 设置初始位置
                await this.currentWindow.setPosition(50, 100);
                
            } catch (err) {
                autojs.global.toastLog('创建 Vue 悬浮窗失败: ' + err);
            }
        },
        
        // 测试 URL 悬浮窗
        async testUrlFloaty() {
            try {
                autojs.global.toastLog('正在创建 URL 悬浮窗...');
                
                // 可以加载任何网页
                const url = 'https://www.baidu.com';
                
                this.currentWindow = await autojs.floaty.window(url, {
                    type: 'html', // URL 也使用 html 类型
                    url: url,
                    width: '400',
                    height: '600'
                });
                
                autojs.global.toastLog('URL 悬浮窗创建成功！');
                
                // 设置初始位置
                await this.currentWindow.setPosition(30, 80);
                
            } catch (err) {
                autojs.global.toastLog('创建 URL 悬浮窗失败: ' + err);
            }
        }
    }
};
</script>

