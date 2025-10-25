<template>
    <div>
        <van-cell-group title="路径信息">
            <van-row type="flex" justify="center">
                <van-button type="primary" @click="testGetSdcardPath" style="margin: 8px;">获取 SD 卡路径</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testGetCwd" style="margin: 8px;">获取当前工作目录</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testPathOperations" style="margin: 8px;">测试路径操作</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="文件创建与检查">
            <van-row type="flex" justify="center">
                <van-button type="primary" @click="testCreateFile" style="margin: 8px;">创建测试文件</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testFileExists" style="margin: 8px;">检查文件是否存在</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testIsFile" style="margin: 8px;">判断文件类型</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="文件读写">
            <van-row type="flex" justify="center">
                <van-button type="primary" @click="testWriteText" style="margin: 8px;">写入文本</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testReadText" style="margin: 8px;">读取文本</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testAppendText" style="margin: 8px;">追加文本</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="文件操作">
            <van-row type="flex" justify="center">
                <van-button @click="testCopyFile" style="margin: 8px;">复制文件</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testMoveFile" style="margin: 8px;">移动文件</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testRenameFile" style="margin: 8px;">重命名文件</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button type="danger" @click="testRemoveFile" style="margin: 8px;">删除文件</van-button>
            </van-row>
        </van-cell-group>
        
        <van-cell-group title="目录操作">
            <van-row type="flex" justify="center">
                <van-button type="primary" @click="testCreateDir" style="margin: 8px;">创建目录</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button @click="testListDir" style="margin: 8px;">列出目录内容</van-button>
            </van-row>
            <van-row type="flex" justify="center">
                <van-button type="danger" @click="testRemoveDir" style="margin: 8px;">删除目录</van-button>
            </van-row>
        </van-cell-group>
    </div>
</template>

<script>
export default {
    name: 'FilesTest',
    data() {
        return {
            testDir: '',
            testFile: '',
            testFileCopy: '',
        };
    },
    async mounted() {
        // 初始化测试路径
        try {
            const sdcard = await autojs.files.getSdcardPath();
            this.testDir = sdcard + '/AutojsTest';
            this.testFile = this.testDir + '/test.txt';
            this.testFileCopy = this.testDir + '/test_copy.txt';
        } catch (err) {
            autojs.global.toastLog('初始化失败: ' + err);
        }
    },
    methods: {
        // ==================== 路径信息 ====================
        
        // 获取 SD 卡路径
        async testGetSdcardPath() {
            try {
                const path = await autojs.files.getSdcardPath();
                autojs.global.toastLog('SD 卡路径: ' + path);
            } catch (err) {
                autojs.global.toastLog('获取失败: ' + err);
            }
        },
        
        // 获取当前工作目录
        async testGetCwd() {
            try {
                const path = await autojs.files.cwd();
                autojs.global.toastLog('当前工作目录: ' + (path || '无'));
            } catch (err) {
                autojs.global.toastLog('获取失败: ' + err);
            }
        },
        
        // 测试路径操作
        async testPathOperations() {
            try {
                const sdcard = await autojs.files.getSdcardPath();
                
                // 测试 join
                const fullPath = await autojs.files.join(sdcard, 'test.txt');
                autojs.global.log('join 结果: ' + fullPath);
                
                // 测试 getName
                const name = await autojs.files.getName(fullPath);
                autojs.global.log('文件名: ' + name);
                
                // 测试 getNameWithoutExtension
                const nameNoExt = await autojs.files.getNameWithoutExtension(fullPath);
                autojs.global.log('文件名(无扩展名): ' + nameNoExt);
                
                // 测试 getExtension
                const ext = await autojs.files.getExtension(fullPath);
                autojs.global.log('扩展名: ' + ext);
                
                autojs.global.toastLog('路径操作测试完成，请查看日志');
            } catch (err) {
                autojs.global.toastLog('测试失败: ' + err);
            }
        },
        
        // ==================== 文件创建与检查 ====================
        
        // 创建测试文件
        async testCreateFile() {
            try {
                // 先确保目录存在
                await autojs.files.ensureDir(this.testDir);
                
                // 创建文件
                const success = await autojs.files.create(this.testFile);
                autojs.global.toastLog(success ? '文件创建成功: ' + this.testFile : '文件已存在');
            } catch (err) {
                autojs.global.toastLog('创建失败: ' + err);
            }
        },
        
        // 检查文件是否存在
        async testFileExists() {
            try {
                const exists = await autojs.files.exists(this.testFile);
                autojs.global.toastLog('文件' + (exists ? '存在' : '不存在') + ': ' + this.testFile);
            } catch (err) {
                autojs.global.toastLog('检查失败: ' + err);
            }
        },
        
        // 判断文件类型
        async testIsFile() {
            try {
                const isFile = await autojs.files.isFile(this.testFile);
                const isDir = await autojs.files.isDir(this.testFile);
                
                autojs.global.log('路径: ' + this.testFile);
                autojs.global.log('是文件: ' + isFile);
                autojs.global.log('是目录: ' + isDir);
                
                const isDirTest = await autojs.files.isDir(this.testDir);
                autojs.global.log('目录路径: ' + this.testDir);
                autojs.global.log('是目录: ' + isDirTest);
                
                autojs.global.toastLog('类型判断完成，请查看日志');
            } catch (err) {
                autojs.global.toastLog('判断失败: ' + err);
            }
        },
        
        // ==================== 文件读写 ====================
        
        // 写入文本
        async testWriteText() {
            try {
                // 先确保目录存在
                await autojs.files.ensureDir(this.testDir);
                
                const text = 'Hello AutoJS!\n这是测试文本。\n时间: ' + new Date().toLocaleString();
                await autojs.files.write(this.testFile, text);
                autojs.global.toastLog('文本写入成功: ' + this.testFile);
            } catch (err) {
                autojs.global.toastLog('写入失败: ' + err);
            }
        },
        
        // 读取文本
        async testReadText() {
            try {
                const content = await autojs.files.read(this.testFile);
                autojs.global.log('文件内容:');
                autojs.global.log(content);
                autojs.global.toastLog('读取成功，请查看日志');
            } catch (err) {
                autojs.global.toastLog('读取失败: ' + err);
            }
        },
        
        // 追加文本
        async testAppendText() {
            try {
                const text = '\n追加的文本: ' + new Date().toLocaleString();
                await autojs.files.append(this.testFile, text);
                autojs.global.toastLog('文本追加成功');
            } catch (err) {
                autojs.global.toastLog('追加失败: ' + err);
            }
        },
        
        // ==================== 文件操作 ====================
        
        // 复制文件
        async testCopyFile() {
            try {
                const success = await autojs.files.copy(this.testFile, this.testFileCopy);
                autojs.global.toastLog(success ? '文件复制成功' : '文件复制失败');
            } catch (err) {
                autojs.global.toastLog('复制失败: ' + err);
            }
        },
        
        // 移动文件
        async testMoveFile() {
            try {
                const moveFile = this.testDir + '/test_moved.txt';
                const success = await autojs.files.move(this.testFileCopy, moveFile);
                autojs.global.toastLog(success ? '文件移动成功' : '文件移动失败');
            } catch (err) {
                autojs.global.toastLog('移动失败: ' + err);
            }
        },
        
        // 重命名文件
        async testRenameFile() {
            try {
                const movedFile = this.testDir + '/test_moved.txt';
                const success = await autojs.files.rename(movedFile, 'test_renamed.txt');
                autojs.global.toastLog(success ? '文件重命名成功' : '文件重命名失败');
            } catch (err) {
                autojs.global.toastLog('重命名失败: ' + err);
            }
        },
        
        // 删除文件
        async testRemoveFile() {
            try {
                // 删除所有测试文件
                const files = [
                    this.testFile,
                    this.testFileCopy,
                    this.testDir + '/test_moved.txt',
                    this.testDir + '/test_renamed.txt'
                ];
                
                let count = 0;
                for (let file of files) {
                    try {
                        const exists = await autojs.files.exists(file);
                        if (exists) {
                            const success = await autojs.files.remove(file);
                            if (success) count++;
                        }
                    } catch (e) {
                        // 忽略单个文件删除失败
                    }
                }
                
                autojs.global.toastLog('删除了 ' + count + ' 个文件');
            } catch (err) {
                autojs.global.toastLog('删除失败: ' + err);
            }
        },
        
        // ==================== 目录操作 ====================
        
        // 创建目录
        async testCreateDir() {
            try {
                const testSubDir = this.testDir + '/SubDir';
                const success = await autojs.files.createWithDirs(testSubDir);
                autojs.global.toastLog(success ? '目录创建成功: ' + testSubDir : '目录已存在');
            } catch (err) {
                autojs.global.toastLog('创建失败: ' + err);
            }
        },
        
        // 列出目录内容
        async testListDir() {
            try {
                const list = await autojs.files.listDir(this.testDir);
                autojs.global.log('目录内容 (' + list.length + ' 项):');
                for (let i = 0; i < list.length; i++) {
                    autojs.global.log('  ' + list[i]);
                }
                autojs.global.toastLog('共 ' + list.length + ' 项，请查看日志');
            } catch (err) {
                autojs.global.toastLog('列出失败: ' + err);
            }
        },
        
        // 删除目录
        async testRemoveDir() {
            try {
                const success = await autojs.files.removeDir(this.testDir);
                autojs.global.toastLog(success ? '目录删除成功' : '目录删除失败');
            } catch (err) {
                autojs.global.toastLog('删除失败: ' + err);
            }
        },
    }
};
</script>


