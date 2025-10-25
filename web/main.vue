<template>
    <van-row>
        <van-nav-bar title="基于 Vue 的界面"/>

        <van-tabs v-model="activeTab">
            <van-tab title="配置">
                <van-cell-group title="权限">
                    <van-cell title="无障碍服务" label="用于脚本自动操作 (点击/长按/滑动等)">
                        <van-switch
                            v-model="accessibilityServiceEnabled"
                            @input="onAccessibilityServiceCheckChanged"
                        />
                    </van-cell>
                </van-cell-group>
                <van-cell-group title="配置">
                    <van-cell title="开关样本">
                        <van-switch
                            v-model="sampleSwitchChecked"
                            @change="onSampleSwitchChanged"
                        />
                    </van-cell>
                    <van-field v-model="greeting"
                               label="问候语"
                               placeholder="请输入问候语"
                               maxLength="20"
                               input-align="right"
                    />
                    <van-field v-model.number="count"
                               label="运行次数"
                               placeholder="请输入运行次数"
                               maxLength="4"
                               inputmode="numeric"
                               input-align="right"
                    />
                    <van-field
                        label="选择文件"
                        :value="selectedFilePath"
                        placeholder="选择一个文件"
                        readonly
                        clickable
                        @click.native="selectFile"
                        input-align="right"
                    />
                </van-cell-group>
            </van-tab>

            <van-tab title="运行">
                <van-cell title="查看日志" is-link @click="showLog"/>
                <van-row type="flex" justify="center">
                    <van-button type="primary" @click="run" style="margin-top: 12px;">运行</van-button>
                </van-row>
                <van-row type="flex" justify="center">
                    <van-button type="info" @click="testSleep" style="margin-top: 12px;">测试 sleep (2秒)</van-button>
                </van-row>
                <van-row type="flex" justify="center">
                    <van-button type="warning" @click="testToast" style="margin-top: 12px;">测试 toast</van-button>
                </van-row>
            </van-tab>

            <van-tab title="关于">
                <van-cell
                    value="运行环境"
                    :title="appVersionName ? `AutoJs6 ${appVersionName}` : `AutoJs6`"
                    label="WebView + Android"
                    @click="showDeviceInfoDialog"
                />
                <van-cell
                    title="Vue.js 2.6"
                    label="渐进式 JavaScript 框架"
                    is-link
                    @click="openVueWebsite"
                />
                <van-cell
                    title="Vant 2.12"
                    label="轻量, 可靠的移动端 Vue 组件库"
                    is-link
                    @click="openVantWebsite"
                />
            </van-tab>
        </van-tabs>
    </van-row>
</template>
<script>
export default {
    data() {
        return {
            accessibilityServiceEnabled: false,
            activeTab: 0,
            sampleSwitchChecked: true,
            greeting: 'Hello',
            count: 192,
            appVersionName: '',
            selectedFilePath: '',
        };
    },
    created() {
        $autojs.invoke('get-accessibility-enabled').then((value) => {
            this.accessibilityServiceEnabled = value;
        });
        $autojs.invoke('get-app-version-name').then((value) => {
            this.appVersionName = value;
        });
    },
    methods: {
        onAccessibilityServiceCheckChanged(checked) {
            $autojs.invoke('set-accessibility-enabled', checked);
        },
        onSampleSwitchChanged(checked) {
            $autojs.invoke('toast-log', `样本开关已${checked ? '开启' : '关闭'}`);
        },
        showLog() {
            $autojs.invoke('show-log');
        },
        openVantWebsite() {
            $autojs.send('open-url', 'https://vant-ui.github.io/vant/v2/#/zh-CN/');
        },
        openVueWebsite() {
            $autojs.send('open-url', 'https://cn.vuejs.org/');
        },
        run() {
            $autojs.invoke('toast-log', `greeting: "${this.greeting}"\ncount: ${this.count}`);
        },
        selectFile() {
            $autojs.invoke('select-file', '*/*').then((path) => {
                this.selectedFilePath = path || '';
            });
        },
        showDeviceInfoDialog() {
            $autojs.invoke('show-device-info-dialog');
        },
        // 测试 autojs.global.sleep() 方法
        async testSleep() {
            $autojs.invoke('toast-log', '开始测试 sleep...');
            const startTime = Date.now();
            
            // 使用新的 autojs.global.sleep() 方法
            await autojs.global.sleep(2000);
            
            const elapsed = Date.now() - startTime;
            $autojs.invoke('toast-log', `sleep 完成！实际耗时: ${elapsed}ms`);
        },
        // 测试 autojs.global.toast() 方法
        testToast() {
            autojs.global.toast('Hello from autojs.global.toast()! 🎉');
        },
    },
};
</script>