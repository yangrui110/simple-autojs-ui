<template>
    <div>
        <van-cell-group title="设备基本信息">
            <van-row type="flex" justify="center">
                <van-button type="primary" @click="testDeviceInfo" style="margin: 8px;">获取设备信息</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testScreenSize" style="margin: 8px;">获取屏幕尺寸</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testSystemInfo" style="margin: 8px;">获取系统信息</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testDeviceId" style="margin: 8px;">获取设备标识</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="亮度控制">
            <van-row type="flex" justify="center">
                <van-button @click="testGetBrightness" style="margin: 8px;">获取当前亮度</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button type="primary" @click="testSetBrightness" style="margin: 8px;">设置亮度 (128)</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testBrightnessMode" style="margin: 8px;">亮度模式切换</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="音量控制">
            <van-row type="flex" justify="center">
                <van-button @click="testGetVolume" style="margin: 8px;">获取音量信息</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button type="primary" @click="testSetMusicVolume" style="margin: 8px;">设置媒体音量</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="电池信息">
            <van-row type="flex" justify="center">
                <van-button @click="testBattery" style="margin: 8px;">获取电池信息</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="内存信息">
            <van-row type="flex" justify="center">
                <van-button @click="testMemory" style="margin: 8px;">获取内存信息</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="屏幕控制">
            <van-row type="flex" justify="center">
                <van-button @click="testScreenStatus" style="margin: 8px;">检查屏幕状态</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button type="primary" @click="testWakeUp" style="margin: 8px;">唤醒屏幕</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testKeepScreenOn" style="margin: 8px;">保持屏幕常亮 (10秒)</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testCancelKeepingAwake" style="margin: 8px;">取消保持常亮</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="振动控制">
            <van-row type="flex" justify="center">
                <van-button type="warning" @click="testVibrate" style="margin: 8px;">振动 (500ms)</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testCancelVibration" style="margin: 8px;">取消振动</van-button>
            </van-row>
        </van-cell-group>
    </div>
</template>

<script>
export default {
    name: 'DeviceTest',
    methods: {
        // ==================== 设备基本信息 ====================
        
        // 测试获取设备信息
        async testDeviceInfo() {
            try {
                const brand = await autojs.device.brand;
                const model = await autojs.device.model;
                const product = await autojs.device.product;
                
                autojs.global.toastLog(`品牌: ${brand}\n型号: ${model}\n产品: ${product}`);
            } catch (err) {
                autojs.global.toastLog('获取失败: ' + err);
            }
        },
        
        // 测试获取屏幕尺寸
        async testScreenSize() {
            try {
                const width = await autojs.device.width;
                const height = await autojs.device.height;
                
                autojs.global.toastLog(`屏幕尺寸: ${width} x ${height}`);
            } catch (err) {
                autojs.global.toastLog('获取失败: ' + err);
            }
        },
        
        // 测试获取系统信息
        async testSystemInfo() {
            try {
                const release = await autojs.device.release;
                const sdkInt = await autojs.device.sdkInt;
                const codename = await autojs.device.codename;
                
                autojs.global.toastLog(`Android版本: ${release}\nAPI级别: ${sdkInt}\n代号: ${codename}`);
            } catch (err) {
                autojs.global.toastLog('获取失败: ' + err);
            }
        },
        
        // 测试获取设备标识
        async testDeviceId() {
            try {
                const androidId = await autojs.device.getAndroidId();
                const serial = await autojs.device.serial;
                
                autojs.global.toastLog(`Android ID: ${androidId}\n序列号: ${serial}`);
            } catch (err) {
                autojs.global.toastLog('获取失败: ' + err);
            }
        },
        
        // ==================== 亮度控制 ====================
        
        // 测试获取亮度
        async testGetBrightness() {
            try {
                const brightness = await autojs.device.getBrightness();
                const mode = await autojs.device.getBrightnessMode();
                const modeText = mode === 0 ? '手动' : '自动';
                
                autojs.global.toastLog(`当前亮度: ${brightness}\n亮度模式: ${modeText}`);
            } catch (err) {
                autojs.global.toastLog('获取失败: ' + err);
            }
        },
        
        // 测试设置亮度
        async testSetBrightness() {
            try {
                await autojs.device.setBrightness(128);
                autojs.global.toastLog('亮度已设置为: 128');
            } catch (err) {
                autojs.global.toastLog('设置失败: ' + err);
            }
        },
        
        // 测试亮度模式切换
        async testBrightnessMode() {
            try {
                const currentMode = await autojs.device.getBrightnessMode();
                const newMode = currentMode === 0 ? 1 : 0;
                
                await autojs.device.setBrightnessMode(newMode);
                const modeText = newMode === 0 ? '手动' : '自动';
                autojs.global.toastLog(`亮度模式已切换为: ${modeText}`);
            } catch (err) {
                autojs.global.toastLog('切换失败: ' + err);
            }
        },
        
        // ==================== 音量控制 ====================
        
        // 测试获取音量信息
        async testGetVolume() {
            try {
                const musicVolume = await autojs.device.getMusicVolume();
                const musicMaxVolume = await autojs.device.getMusicMaxVolume();
                const notificationVolume = await autojs.device.getNotificationVolume();
                const alarmVolume = await autojs.device.getAlarmVolume();
                
                autojs.global.toastLog(
                    `媒体音量: ${musicVolume}/${musicMaxVolume}\n` +
                    `通知音量: ${notificationVolume}\n` +
                    `闹钟音量: ${alarmVolume}`
                );
            } catch (err) {
                autojs.global.toastLog('获取失败: ' + err);
            }
        },
        
        // 测试设置媒体音量
        async testSetMusicVolume() {
            try {
                const maxVolume = await autojs.device.getMusicMaxVolume();
                const targetVolume = Math.floor(maxVolume / 2);
                
                await autojs.device.setMusicVolume(targetVolume);
                autojs.global.toastLog(`媒体音量已设置为: ${targetVolume}`);
            } catch (err) {
                autojs.global.toastLog('设置失败: ' + err);
            }
        },
        
        // ==================== 电池信息 ====================
        
        // 测试获取电池信息
        async testBattery() {
            try {
                const battery = await autojs.device.getBattery();
                const isCharging = await autojs.device.isCharging();
                const chargingText = isCharging ? '充电中' : '未充电';
                
                autojs.global.toastLog(`电量: ${battery.toFixed(1)}%\n状态: ${chargingText}`);
            } catch (err) {
                autojs.global.toastLog('获取失败: ' + err);
            }
        },
        
        // ==================== 内存信息 ====================
        
        // 测试获取内存信息
        async testMemory() {
            try {
                const totalMem = await autojs.device.getTotalMem();
                const availMem = await autojs.device.getAvailMem();
                
                const totalGB = (totalMem / 1024 / 1024 / 1024).toFixed(2);
                const availGB = (availMem / 1024 / 1024 / 1024).toFixed(2);
                const usedPercent = ((1 - availMem / totalMem) * 100).toFixed(1);
                
                autojs.global.toastLog(
                    `总内存: ${totalGB} GB\n` +
                    `可用内存: ${availGB} GB\n` +
                    `已用: ${usedPercent}%`
                );
            } catch (err) {
                autojs.global.toastLog('获取失败: ' + err);
            }
        },
        
        // ==================== 屏幕控制 ====================
        
        // 测试检查屏幕状态
        async testScreenStatus() {
            try {
                const isOn = await autojs.device.isScreenOn();
                const status = isOn ? '已点亮' : '未点亮';
                
                autojs.global.toastLog(`屏幕状态: ${status}`);
            } catch (err) {
                autojs.global.toastLog('获取失败: ' + err);
            }
        },
        
        // 测试唤醒屏幕
        async testWakeUp() {
            try {
                await autojs.device.wakeUp();
                autojs.global.toastLog('已唤醒屏幕');
            } catch (err) {
                autojs.global.toastLog('唤醒失败: ' + err);
            }
        },
        
        // 测试保持屏幕常亮
        async testKeepScreenOn() {
            try {
                await autojs.device.keepScreenOn(10000); // 10秒
                autojs.global.toastLog('屏幕将保持常亮 10 秒');
            } catch (err) {
                autojs.global.toastLog('设置失败: ' + err);
            }
        },
        
        // 测试取消保持常亮
        async testCancelKeepingAwake() {
            try {
                await autojs.device.cancelKeepingAwake();
                autojs.global.toastLog('已取消保持常亮');
            } catch (err) {
                autojs.global.toastLog('取消失败: ' + err);
            }
        },
        
        // ==================== 振动控制 ====================
        
        // 测试振动
        async testVibrate() {
            try {
                await autojs.device.vibrate(500);
                autojs.global.toastLog('振动 500ms');
            } catch (err) {
                autojs.global.toastLog('振动失败: ' + err);
            }
        },
        
        // 测试取消振动
        async testCancelVibration() {
            try {
                await autojs.device.cancelVibration();
                autojs.global.toastLog('已取消振动');
            } catch (err) {
                autojs.global.toastLog('取消失败: ' + err);
            }
        }
    }
};
</script>


