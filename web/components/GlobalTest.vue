<template>
    <div>
        <van-cell-group title="基础方法测试">
            <van-row type="flex" justify="center">
                <van-button type="info" @click="testSleep" style="margin: 8px;">测试 sleep (2秒)</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button type="warning" @click="testToast" style="margin: 8px;">测试 toast</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testToastLog" style="margin: 8px;">测试 toastLog</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testRandom" style="margin: 8px;">测试 random</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="系统信息测试">
            <van-row type="flex" justify="center">
                <van-button @click="testCurrentInfo" style="margin: 8px;">获取当前包名/Activity</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testClipboard" style="margin: 8px;">测试剪贴板</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testScreenSize" style="margin: 8px;">获取屏幕尺寸</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="类型判断测试">
            <van-row type="flex" justify="center">
                <van-button @click="testSpecies" style="margin: 8px;">测试 species</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testTypeCheckers" style="margin: 8px;">测试类型判断方法</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="等待方法测试">
            <van-row type="flex" justify="center">
                <van-button @click="testWait" style="margin: 8px;">测试 wait 函数</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="坐标标度测试">
            <van-row type="flex" justify="center">
                <van-button @click="testCoordinateScale" style="margin: 8px;">测试坐标标度</van-button>
            </van-row>
        </van-cell-group>
    </div>
</template>

<script>
export default {
    name: 'GlobalTest',
    methods: {
        // ==================== 基础方法测试 ====================
        
        // 测试 sleep
        async testSleep() {
            autojs.global.toastLog('开始测试 sleep...');
            const startTime = Date.now();
            
            await autojs.global.sleep(2000);
            
            const elapsed = Date.now() - startTime;
            autojs.global.toastLog(`sleep 完成！实际耗时: ${elapsed}ms`);
        },
        
        // 测试 toast
        testToast() {
            autojs.global.toast('Hello from autojs.global.toast()! 🎉');
        },
        
        // 测试 toastLog
        testToastLog() {
            autojs.global.toastLog('这是一条 toastLog 消息，同时会打印到日志');
        },
        
        // 测试 random
        async testRandom() {
            const randomValue1 = await autojs.global.random();
            const randomValue2 = await autojs.global.random(1, 100);
            autojs.global.toastLog(`随机数:\n无参: ${randomValue1.toFixed(4)}\n[1-100]: ${randomValue2}`);
        },
        
        // ==================== 系统信息测试 ====================
        
        // 测试获取当前包名和Activity
        async testCurrentInfo() {
            const pkg = await autojs.global.currentPackage();
            const act = await autojs.global.currentActivity();
            autojs.global.toastLog(`当前包名: ${pkg}\n当前Activity: ${act}`);
        },
        
        // 测试剪贴板
        async testClipboard() {
            await autojs.global.setClip('测试剪贴板内容 - AutoJS6');
            const clipContent = await autojs.global.getClip();
            autojs.global.toastLog(`剪贴板内容: ${clipContent}`);
        },
        
        // 测试屏幕尺寸
        async testScreenSize() {
            const width = await autojs.global.WIDTH;
            const height = await autojs.global.HEIGHT;
            autojs.global.toastLog(`屏幕尺寸:\n宽度: ${width}px\n高度: ${height}px`);
        },
        
        // ==================== 类型判断测试 ====================
        
        // 测试 species 类型判断
        async testSpecies() {
            const testData = [
                { value: 'hello', label: '字符串' },
                { value: 123, label: '数字' },
                { value: true, label: '布尔值' },
                { value: [1, 2, 3], label: '数组' },
                { value: { a: 1 }, label: '对象' },
                { value: null, label: 'null' },
                { value: undefined, label: 'undefined' },
            ];
            
            let result = '类型判断测试:\n';
            for (const item of testData) {
                const type = await autojs.global.species(item.value);
                result += `${item.label}: ${type}\n`;
            }
            
            autojs.global.toastLog(result);
        },
        
        // 测试类型判断方法
        async testTypeCheckers() {
            const testData = [
                'hello',
                123,
                true,
                [1, 2, 3],
                { a: 1 },
                null,
                undefined,
                new Date(),
                /regex/,
            ];
            
            let result = '类型判断方法测试:\n';
            
            for (const item of testData) {
                const isString = await autojs.global.isString(item);
                const isNumber = await autojs.global.isNumber(item);
                const isArray = await autojs.global.isArray(item);
                const isObject = await autojs.global.isObject(item);
                
                if (isString) result += `"${item}" 是字符串\n`;
                else if (isNumber) result += `${item} 是数字\n`;
                else if (isArray) result += `${JSON.stringify(item)} 是数组\n`;
                else if (isObject) result += `${JSON.stringify(item)} 是对象\n`;
            }
            
            autojs.global.toastLog(result);
        },
        
        // ==================== 等待方法测试 ====================
        
        // 测试 wait 函数
        async testWait() {
            autojs.global.toastLog('开始测试 wait 函数...');
            
            let counter = 0;
            const condition = () => {
                counter++;
                return counter >= 3;
            };
            
            const result = await autojs.global.wait(condition, 100);
            autojs.global.toastLog(`wait 完成！条件满足，检查了 ${counter} 次`);
        },
        
        // ==================== 坐标标度测试 ====================
        
        // 测试坐标标度
        async testCoordinateScale() {
            // 假设设计尺寸为 1080x1920
            const designWidth = 1080;
            const designHeight = 1920;
            const designX = 540;  // 设计图中的 X 坐标
            const designY = 960;  // 设计图中的 Y 坐标
            
            // 获取实际坐标
            const actualX = await autojs.global.cX(designX, designWidth);
            const actualY = await autojs.global.cY(designY, designHeight);
            const actualYx = await autojs.global.cYx(designY, designWidth);
            const actualXy = await autojs.global.cXy(designX, designHeight);
            
            autojs.global.toastLog(
                `坐标标度测试:\n` +
                `设计坐标: (${designX}, ${designY})\n` +
                `cX: ${actualX}\n` +
                `cY: ${actualY}\n` +
                `cYx: ${actualYx}\n` +
                `cXy: ${actualXy}`
            );
        },
    }
};
</script>

